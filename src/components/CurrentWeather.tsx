/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CurrentWeatherData, CityInfo, WeatherCodeDetails } from "../types";
import WeatherIcon from "./WeatherIcon";

interface CurrentWeatherProps {
  current: CurrentWeatherData;
  city: CityInfo;
  codeDetails: WeatherCodeDetails;
}

export default function CurrentWeather({ current, city, codeDetails }: CurrentWeatherProps) {
  // Format the last updated time nicely
  const formatTime = (timeStr: string) => {
    try {
      const date = new Date(timeStr);
      if (isNaN(date.getTime())) return timeStr;
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return timeStr;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between shadow-sm h-full min-h-[280px]">
      <div>
        <div className="flex justify-between items-start">
          <div className="space-y-0.5">
            <h2 className="text-slate-500 font-semibold text-xs uppercase tracking-wider">
              Current Conditions
            </h2>
            <p className="text-[10px] text-slate-400 font-medium">
              Last Updated: {formatTime(current.time)}
            </p>
          </div>
          <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full font-bold border border-blue-100">
            Live
          </span>
        </div>

        <div className="flex items-center gap-5 mt-6 mb-4">
          <span className="text-6xl font-light text-slate-900 tracking-tighter">
            {Math.round(current.temperature)}°
          </span>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-slate-900">
              <span className="text-xl font-bold tracking-tight">{city.name}</span>
              {city.country_code && (
                <span className="text-[9px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.5 rounded font-mono uppercase">
                  {city.country_code}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-slate-500 text-sm font-medium italic">
                {codeDetails.label}
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${codeDetails.textBgClass} font-bold scale-90`}>
                Index {codeDetails.outdoorScore}/10
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between border-t border-slate-100 pt-5 mt-4">
        <div className="text-center flex-1">
          <span className="block text-xs text-slate-400 uppercase tracking-wider font-semibold">Humidity</span>
          <span className="text-base font-bold text-slate-800">{current.humidity}%</span>
        </div>
        <div className="w-px bg-slate-100 h-10 self-center" />
        <div className="text-center flex-1">
          <span className="block text-xs text-slate-400 uppercase tracking-wider font-semibold">Wind</span>
          <span className="text-base font-bold text-slate-800">{current.windSpeed} km/h</span>
        </div>
        <div className="w-px bg-slate-100 h-10 self-center" />
        <div className="text-center flex-1">
          <span className="block text-xs text-slate-400 uppercase tracking-wider font-semibold">Comfort</span>
          <span className="text-base font-bold text-slate-800">
            {current.temperature > 28 ? "Warm" : current.temperature < 12 ? "Cool" : "Mild"}
          </span>
        </div>
      </div>

    </div>
  );
}
