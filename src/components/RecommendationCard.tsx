/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CurrentWeatherData, WeatherCodeDetails } from "../types";
import { getAdjustedActivityScores } from "../utils/weather";
import WeatherIcon from "./WeatherIcon";

interface RecommendationCardProps {
  current: CurrentWeatherData;
  codeDetails: WeatherCodeDetails;
}

export default function RecommendationCard({ current, codeDetails }: RecommendationCardProps) {
  const { temperature, windSpeed, humidity } = current;
  
  // Calculate adjusted activity suitability based on real-time factors
  const adjusted = getAdjustedActivityScores(codeDetails, temperature, windSpeed, humidity);

  // Helper to determine score color, badges, and feedback
  const getScoreInfo = (score: number) => {
    if (score >= 8.5) {
      return {
        label: "Excellent",
        color: "text-emerald-300",
        bgColor: "bg-emerald-500/15",
        borderColor: "border-emerald-500/20",
        barColor: "bg-emerald-400"
      };
    }
    if (score >= 6.5) {
      return {
        label: "Good",
        color: "text-amber-300",
        bgColor: "bg-amber-500/15",
        borderColor: "border-amber-500/20",
        barColor: "bg-amber-400"
      };
    }
    if (score >= 4.0) {
      return {
        label: "Fair",
        color: "text-orange-300",
        bgColor: "bg-orange-500/15",
        borderColor: "border-orange-500/20",
        barColor: "bg-orange-400"
      };
    }
    return {
      label: "Poor",
      color: "text-rose-300",
      bgColor: "bg-rose-500/15",
      borderColor: "border-rose-500/20",
      barColor: "bg-rose-400"
    };
  };

  const outdoorInfo = getScoreInfo(adjusted.outdoor);

  // Decide dynamically what to do with plants based on rain
  const getGardeningTip = () => {
    const isRainy = [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(current.weatherCode);
    if (isRainy) {
      return "Hold off on watering! Nature has you covered.";
    }
    if (temperature > 30) {
      return "Water thoroughly early/late; high heat dries soil fast.";
    }
    return "Great conditions for general maintenance.";
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg relative overflow-hidden flex flex-col justify-between h-full min-h-[300px]">
      
      {/* Absolute Decorative Bubble */}
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        
        {/* Header */}
        <div className="flex justify-between items-start">
          <h2 className="text-blue-100 font-semibold text-xs uppercase tracking-widest">
            Intelligence Recommendation
          </h2>
          {adjusted.alerts.length > 0 && (
            <span className="text-[10px] bg-rose-500 text-white px-2 py-0.5 rounded-full font-bold uppercase animate-pulse">
              Advisory
            </span>
          )}
        </div>

        {/* Primary Advice Statement with Glassmorphic Icon */}
        <div className="flex gap-4 items-start mt-2">
          <div className="bg-white/20 p-3.5 rounded-lg backdrop-blur-md border border-white/20 shadow-sm flex items-center justify-center shrink-0">
            <WeatherIcon name="Sparkles" className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-lg font-medium leading-relaxed">
              {codeDetails.recommendation}
            </p>
            {adjusted.alerts.length > 0 && (
              <p className="text-xs text-rose-200 font-semibold">
                ⚠️ {adjusted.alerts[0]}
              </p>
            )}
          </div>
        </div>

        {/* Activity planning indicators in glassmorphic rows */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-white/10 p-3 rounded-lg border border-white/10 backdrop-blur-sm">
            <span className="block text-[10px] uppercase text-blue-200 font-bold tracking-wider mb-1">
              Outdoor Commute
            </span>
            <span className="text-xs font-semibold flex items-center gap-1.5">
              <WeatherIcon name="CheckCircle2" className="w-3.5 h-3.5 text-emerald-300" />
              Optimal ({Math.round(temperature)}°C)
            </span>
          </div>

          <div className="bg-white/10 p-3 rounded-lg border border-white/10 backdrop-blur-sm">
            <span className="block text-[10px] uppercase text-blue-200 font-bold tracking-wider mb-1">
              Indoor Plan
            </span>
            <span className="text-xs font-semibold flex items-center gap-1.5 text-blue-100">
              <WeatherIcon name="Compass" className="w-3.5 h-3.5 text-blue-200" />
              {codeDetails.indoorRecommendation.split(".")[0]}
            </span>
          </div>
        </div>

        {/* Dynamic score sliders or chips */}
        <div className="pt-2">
          <span className="block text-[10px] uppercase text-blue-200 font-bold tracking-wider mb-2">
            Outdoor Activity Scoreboard
          </span>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white/5 p-2 rounded border border-white/5 text-center">
              <span className="block text-[9px] text-blue-200 font-bold">Running</span>
              <span className="text-xs font-bold text-white">{adjusted.running}/10</span>
            </div>
            <div className="bg-white/5 p-2 rounded border border-white/5 text-center">
              <span className="block text-[9px] text-blue-200 font-bold">Hiking</span>
              <span className="text-xs font-bold text-white">{adjusted.hiking}/10</span>
            </div>
            <div className="bg-white/5 p-2 rounded border border-white/5 text-center">
              <span className="block text-[9px] text-blue-200 font-bold">Gardening</span>
              <span className="text-[10px] font-bold text-white leading-none line-clamp-1 mt-0.5">{getGardeningTip()}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Wardrobe Tip panel footer */}
      <div className="relative z-10 mt-4 border-t border-white/15 pt-3.5 flex items-center gap-2 text-xs text-blue-100">
        <WeatherIcon name="Compass" className="w-3.5 h-3.5 text-blue-200 shrink-0" />
        <span className="font-medium">
          <span className="font-bold text-white uppercase tracking-wider text-[10px] mr-1">Clothing:</span>
          {codeDetails.clothingTip}
        </span>
      </div>

    </div>
  );
}
