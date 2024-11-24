import { ChartComponent, DateForm } from '@/components/chart';
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
  useEffect(() => {

    const fetchHoldings = async () => {
      setTableLoading(true);
      const res = await basicAxios(API_ENDPOINTS.HOLDINGS, undefined, undefined, 'GET');
      setHoldings(res.data);
      // sum all the pnl
      setTotalPnl(res.data.reduce((acc: number, curr: _Holding) => acc + curr.pnl, 0));
      console.log(totalPnl);

      setTableLoading(false);
    }
    fetchHoldings();
  }, [])
  return (
    <div className='bg-black min-h-screen p-8'>
      <div className='container mx-auto'>
        {/* <Navbar /> */}
        {/* <Separator /> */}
        <ModeToggle />
        {/* <DateForm/> */}
        <div>
          <ChartComponent />
          <ProfileCard />
        </div>
        <div className='max-w-full mx-auto px-8'>
          {/* Adjusted max-w-full to make content expand to the maximum width */}
          {/* <HoverEffect items={projects} /> */}
        </div>
      </div>
      <button onClick={handle}>holding</button>
      {tableLoading ? <Loader /> :
        <DataTable columns={columns} data={holdings} />

      }
      <PnlCard initialNumber={totalPnl} />
      <PlaceOrderForm />
      <Button variant="outline" className='text-white' onClick={(e) => { localStorage.removeItem('access_token'); navigate('/login') }}>Logout</Button>
    </div>
  );
};

export default Homepage;
