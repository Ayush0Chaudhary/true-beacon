// "use client"

// import * as React from "react"

// import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
// // import { Button } from "@components/ui/button"
// // import { Input } from "@/registry/new-york/ui/input"
// // import { Label } from "@/registry/new-york/ui/label"
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"

// interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

// export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
//   const [isLoading, setIsLoading] = React.useState<boolean>(false)

//   async function onSubmit(event: React.SyntheticEvent) {
//     event.preventDefault()
//     setIsLoading(true)
//     console.log("Submitting...", event);

//     setTimeout(() => {
//       setIsLoading(false)
//     }, 3000)
//   }

//   return (
//     <div className={cn("grid gap-6", className)} {...props}>
//       <form onSubmit={onSubmit}>
//         <div className="grid gap-2">
//           <div className="grid gap-1">
//             <Label className="sr-only" htmlFor="email">
//               Email
//             </Label>
//             <Input
//               id="email"
//               placeholder="name@example.com"
//               type="email"
//               autoCapitalize="none"
//               autoComplete="email"
//               autoCorrect="off"
//               disabled={isLoading}
//             />
//           </div>
//           <Button disabled={isLoading}>
//             {isLoading && (
//               <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
//             )}
//             Sign In with Username
//           </Button>
//         </div>
//       </form>
//       <div className="relative">
//         <div className="absolute inset-0 flex items-center">
//           <span className="w-full border-t" />
//         </div>
//         <div className="relative flex justify-center text-xs uppercase">
//           <span className="bg-background px-2 text-muted-foreground">
//             Terms
//           </span>
//         </div>
//       </div>

//     </div>
//   )
// }



import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";

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
import { Icons } from "@/components/icons"
import React from "react"
import { basicAxios } from "@/services/basicAxios"


const formSchema = z.object({
  username: z.string().min(2).max(50),
  name: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
})

export function UserAuthForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      name: "",
      password: "",
    },
  })
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values.username)
    console.log(values.name)
    console.log(values.password)
    const body = {
      username: values.username,
      name: values.name,
      password: values.password,
    };
    const res = await basicAxios(
      `/auth/register`,
      body,
      undefined,
      'POST'
    );
    console.log(res.data['access_token'], res);
    localStorage.setItem('access_token', res.data['access_token']);
    if(res.status === 200) {
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Name</FormLabel>
                    <FormControl>
                      <Input className="text-white" placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription>
                      This will be your full name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />
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

      <Button variant="outline" className="text-white" onClick={() => { navigate('/login') }}>
        Login
      </Button>
    </>

  );
}