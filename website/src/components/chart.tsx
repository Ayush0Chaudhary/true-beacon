"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"




////////////////////////



"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/components/hooks/use-toast"
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

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}


///////////////////////////

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { basicAxios } from "@/services/basicAxios"
import { _CHARTDATA } from "@/types"
import { DatePickerDemo } from "./ui/date-picker"


const chartConfig = {
  views: {
    label: "Price",
  },
  nifty50: {
    label: "NIFTY 50",
    color: "hsl(var(--chart-1))",
  },
  niftybank: {
    label: "NIFTY BANK",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ChartComponent() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("nifty50")

  const [chartData, setChartData] = React.useState([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
 
  function onDateSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }
 

  const [fetched50Data, setFetch50Data] = React.useState<_CHARTDATA>()
  const [fetchedBankData, setFetchBankData] = React.useState<_CHARTDATA>()
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    async function fetchChartData() {
      try {
        const res50 = await basicAxios(
          `/historical-data?symbol=NIFTY%20BANK&from_data=2019-12-10%2000:00:00%2B05:30&to_data=2021-12-15%2023:59:59%2B05:30`,
          undefined,
          undefined,
          'GET'
        );
        const resbank = await basicAxios(
          `/historical-data?symbol=NIFTY%2050&from_data=2019-12-10%2000:00:00%2B05:30&to_data=2021-12-15%2023:59:59%2B05:30`,
          undefined,
          undefined,
          'GET'
        );

        const mergedData = res50.data.map((item: _CHARTDATA) => {
          const bankItem = resbank.data.find((bank: _CHARTDATA) => bank.date === item.date);  // Find the matching date in resbank
          const formattedDate = new Date(item.date).toLocaleDateString('en-CA');

          return {
            date: formattedDate,
            nifty50: item.price,
            niftybank: bankItem ? bankItem.price : 0, // Fallback to 0 if no matching data is found
          };
        });

        setChartData(mergedData);
        setLoaded(true);


        console.log(mergedData, "gggggggg");

        // const data = await res.json();
        setFetch50Data(res50.data);
        setFetchBankData(resbank.data);
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
      }
    }

    fetchChartData();
  }, []);

  // const total = React.useMemo(
  //   () => ({
  //     desktop: chartData.reduce((acc, curr) => acc + curr.nifty50, 0),
  //     mobile: chartData.reduce((acc, curr) => acc + curr.niftybank, 0),
  //   }),
  //   []
  // )
  function print(vlur: any) {
    console.log(fetched50Data);
    console.log(fetchedBankData);
    console.log(vlur);

  }

  // const [graph, setGraph] = React.useState("bar");  

  return (
    !loaded ? <><Skeleton className="w-[300px] h-[30px] rounded-full m-2" /><Skeleton className="w-[250px] h-[30px] rounded-full m-2" /></>
      :
      <Card>
        {/* <button onClick={print}>test button</button> */}
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>NIFTY CHART</CardTitle>
            <CardDescription>
              <DatePickerDemo />
              <DatePickerDemo />
            </CardDescription>
          </div>
          <div className="flex">
            {["nifty50", "niftybank"].map((key) => {
              const chart = key as keyof typeof chartConfig
              return (
                <button
                  key={chart}
                  data-active={activeChart === chart}
                  className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                  onClick={() => setActiveChart(chart)}
                >
                  <span className="text-xs text-muted-foreground">
                    {chartConfig[chart].label}
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    {/* {total[key as keyof typeof total].toLocaleString()} */}
                    {21}
                  </span>
                </button>
              )
            })}
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("en-US", {
                    year: "2-digit",
                    month: "short",
                    day: "numeric",
                  })
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="views"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    }}
                  />
                }
              />
              <Line
                dataKey={activeChart}
                type="monotone"
                stroke={`var(--color-${activeChart})`}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>

          </ChartContainer>
        </CardContent>
      </Card>
  )
}
