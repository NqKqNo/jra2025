"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import type { VariantProps } from "class-variance-authority"
import { BarChart, LineChart } from "lucide-react"
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  Bar,
  BarChart as RechartsBarChart,
  Pie,
  PieChart as RechartsPieChart,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const ChartContext = React.createContext<{
  config: ChartConfig
} | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <Chart />")
  }

  return context
}

type ChartConfig = {
  [k: string]: {
    label?: string
    color?: string
    icon?: React.ComponentType
  }
}

type ChartProps = React.ComponentProps<"div"> & {
  config: ChartConfig
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(({ config, className, children, ...props }, ref) => {
  return (
    <ChartContext.Provider value={{ config }}>
      <div ref={ref} className={cn("flex flex-col", className)} {...props}>
        {children}
      </div>
    </ChartContext.Provider>
  )
})
Chart.displayName = "Chart"

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    minHeight?: number
    children: React.ReactNode
  }
>(({ className, children, minHeight = 300, ...props }, ref) => (
  <div ref={ref} className={cn("flex aspect-video justify-center w-full", className)} style={{ minHeight }} {...props}>
    <ResponsiveContainer>{children}</ResponsiveContainer>
  </div>
))
ChartContainer.displayName = "ChartContainer"

type ChartTooltipProps = React.ComponentProps<typeof Tooltip> & {
  hideLabel?: boolean
  hideIndicator?: boolean
  formatter?: (value: number, name: string, props: { payload: { dataKey: string } }) => [string, string]
}

