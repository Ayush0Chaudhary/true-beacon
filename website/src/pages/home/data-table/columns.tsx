
import { _Holding } from "@/types"
import { ColumnDef } from "@tanstack/react-table"

// export type _Holding = {
//     tradingsymbol: string;
//     exchange: string;
//     isin: string;
//     quantity: number;
//     authorised_date: string;
//     average_price: number;
//     last_price: number;
//     close_price: number;
//     pnl: number;
//     day_change: number;
//     day_change_percentage: number;
// }

export const columns: ColumnDef<_Holding>[] = [
    {
        header: 'Trading Symbol',
        accessorKey: 'tradingsymbol',
    },
    {
        header: 'Exchange',
        accessorKey: 'exchange',
    },
    {
        header: 'ISIN',
        accessorKey: 'isin',
    },
    {
        header: 'Quantity',
        accessorKey: 'quantity',
    },
    {
        header: 'Authorised Date',
        accessorKey: 'authorised_date',
    },
    {
        header: 'Average Price',
        accessorKey: 'average_price',
    },
    {
        header: 'Last Price',
        accessorKey: 'last_price',
    },
    {
        header: 'Close Price',
        accessorKey: 'close_price',
    },
    {
        header: 'PnL',
        accessorKey: 'pnl',
    },
    {
        header: 'Day Change',
        accessorKey: 'day_change',
    },
    {
        header: 'Day Change Percentage',
        accessorKey: 'day_change_percentage',
    },
]
