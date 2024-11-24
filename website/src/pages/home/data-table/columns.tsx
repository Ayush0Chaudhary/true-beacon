
import { Button } from "@/components/ui/button"
import { _Holding } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

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
        header:({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Quantity
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
        accessorKey: 'quantity',
    },
    {
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Authorised Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
        accessorKey: 'authorised_date',
    },
    {
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Average Price
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
        accessorKey: 'average_price',
    },
    {
        // header: 'Last Price',
        accessorKey: 'last_price',
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Last Price
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    {
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Close Price
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
        accessorKey: 'close_price',
    },
    {
        // header: 'PnL',
        accessorKey: 'pnl',
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                PnL
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    {
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Day Change
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
        accessorKey: 'day_change',
    },
    {
        header:({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Day Change Percentage
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
        accessorKey: 'day_change_percentage',
    },
]
