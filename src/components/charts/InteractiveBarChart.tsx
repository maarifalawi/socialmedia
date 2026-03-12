import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DataPoint {
  [key: string]: any;
}

interface InteractiveBarChartProps {
  data: DataPoint[];
  dataKey: string;
  nameKey: string;
  title: string;
  colors?: string[];
  showPercentage?: boolean;
  layout?: "horizontal" | "vertical";
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const CustomTooltip = ({ active, payload, total, showPercentage }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-medium text-foreground mb-1">{payload[0].payload.name}</p>
        <p className="text-sm text-muted-foreground">
          Jumlah: <span className="text-foreground font-medium">{value}</span>
        </p>
        {showPercentage && (
          <p className="text-sm text-muted-foreground">
            Persentase: <span className="text-foreground font-medium">{percentage}%</span>
          </p>
        )}
      </div>
    );
  }
  return null;
};

export const InteractiveBarChart = ({
  data,
  dataKey,
  nameKey,
  title,
  colors = COLORS,
  showPercentage = true,
  layout = "vertical"
}: InteractiveBarChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const total = data.reduce((sum, d) => sum + (d[dataKey] || 0), 0);

  const handleMouseEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {data.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">Tidak ada data</p>
        ) : (
          <ResponsiveContainer width="100%" height={300} minWidth={0}>
            <BarChart
              data={data}
              layout={layout}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
              {layout === "vertical" ? (
                <>
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
                  <YAxis 
                    dataKey={nameKey} 
                    type="category" 
                    stroke="hsl(var(--muted-foreground))" 
                    tick={{ fontSize: 12 }}
                    width={100}
                  />
                </>
              ) : (
                <>
                  <XAxis dataKey={nameKey} stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
                  <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
                </>
              )}
              <Tooltip content={<CustomTooltip total={total} showPercentage={showPercentage} />} />
              <Bar
                dataKey={dataKey}
                radius={[4, 4, 4, 4]}
                animationDuration={800}
                animationEasing="ease-out"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                    opacity={activeIndex === null || activeIndex === index ? 1 : 0.5}
                    style={{ transition: "opacity 0.2s ease" }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}

        {/* Legend with percentages */}
        {showPercentage && data.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3">
            {data.map((item, index) => {
              const percentage = total > 0 ? ((item[dataKey] / total) * 100).toFixed(1) : 0;
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm"
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <div
                    className="h-3 w-3 rounded-sm"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                  <span className="text-muted-foreground">
                    {item[nameKey]}: <span className="text-foreground font-medium">{percentage}%</span>
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
