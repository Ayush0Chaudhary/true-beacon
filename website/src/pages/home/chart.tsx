
import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"



import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";


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
import Loader from "../../components/ui/loader";


const chartConfig = {
  views: {
    label: "Price",
  },
  nifty50: {
    label: "NIFTY",
    color: "hsl(var(--chart-1))",
  },
  niftybank: {
    label: "NIFTY",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig
const FormSchema = z.object({
  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date must be in yyyy-mm-dd format." })
    .refine((date) => new Date(date) >= new Date("2017-01-01"), {
      message: "Date must not be earlier than 2017-01-01.",
    })
    .refine((date) => new Date(date) <= new Date("2021-12-31"), {
      message: "Date must not be later than 2021-12-31.",
    }),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date must be in yyyy-mm-dd format." })
    .refine((date) => new Date(date) >= new Date("2017-01-01"), {
      message: "Date must not be earlier than 2017-01-01.",
    })
    .refine((date) => new Date(date) <= new Date("2021-12-31"), {
      message: "Date must not be later than 2021-12-31.",
    }),
});

export function ChartComponent() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("nifty50")

  const [chartData, setChartData] = React.useState([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      startDate: "",
      endDate: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    setStartDate(data.startDate);
    setEndDate(data.endDate);
  }

  async function fetchChartData(startDate: string, endDate: string) {
    setLoaded(false);
    try {
      const res50 = await basicAxios(
        `/historical-data?symbol=NIFTY%20BANK&from_data=${startDate}%2000:00:00%2B05:30&to_data=${endDate}%2023:59:59%2B05:30`,
        undefined,
        undefined,
        'GET'
      );
      const resbank = await basicAxios(
        `/historical-data?symbol=NIFTY%2050&from_data=${startDate}%2000:00:00%2B05:30&to_data=${endDate}%2023:59:59%2B05:30`,
        undefined,
        undefined,
        'GET'
      );

      const mergedData = res50.data.map((item: _CHARTDATA) => {
        const bankItem = resbank.data.find((bank: _CHARTDATA) => bank.date === item.date);  
        const formattedDate = new Date(item.date).toLocaleDateString('en-CA');

        return {
          date: formattedDate,
          nifty50: item.price,
          niftybank: bankItem ? bankItem.price : 0, 
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

  const [fetched50Data, setFetch50Data] = React.useState<_CHARTDATA>()
  const [fetchedBankData, setFetchBankData] = React.useState<_CHARTDATA>()
  const [loaded, setLoaded] = React.useState(false);
  const [startDate, setStartDate] = React.useState("2017-01-01");
  const [endDate, setEndDate] = React.useState("2021-01-01");
  React.useEffect(() => {

    fetchChartData(startDate, endDate);
  }, [startDate, endDate]);

  function print(vlur: any) {
    console.log(fetched50Data);
    console.log(fetchedBankData);
    console.log(vlur);
    console.log(loaded);
    
  }


  return (
    !loaded ? <Loader /> :
      <Card >
        {/* <button onClick={print}>ffff</button> */}
        {/* <button onClick={print}>test button</button> */}
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b border-input   p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle className="pb-2">NIFTY CHART</CardTitle>
            <CardDescription>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row gap-4">
                  {/* <div className=""> */}
                  {/* Start Date Field */}
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          {/* <div style={{colorScheme: 'light'}}> */}
                          <Input className="bg-[#141415] mb-1" type="date" placeholder="yyyy-mm-dd" {...field} />
                          {/* </div> */}
                        </FormControl>
                        <FormLabel className="text-white">Start Date</FormLabel>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* End Date Field */}
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input className="bg-[#141415] mb-1" type="date" placeholder="yyyy-mm-dd" {...field} />
                        </FormControl>
                        <FormLabel className="text-white">End Date</FormLabel>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col">
                    {/* <FormLabel className="text-white">End Date</FormLabel> */}
                    <Button type="submit" >{loaded ? "Submit" : "Loading"}</Button>
                  </div>
                  {/* </div> */}
                </form>
                <FormDescription className="pt-2 ">
                  Select Date between 2/01/2017 and 31/12/2021
                </FormDescription>
              </Form>

            </CardDescription>
          </div>
          <div className="flex ">
            {["nifty50", "niftybank"].map((key) => {
              const chart = key as keyof typeof chartConfig
              return (
                <button
                  key={chart}
                  data-active={activeChart === chart}
                  className="flex flex-1 flex-col justify-center border-input gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                  onClick={() => setActiveChart(chart)}
                >
                  <span className="text-xs text-muted-foreground">
                    {chartConfig[chart].label}
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    {/* {total[key as keyof typeof total].toLocaleString()} */}
                    {key === 'nifty50' ? '50' : 'BANK'}
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
              <CartesianGrid vertical={true} />
              <XAxis
                dataKey="date"
                tickLine={true}
                axisLine={true}
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
                <YAxis
                tickLine={true}
                axisLine={true}
                tickMargin={8}
                tickFormatter={(value) => value.toLocaleString()}
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
