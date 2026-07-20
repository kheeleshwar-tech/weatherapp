/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DailyForecastItem } from "../types";
import { formatWeekday } from "../utils/weather";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

interface WeatherChartProps {
  forecast: DailyForecastItem[];
}

export default function WeatherChart({ forecast }: WeatherChartProps) {
  // Format the data for the chart
  const data = forecast.map((item) => ({
    name: formatWeekday(item.date),
    "High Temp (°C)": item.tempMax,
    "Low Temp (°C)": item.tempMin,
    condition: item.conditionLabel
  }));

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-lg shadow-xl text-xs font-sans text-white">
          <p className="font-semibold text-slate-300 mb-1.5">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-6">
              <span className="text-blue-300 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                High Temp:
              </span>
              <span className="font-bold">{payload[0].value}°C</span>
            </div>
            <div className="flex items-center justify-between gap-6">
              <span className="text-slate-300 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-400 inline-block" />
                Low Temp:
              </span>
              <span className="font-bold">{payload[1].value}°C</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 border-t border-slate-800 pt-1">
              Condition: {payload[0].payload.condition}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80 bg-white border border-slate-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-1">
        <h2 className="text-slate-800 font-bold text-lg">
          Temperature Trends <span className="text-slate-400 font-normal text-sm ml-2">7-Day Outlook</span>
        </h2>
        <div className="flex gap-4 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500"></span> High Temp</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-slate-300"></span> Low Temp</div>
        </div>
      </div>

      <div className="w-full h-[calc(100%-2.5rem)]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="name"
              stroke="#94a3b8"
              className="text-slate-400 text-[10px] font-mono"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#94a3b8"
              className="text-slate-400 text-[10px] font-mono"
              tickLine={false}
              axisLine={false}
              domain={["auto", "auto"]}
            />
            <Tooltip content={customTooltip} />
            <Line
              type="monotone"
              dataKey="High Temp (°C)"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 1 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="Low Temp (°C)"
              stroke="#cbd5e1"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 1 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