const ChartTooltip = ({ hideLabel = false, hideIndicator = false, formatter, ...props }: ChartTooltipProps) => {
  const { config } = useChart()

  return (
    <Tooltip
      cursor={false}
      content={({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div className="grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
              {!hideLabel && label ? <div className="text-muted-foreground">{label}</div> : null}
              <div className="grid gap-1">
                {payload.map((item, i) => {
                  const { color, label } = config[item.dataKey as keyof ChartConfig]
                  return (
                    <div key={item.dataKey} className={cn("flex items-center justify-between gap-2", item.color)}>
                      {formatter ? (
                        formatter(item.value as number, item.name, {
                          payload: { dataKey: item.dataKey },
                        }).map(([value, name], i) => (
                          <span key={i} className="flex">
                            {!hideIndicator && (
                              <span
                                className={cn("mr-1 h-2 w-2 rounded-[2px]", color)}
                                style={{
                                  backgroundColor: color,
                                }}
                              />
                            )}
                            {name ? <span className="text-muted-foreground">{name}: </span> : null}
                            <span className="font-medium text-foreground">{value}</span>
                          </span>
                        ))
                      ) : (
                        <span className="flex">
                          {!hideIndicator && (
                            <span
                              className={cn("mr-1 h-2 w-2 rounded-[2px]", color)}
                              style={{
                                backgroundColor: color,
                              }}
                            />
                          )}
                          {label ? <span className="text-muted-foreground">{label}: </span> : null}
                          <span className="font-medium text-foreground">{item.value}</span>
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        }

        return null
      }}
      {...props}
    />
  )
}

const ChartLegend = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Legend>>(
  ({ className, ...props }, ref) => {
    const { config } = useChart()

    return (
      <div ref={ref} className={cn("flex flex-wrap items-center justify-center gap-4", className)} {...props}>
        {Object.entries(config).map(([key, item]) => {
          if (!item.label) return null
          return (
            <div key={key} className="flex items-center gap-1.5">
              <span
                className={cn("h-3 w-3 shrink-0 rounded-full", item.color)}
                style={{
                  backgroundColor: item.color,
                }}
              />
              {item.icon ? <item.icon className="h-3 w-3 shrink-0" /> : null}
              <span>{item.label}</span>
            </div>
          )
        })}
      </div>
    )
  },
)
ChartLegend.displayName = "ChartLegend"

const ChartLegendContent = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Legend>>(
  ({ className, formatter, ...props }, ref) => {
    const { config } = useChart()

    return (
      <Legend
        ref={ref}
        content={({ payload }) => {
          return (
            <div className={cn("flex flex-wrap items-center justify-center gap-4", className)}>
              {payload?.map((item) => {
                const { icon, label, color } = config[item.dataKey as keyof ChartConfig]
                return (
                  <div key={item.value} className="flex items-center gap-1.5">
                    <span
                      className={cn("h-3 w-3 shrink-0 rounded-full", color)}
                      style={{
                        backgroundColor: color,
                      }}
                    />
                    {icon ? <icon className="h-3 w-3 shrink-0" /> : null}
                    {formatter ? formatter(item.value, item.name, item) : <span>{label || item.value}</span>}
                  </div>
                )
              })}
            </div>
          )
        }}
        {...props}
      />
    )
  },
)
ChartLegendContent.displayName = "ChartLegendContent"

const ChartTooltipContent = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Tooltip>>(
  ({ className, formatter, ...props }, ref) => {
    const { config } = useChart()

    return (
      <Tooltip
        ref={ref}
        content={({ active, payload, label }) => {
          if (active && payload && payload.length) {
            return (
              <div
                className={cn(
                  "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
                  className,
                )}
              >
                {label ? <div className="text-muted-foreground">{label}</div> : null}
                <div className="grid gap-1">
                  {payload.map((item, i) => {
                    const { color, label } = config[item.dataKey as keyof ChartConfig]
                    return (
                      <div key={item.dataKey} className={cn("flex items-center justify-between gap-2", item.color)}>
                        {formatter ? (
                          formatter(item.value as number, item.name, item).map(([value, name], i) => (
                            <span key={i} className="flex">
                              <span
                                className={cn("mr-1 h-2 w-2 rounded-[2px]", color)}
                                style={{
                                  backgroundColor: color,
                                }}
                              />
                              {name ? <span className="text-muted-foreground">{name}: </span> : null}
                              <span className="font-medium text-foreground">{value}</span>
                            </span>
                          ))
                        ) : (
                          <span className="flex">
                            <span
                              className={cn("mr-1 h-2 w-2 rounded-[2px]", color)}
                              style={{
                                backgroundColor: color,
                              }}
                            />
                            {label ? <span className="text-muted-foreground">{label}: </span> : null}
                            <span className="font-medium text-foreground">{item.value}</span>
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          }

          return null
        }}
        {...props}
      />
    )
  },
)
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartCrosshair = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof CartesianGrid>>(
  ({ className, ...props }, ref) => (
    <CartesianGrid ref={ref} className={cn("stroke-border stroke-1", className)} vertical={false} {...props} />
  ),
)
ChartCrosshair.displayName = "ChartCrosshair"

const ChartAxis = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof XAxis>>(
  ({ className, ...props }, ref) => (
    <XAxis
      ref={ref}
      className={cn("fill-foreground text-xs", className)}
      axisLine={false}
      tickLine={false}
      {...props}
    />
  ),
)
ChartAxis.displayName = "ChartAxis"

const ChartAxisY = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof YAxis>>(
  ({ className, ...props }, ref) => (
    <YAxis
      ref={ref}
      className={cn("fill-foreground text-xs", className)}
      axisLine={false}
      tickLine={false}
      {...props}
    />
  ),
)
ChartAxisY.displayName = "ChartAxisY"

const ChartLine = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Line>>(
  ({ className, type = "monotone", strokeWidth = 2, dot = false, ...props }, ref) => (
    <Line
      ref={ref}
      className={cn("stroke-primary", className)}
      type={type}
      strokeWidth={strokeWidth}
      dot={dot}
      {...props}
    />
  ),
)
ChartLine.displayName = "ChartLine"

const ChartBar = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Bar>>(
  ({ className, fill = "currentColor", ...props }, ref) => (
    <Bar ref={ref} className={cn("fill-primary", className)} fill={fill} {...props} />
  ),
)
ChartBar.displayName = "ChartBar"

const ChartArea = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Area>>(
  ({ className, type = "monotone", strokeWidth = 2, fill = "currentColor", ...props }, ref) => (
    <Area
      ref={ref}
      className={cn("fill-primary", className)}
      type={type}
      strokeWidth={strokeWidth}
      fill={fill}
      {...props}
    />
  ),
)
ChartArea.displayName = "ChartArea"

const ChartPie = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Pie>>(({ className, ...props }, ref) => (
  <Pie ref={ref} className={cn("fill-primary", className)} {...props} />
))
ChartPie.displayName = "ChartPie"

type ChartPrimitiveProps = React.ComponentProps<typeof RechartsLineChart> & {
  type: "line" | "bar" | "pie" | "area"
}

const ChartPrimitive = React.forwardRef<HTMLDivElement, ChartPrimitiveProps>(({ className, type, ...props }, ref) => {
  const Comp =
    type === "line"
      ? RechartsLineChart
      : type === "bar"
        ? RechartsBarChart
        : type === "pie"
          ? RechartsPieChart
          : type === "area"
            ? AreaChart
            : RechartsLineChart

  return <Comp ref={ref} className={cn("w-full h-full", className)} {...props} />
})
ChartPrimitive.displayName = "ChartPrimitive"

const ChartIndicator = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Slot> & VariantProps<typeof chartIndicatorVariants>
>(({ className, variant, ...props }, ref) => (
  <Slot ref={ref} className={cn(chartIndicatorVariants({ variant }), className)} {...props} />
))
ChartIndicator.displayName = "ChartIndicator"

const chartIndicatorVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const ChartIcon = React.forwardRef<SVGSVGElement, React.ComponentProps<typeof BarChart>>(
  ({ className, ...props }, ref) => <BarChart ref={ref} className={cn("h-4 w-4", className)} {...props} />,
)
ChartIcon.displayName = "ChartIcon"

const ChartLineIcon = React.forwardRef<SVGSVGElement, React.ComponentProps<typeof LineChart>>(
  ({ className, ...props }, ref) => <LineChart ref={ref} className={cn("h-4 w-4", className)} {...props} />,
)
ChartLineIcon.displayName = "ChartLineIcon"

export {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
  ChartTooltipContent,
  ChartCrosshair,
  ChartAxis,
  ChartAxisY,
  ChartLine,
  ChartBar,
  ChartArea,
  ChartPie,
  ChartPrimitive,
  ChartIndicator,
  ChartIcon,
  ChartLineIcon,
}
