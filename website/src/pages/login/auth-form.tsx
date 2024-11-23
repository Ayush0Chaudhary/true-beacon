

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


const formSchema = z.object({
    username: z.string().min(2).max(50),
    // name: z.string().min(2).max(50),
    password: z.string().min(8).max(50),
})

export function UserAuthForm() {
    const navigate = useNavigate();

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values.username)
        // console.log(values.name)
        console.log(values.password)
        const body = {
            username: values.username,
            password: values.password,
        };
        const res = await basicAxios(
            `/auth/login`,
            body,
            undefined,
            'POST'
        );
        console.log(res.data['access_token']);
        localStorage.setItem('access_token', res.data['access_token']);
        if (res.status === 200) {
            console.log('success');
            navigate('/');
        }
    }

    return (
        <><Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white">Username</FormLabel>
                            <FormControl>
                                <Input className="text-white" placeholder="JohnDoe123" {...field} />
                            </FormControl>

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">Password</FormLabel>
                                        <FormControl>
                                            <Input className="text-white" type="password" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Your password must be at least 8 characters long.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            <FormDescription>
                                This will be your username for logging in.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />
                <Button type="submit">Submit</Button>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            or
                        </span>
                    </div>
                </div>
            </form>
        </Form>
            <Button variant="outline" className="text-white" onClick={() => { navigate('/register') }}>
                Register
            </Button>    </>

    );
}