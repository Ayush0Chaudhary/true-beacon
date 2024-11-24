import { socket } from '@/services/socket';
import { NiftyPrice } from '@/types';
import React, { useEffect, useRef, useState } from 'react';

const LiveNifty: React.FC = () => {
    const [current, setCurrent] = useState<number>(23000);
    const [increase, setIncrease] = useState<boolean>(false);
    const currentRef = useRef(current); // Create a ref for the current value


    const listener = async (data: NiftyPrice) => {
        if (data === null) return;

        data.price > currentRef.current ? setIncrease(true) : setIncrease(false);
        setCurrent(data.price);
    };
    useEffect(() => {
        currentRef.current = current;
    }, [current]);

    useEffect(() => {
        console.log('Listening to price');
        const handlePrice = (data: NiftyPrice) => {
            console.log('price');
            listener(data);
        };

        // Start listening
        socket.on("price", handlePrice);

        return () => {
            socket.off("price", handlePrice);
            console.log('Stopped listening to price');
        };
    }, []);

    const startListening = () => {
        console.log('Listening to price');
        
        socket.on("price", (data) => {
            console.log('price');
            listener(data);

        });
    };


return (
    <div className='p-4 m-2 border border-input rounded-xl w-[380px]'>
    <h1 className='text-white '>Live Nifty Data</h1>
    <h1 className='text-muted-foreground pb-5'>Value updated via websocket every 3 seconds</h1>
    <div className={`flex items-center ${increase ? 'text-green-700' : 'text-red-700'} text-2xl `}>
        <span className="mr-2">
            {increase ? (
                <span>&uarr;</span>
            ) : (
                <span>&darr;</span>
            )}
        </span>
        <span>{current ? <pre>{JSON.stringify(current, null, 2)}</pre> : <p>Loading...</p>}</span>
    </div>
</div>
);
};

export default LiveNifty;