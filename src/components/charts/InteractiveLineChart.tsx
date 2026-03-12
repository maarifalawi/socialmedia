import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
  Brush,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Minus, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface DataPoint {
  [key: string]: any;
}

interface InteractiveLineChartProps {
  data: DataPoint[];
  dataKey: string;
  xAxisKey: string;
  title: string;
  color?: string;
  showBrush?: boolean;
  showTrend?: boolean;
  unit?: string;
}

const CustomTooltip = ({ active, payload, label, unit }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-medium text-foreground mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value?.toFixed(2)}{unit}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const InteractiveLineChart = ({
  data,
  dataKey,
  xAxisKey,
  title,
  color = "hsl(var(--primary))",
  showBrush = true,
  showTrend = true,
  unit = ""
}: InteractiveLineChartProps) => {
  const [zoomDomain, setZoomDomain] = useState<{ start?: number; end?: number }>({});
  const [isZoomed, setIsZoomed] = useState(false);

  // Calculate trend
  const calculateTrend = () => {
    if (data.length < 2) return { direction: "neutral", percentage: 0 };
    const first = data[0][dataKey] || 0;
    const last = data[data.length - 1][dataKey] || 0;
    if (first === 0) return { direction: "neutral", percentage: 0 };
    const percentage = ((last - first) / first) * 100;
    return {
      direction: percentage > 5 ? "up" : percentage < -5 ? "down" : "neutral",
      percentage: Math.abs(percentage)
    };
  };

  const trend = calculateTrend();

  // Calculate average
  const average = data.length > 0
    ? data.reduce((sum, d) => sum + (d[dataKey] || 0), 0) / data.length
    : 0;

  const handleBrushChange = (brushData: any) => {
    if (brushData && brushData.startIndex !== undefined) {
      setZoomDomain({ start: brushData.startIndex, end: brushData.endIndex });
      setIsZoomed(true);
    }
  };

  const resetZoom = () => {
    setZoomDomain({});
    setIsZoomed(false);
  };

  const TrendIcon = trend.direction === "up" ? TrendingUp : 
                    trend.direction === "down" ? TrendingDown : Minus;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex items-center gap-2">
            {showTrend && data.length >= 2 && (
              <div className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full ${
                trend.direction === "up" ? "bg-success/10 text-success" :
                trend.direction === "down" ? "bg-destructive/10 text-destructive" :
                "bg-muted text-muted-foreground"
              }`}>
                <TrendIcon className="h-3 w-3" />
                <span>{trend.percentage.toFixed(1)}%</span>
              </div>
            )}
            {isZoomed && (
              <Button variant="ghost" size="sm" onClick={resetZoom}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {data.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">Tidak ada data</p>
        ) : (
          <ResponsiveContainer width="100%" height={300} minWidth={0}>
            <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis 
                dataKey={xAxisKey} 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fontSize: 12 }}
                tickLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip unit={unit} />} />
              <Legend 
                wrapperStyle={{ paddingTop: 10 }}
                formatter={(value) => <span className="text-foreground">{value}</span>}
              />
              <ReferenceLine 
                y={average} 
                stroke="hsl(var(--muted-foreground))" 
                strokeDasharray="5 5"
                label={{ 
                  value: `Avg: ${average.toFixed(2)}${unit}`, 
                  position: "right",
                  fill: "hsl(var(--muted-foreground))",
                  fontSize: 11
                }} 
              />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2}
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
                fill={`url(#gradient-${dataKey})`}
                animationDuration={1000}
                animationEasing="ease-out"
              />
              {showBrush && data.length > 5 && (
                <Brush
                  dataKey={xAxisKey}
                  height={30}
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--muted))"
                  onChange={handleBrushChange}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};
