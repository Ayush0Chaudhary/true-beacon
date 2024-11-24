

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import React from "react"
import { basicAxios } from "@/services/basicAxios"
import { API_ENDPOINTS } from "@/const";
import { CardTitle } from "@/components/ui/card";


const formSchema = z.object({
    price: z.preprocess((val) => parseFloat(val as string), z.number().min(0)),
    quantity: z.preprocess((val) => parseFloat(val as string), z.number().min(0)),
    symbol: z.string().min(2).max(50),
})

export function PlaceOrderForm() {
    const navigate = useNavigate();

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: 0,
            quantity: 0,
            symbol: "",
        },
    })
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [message, setMessage] = React.useState<string | null>('Clicking on button will place your Order');
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const body = {
            price: values.price,
            quantity: values.quantity,
            symbol: values.symbol,
        };
        const res = await basicAxios(
            API_ENDPOINTS.ORDER,
            body,
            undefined,
            'POST'
        );

        if (res.status === 201) {
            setMessage(res.data.message);
        }
        if (res.status === 201) {
            setMessage(res.data.message);
            form.reset({
                price: 0,
                quantity: 0,
                symbol: "",
            });
        }
    }

    return (
        <div className="border border-input rounded-xl text-card-foreground shadow p-4 "><Form {...form}>
            <CardTitle className="pb-4">Place order</CardTitle>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="symbol"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white">Symbol</FormLabel>
                            <FormControl>
                                <Input className="text-white w-[200px]" placeholder="AAPL" {...field} />
                            </FormControl>
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">Price</FormLabel>
                                        <FormControl>
                                            <Input className="text-white  w-[200px]" type="number"{...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )} />

                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">Quantity</FormLabel>
                                        <FormControl>
                                            <Input className="text-white  w-[200px]" type="number"  {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )} />
                            <FormDescription>
                                {message}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <div className="flex justify-center mt-4 ">
                <Button type="submit" className="rounded-xl">Place Order</Button>
                </div>
            </form>
        </Form>
        </div>

    );
}