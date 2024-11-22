import { ChartComponent, DateForm } from '@/components/chart';
import { ModeToggle } from '@/components/mode-toggle';

const Homepage = () => {
  return (
    <div className='bg-black min-h-screen p-8'>
      <div className='container mx-auto'>
        {/* <Navbar /> */}
        {/* <Separator /> */}
        <ModeToggle/>
        {/* <DateForm/> */}
        <ChartComponent/>
        <div className='max-w-full mx-auto px-8'>
          {/* Adjusted max-w-full to make content expand to the maximum width */}
          {/* <HoverEffect items={projects} /> */}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
