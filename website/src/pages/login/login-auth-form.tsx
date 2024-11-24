

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
import React, { useEffect } from "react"
import { basicAxios } from "@/services/basicAxios"
import { API_ENDPOINTS } from "@/const";
import { useAuth } from "@/context/AuthProvider";
import { time } from "console";


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
    });

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string | null>("This will be your username for logging in.");
    const [success, setSuccess] = React.useState<boolean>(false);
    useEffect(() => {
        
        console.log(Date.now());
    }, []);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values.username);
        console.log(values.password);

        const body = {
            username: values.username,
            password: values.password,
        };

        try {
            setIsLoading(true);
            const res = await basicAxios(API_ENDPOINTS.LOGIN, body, undefined, "POST");

            console.log(res.data["access_token"]);
            localStorage.setItem("access_token", res.data["access_token"]);

            if (res.data["access_token"]) {
                navigate("/");
                setSuccess(true);
            } else {
                setMessage("Invalid username or password");
            }
        } catch (error) {
            console.error("Login failed", error);
            setMessage("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="p-4 sm:max-w-md lg:max-w-lg mx-auto">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)} // Prevents default refresh
                        className="space-y-5"
                    >
                        {/* Username Field */}
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="text-white w-full"
                                            placeholder="JohnDoe123"
                                            {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                        {/* Password Field */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="text-white w-full"
                                            type="password"
                                            placeholder="********"
                                            {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Your password must be at least 8 characters long.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />

                        {/* Message Display */}
                        <FormDescription>
                            {message}
                        </FormDescription>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full"
                        >
                            {isLoading ? "Loading..." : "Submit"}
                        </Button>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">or</span>
                            </div>
                        </div>
                    </form>
                </Form>

                {/* Register Button */}
                <Button
                    variant="outline"
                    className="text-white w-full mt-4"
                    onClick={() => navigate("/register")}
                >
                    Register
                </Button>{localStorage.getItem('access_token') &&
                <Button onClick={() => {navigate('/')}}
                    className="text-white w-full mt-4">Go to DashBoard</Button>}
            </div>
        </>  );
}
