import { ChartComponent, DateForm } from '@/pages/home/chart';
import { ModeToggle } from '@/components/mode-toggle';
import ProfileCard from '@/pages/home/profile-card.tsx';
import { basicAxios } from '@/services/basicAxios';
import { DataTable } from './data-table/holding-table';
import { columns } from './data-table/columns';
import { _Holding } from '@/types';
import { useEffect, useState } from 'react';
import Loader from '@/components/ui/loader';
import { PlaceOrderForm } from './place-order-form';
import { API_ENDPOINTS } from '@/const';
import PnlCard from './pnl-card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import LiveNifty from './live-nifty';
import { Separator } from '@radix-ui/react-dropdown-menu';



export const data: _Holding[] = [
  {
    tradingsymbol: "GOLDBEES",
    exchange: "BSE",
    isin: "INF204KB17I5",
    quantity: 2,
    authorised_date: "2021-06-08 00:00:00",
    average_price: 40.67,
    last_price: 42.47,
    close_price: 42.28,
    pnl: 3.5999999999999943,
    day_change: 0.18999999999999773,
    day_change_percentage: 0.44938505203405327
  },
  {
    tradingsymbol: "RELIANCE",
    exchange: "NSE",
    isin: "INE002A01018",
    quantity: 1,
    authorised_date: "2021-06-08 00:00:00",
    average_price: 2000.67,
    last_price: 2040.47,
    close_price: 2040.28,
    pnl: 3.5999999999999943,
    day_change: 0.18999999999999773,
    day_change_percentage: 0.44938505203405327
  },
  {
    tradingsymbol: "TCS",
    exchange: "NSE",
    isin: "INE467B01029",
    quantity: 1,
    authorised_date: "2021-06-08 00:00:00",
    average_price: 3200.67,
    last_price: 3240.47,
    close_price: 3240.28,
    pnl: 3.5999999999999943,
    day_change: 0.18999999999999773,
    day_change_percentage: 0.44938505203405327
  }
]


const Homepage = () => {
  const navigate = useNavigate();
  const handle = async () => {
    console.log('profile');
    const ress = await basicAxios('/users/holdings', undefined, undefined, 'GET');
    console.log(ress);
    const ressds = await basicAxios(API_ENDPOINTS.STATUS, undefined, undefined, 'GET');
    console.log(ressds);

    const fof = {
      symbol: 'RELIANCE',
      quantity: 1,
      price: 2000
    }
    const orderss = await basicAxios(API_ENDPOINTS.ORDER, fof, undefined, 'POST');
    console.log(orderss);

  }

  const [holdings, setHoldings] = useState<_Holding[]>([]);
  const [tableLoading, setTableLoading] = useState<boolean>(true);
  const [totalPnl, setTotalPnl] = useState<number>(0);
  const [totall, setTotall] = useState<number>(0);
  const [totalp, setTotalP] = useState<number>(0);

  const checkAuth = async () => {
    console.log('Checking auth');
    try{
    await basicAxios(API_ENDPOINTS.STATUS, undefined, undefined, 'GET');
    } catch (error) {
      navigate('/login');
    }
  }

  useEffect(() => {

    checkAuth();
    const fetchHoldings = async () => {
      setTableLoading(true);
      const res = await basicAxios(API_ENDPOINTS.HOLDINGS, undefined, undefined, 'GET');
      setHoldings(res.data);
      // sum all the pnl
      setTotalPnl(res.data.reduce((acc: number, curr: _Holding) => acc + curr.pnl, 0));
      setTotalP(res.data.reduce((acc: number, curr: _Holding) => acc + curr.pnl, 0));
      setTotalP(res.data.reduce((acc: number, curr: _Holding) => acc + (curr.pnl > 0 ? curr.pnl : 0), 0));
      setTotall(res.data.reduce((acc: number, curr: _Holding) => acc + (curr.pnl < 0 ? curr.pnl : 0), 0));
      console.log(totalPnl);

      setTableLoading(false);
    }
    fetchHoldings();
  }, [])
  return (
    <div className='bg-black min-h-screen p-8 '>
      <div className='container mx-auto '>
        {/* <Navbar /> */}
        {/* <Separator /> */}
        {/* <DateForm/> */}
        <div className='flex justify-end '>
          <Button variant="outline" className='text-white m-2 rounded-xl' onClick={(e) => { localStorage.removeItem('access_token'); navigate('/login') }}>Logout</Button>
        </div>
        <div>
          <ChartComponent />
          <div className='flex flex-row w-full justify-between'>
            <ProfileCard />

            <PnlCard initialNumber={totalPnl} header={"Total:"} />
            <PnlCard initialNumber={totalp} header={"Profit:"} />
            <PnlCard initialNumber={totall} header={"Loss:"} />
            <LiveNifty />

          </div>
          {tableLoading ? <Loader /> :
            <DataTable columns={columns} data={holdings} />

          }
          <div className='justify-center w-full flex'>      <PlaceOrderForm />
          </div>


        </div>
        <div className='max-w-full mx-auto px-8'>
          {/* Adjusted max-w-full to make content expand to the maximum width */}
          {/* <HoverEffect items={projects} /> */}
        </div>
      </div>

    </div>
  );
};

export default Homepage;
