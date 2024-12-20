import React, { useState } from 'react';

interface PnlCardProps {
    initialNumber: number;
    header: string;
}

const PnlCard: React.FC<PnlCardProps> = ({ initialNumber, header }) => {
    const [number, setNumber] = useState(initialNumber);

    return (
        <div className='text-white  my-2 p-5 w-[210px] border border-input rounded-xl text-card-foreground shadow'>
            <div className='text-muted-foreground pb-6'>{header}</div>
            {initialNumber >= 0 ? <h1 className='text-green-500 text-2xl'>Rs. +{initialNumber}</h1> : <h1 className='text-red-500 text-2xl'> Rs. {initialNumber}</h1>}
        </div>
    );
};

export default PnlCard;