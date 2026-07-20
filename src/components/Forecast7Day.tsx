/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DailyForecastItem } from "../types";
import { formatFullDate, formatWeekday, getWeatherCodeDetails } from "../utils/weather";
import WeatherIcon from "./WeatherIcon";

interface Forecast7DayProps {
  forecast: DailyForecastItem[];
}

export default function Forecast7Day({ forecast }: Forecast7DayProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-slate-800 font-bold text-lg flex items-center gap-2">
          7-Day Detailed Forecast
        </h2>
        <span className="text-xs text-slate-400 font-medium font-mono uppercase tracking-wider">
          Weekly Outlook
        </span>
      </div>

      {/* Grid of forecast cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
        {forecast.map((day, index) => {
          const details = getWeatherCodeDetails(day.weatherCode);
          const isToday = index === 0;

          return (
            <div
              key={day.date}
              className={`p-4 rounded-xl border transition-all duration-300 relative group flex flex-col justify-between items-center text-center gap-3 shadow-sm min-h-[160px] ${
                isToday
                  ? "bg-blue-50/50 border-blue-200 ring-2 ring-blue-50/80"
                  : "bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              {isToday && (
                <span className="absolute top-1.5 right-1.5 text-[8px] uppercase tracking-widest font-extrabold bg-blue-600 text-white px-1.5 py-0.5 rounded">
                  Today
                </span>
              )}

              {/* Date Header */}
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  {formatWeekday(day.date)}
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                  {day.date.substring(5).replace("-", "/")}
                </p>
              </div>

              {/* Condition Icon */}
              <div className={`p-2.5 rounded-lg bg-gradient-to-br ${details.bgClass} text-white shadow-sm transition-transform`}>
                <WeatherIcon name={details.iconName} className="w-5 h-5" />
              </div>

              {/* Condition label */}
              <span className="text-[10px] font-semibold text-slate-500 line-clamp-1">
                {details.label}
              </span>

              {/* Temperature indicators */}
              <div className="flex items-center gap-2 mt-1 font-mono">
                <span className="text-xs font-bold text-slate-900">
                  {Math.round(day.tempMax)}°
                </span>
                <span className="text-[10px] font-semibold text-slate-400">
                  {Math.round(day.tempMin)}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
