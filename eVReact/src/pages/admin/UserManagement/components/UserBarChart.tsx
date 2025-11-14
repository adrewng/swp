''

import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '~/components/ui/chart'

export const description = 'A bar chart with a label'

const chartData = [
  { month: 'January', users: 186 },
  { month: 'February', users: 305 },
  { month: 'March', users: 237 },
  { month: 'April', users: 73 },
  { month: 'May', users: 209 },
  { month: 'June', users: 214 }
]

const chartConfig = {
  users: {
    label: 'users',
    color: 'var(--chart-1)'
  }
} satisfies ChartConfig

export function UserBarChart() {
  return (
    <div className='mb-8'>
      <Card>
        <CardHeader>
          <CardTitle>Bar Chart - Label</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className='h-64 w-full'>
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='month'
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey='users' fill='#10b981' radius={8}>
                <LabelList position='top' offset={12} className='fill-foreground' fontSize={12} />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className='flex-col items-start gap-2 text-sm'>
          <div className='flex gap-2 leading-none font-medium'>
            Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
          </div>
          <div className='text-muted-foreground leading-none'>Showing total visitors for the last 6 months</div>
        </CardFooter>
      </Card>
    </div>
  )
}
