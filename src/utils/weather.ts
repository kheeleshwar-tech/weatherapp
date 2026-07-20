/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WeatherCodeDetails } from "../types";

export function getWeatherCodeDetails(code: number): WeatherCodeDetails {
  switch (code) {
    case 0:
      return {
        label: "Clear Sky",
        iconName: "Sun",
        bgClass: "from-amber-400 via-orange-400 to-amber-500",
        textBgClass: "bg-amber-500/20 text-amber-900 border-amber-500/30",
        recommendation: "Perfect weather for any outdoor adventure. Take a walk, go running, or visit a park!",
        indoorRecommendation: "Great day to let natural light in, but try to spend some time outside if you can.",
        outdoorScore: 10,
        hikingScore: 10,
        runningScore: 9,
        gardeningScore: 9,
        clothingTip: "Lightweight clothes, sunglasses, and sunscreen are highly recommended."
      };
    case 1:
      return {
        label: "Mainly Clear",
        iconName: "SunDim",
        bgClass: "from-amber-300 via-yellow-400 to-orange-400",
        textBgClass: "bg-amber-400/20 text-amber-900 border-amber-400/30",
        recommendation: "Very pleasant weather. Ideal for biking, sightseeing, or dining outdoors.",
        indoorRecommendation: "A bright day that boosts mood; excellent for working near a window.",
        outdoorScore: 9.5,
        hikingScore: 9.5,
        runningScore: 9,
        gardeningScore: 9,
        clothingTip: "Comfortable casual clothes. Have sunglasses handy."
      };
    case 2:
      return {
        label: "Partly Cloudy",
        iconName: "CloudSun",
        bgClass: "from-sky-400 via-blue-400 to-slate-400",
        textBgClass: "bg-sky-400/20 text-sky-900 border-sky-400/30",
        recommendation: "Great balanced weather. Not too hot, not too sunny. Excellent for a jog or hike.",
        indoorRecommendation: "Good light levels. Perfect for focused indoor creative projects or gym sessions.",
        outdoorScore: 9,
        hikingScore: 9,
        runningScore: 9.5,
        gardeningScore: 8.5,
        clothingTip: "Light layers are perfect, as it might feel slightly cooler when clouds pass."
      };
    case 3:
      return {
        label: "Overcast",
        iconName: "Cloud",
        bgClass: "from-slate-400 via-zinc-400 to-slate-500",
        textBgClass: "bg-slate-400/20 text-slate-950 border-slate-400/30",
        recommendation: "Cloudy skies. Outdoor sports and urban walks are comfortable, but pack a light jacket.",
        indoorRecommendation: "Cozy atmosphere indoors. Great time for visiting museums, reading, or baking.",
        outdoorScore: 7,
        hikingScore: 7.5,
        runningScore: 8,
        gardeningScore: 8,
        clothingTip: "A light windbreaker or sweater will keep you comfortable under the cloud cover."
      };
    case 45:
    case 48:
      return {
        label: "Foggy",
        iconName: "CloudFog",
        bgClass: "from-neutral-300 via-gray-400 to-slate-500",
        textBgClass: "bg-neutral-400/20 text-neutral-900 border-neutral-400/30",
        recommendation: "Low visibility. Avoid driving if possible. Choose local urban walks over high-altitude hikes.",
        indoorRecommendation: "Highly recommended to stay indoors. A perfect day for movies, board games, or warm tea.",
        outdoorScore: 3,
        hikingScore: 2,
        runningScore: 4,
        gardeningScore: 5,
        clothingTip: "Wear bright or reflective clothing if going outside so vehicles can see you."
      };
    case 51:
    case 53:
    case 55:
      return {
        label: "Drizzle",
        iconName: "CloudDrizzle",
        bgClass: "from-slate-400 via-blue-300 to-zinc-400",
        textBgClass: "bg-slate-400/20 text-slate-900 border-slate-400/30",
        recommendation: "Damp and misty. If you go out, choose paved trails and carry an umbrella.",
        indoorRecommendation: "Ideal for indoor cafes, catching up on reading, or visiting a local library.",
        outdoorScore: 5,
        hikingScore: 4,
        runningScore: 5,
        gardeningScore: 6,
        clothingTip: "Water-resistant jacket with a hood is ideal. Keep comfortable footwear."
      };
    case 56:
    case 57:
      return {
        label: "Freezing Drizzle",
        iconName: "CloudSnow",
        bgClass: "from-sky-300 via-slate-300 to-indigo-400",
        textBgClass: "bg-sky-400/20 text-indigo-950 border-sky-400/30",
        recommendation: "Icy surfaces warning. Extreme caution when walking outdoors or driving.",
        indoorRecommendation: "Stay warm and cozy inside. Best to stay off the roads and enjoy indoor hobbies.",
        outdoorScore: 1,
        hikingScore: 1,
        runningScore: 1,
        gardeningScore: 1,
        clothingTip: "Thermal layers, slip-resistant insulated boots, and heavy gloves."
      };
    case 61:
    case 63:
    case 65:
      return {
        label: code === 61 ? "Light Rain" : code === 63 ? "Moderate Rain" : "Heavy Rain",
        iconName: "CloudRain",
        bgClass: "from-blue-500 via-slate-500 to-indigo-600",
        textBgClass: "bg-blue-500/20 text-blue-900 border-blue-500/30",
        recommendation: code === 65 
          ? "Heavy rain expected. Avoid outdoor activities. Risk of local pooling."
          : "Wet conditions. Paved walks are okay, but indoor plans are more comfortable.",
        indoorRecommendation: "Great time to clean, cook a warm meal, visit a gym, or catch up on chores.",
        outdoorScore: code === 61 ? 4 : 2,
        hikingScore: code === 61 ? 3 : 1,
        runningScore: code === 61 ? 4.5 : 2,
        gardeningScore: code === 61 ? 5 : 2,
        clothingTip: "Sturdy umbrella, waterproof rain jacket, and waterproof boots."
      };
    case 66:
    case 67:
      return {
        label: "Freezing Rain",
        iconName: "CloudSnow",
        bgClass: "from-slate-400 via-indigo-300 to-blue-500",
        textBgClass: "bg-indigo-400/20 text-indigo-900 border-indigo-400/30",
        recommendation: "Hazardous icy conditions. Slip hazard is very high. Stay inside if possible.",
        indoorRecommendation: "Cozy up with a hot drink, watch a movie, or practice a musical instrument.",
        outdoorScore: 1,
        hikingScore: 1,
        runningScore: 1,
        gardeningScore: 1,
        clothingTip: "Heavy winter coat, ice-grips for shoes, scarf, and warm gloves."
      };
    case 71:
    case 73:
    case 75:
      return {
        label: code === 71 ? "Light Snow" : code === 73 ? "Moderate Snow" : "Heavy Snow",
        iconName: "Snowflake",
        bgClass: "from-sky-200 via-slate-300 to-indigo-400",
        textBgClass: "bg-sky-300/25 text-sky-950 border-sky-300/40",
        recommendation: code === 75
          ? "Heavy snow storm. Stay indoors. Perfect day for hot cocoa."
          : "Beautiful snowy day! Ideal for building a snowman, skiing, or taking scenic winter photos.",
        indoorRecommendation: "Watch the snow fall from a warm room. Excellent day for baking or reading.",
        outdoorScore: code === 75 ? 2 : 5,
        hikingScore: code === 75 ? 1 : 4,
        runningScore: code === 75 ? 1.5 : 3,
        gardeningScore: code === 75 ? 0 : 1,
        clothingTip: "Warm thermal underwear, down jacket, beanie, thick gloves, and water-resistant boots."
      };
    case 77:
      return {
        label: "Snow Grains",
        iconName: "Snowflake",
        bgClass: "from-zinc-300 via-slate-300 to-sky-300",
        textBgClass: "bg-slate-300/20 text-slate-900 border-slate-300/30",
        recommendation: "Light frozen precipitation. Safe for short walks, but quite cold and brisk.",
        indoorRecommendation: "Perfect afternoon for warm tea, puzzles, or studying.",
        outdoorScore: 4,
        hikingScore: 3,
        runningScore: 3.5,
        gardeningScore: 1,
        clothingTip: "Insulated winter jacket, windproof hat, and gloves."
      };
    case 80:
    case 81:
    case 82:
      return {
        label: "Rain Showers",
        iconName: "CloudRain",
        bgClass: "from-sky-500 via-blue-500 to-zinc-500",
        textBgClass: "bg-sky-500/20 text-sky-950 border-sky-500/30",
        recommendation: "Passing heavy showers. Have a shelter plan ready; rain can start and stop quickly.",
        indoorRecommendation: "Keep outdoor plans flexible. Pop into a coffee shop or museum during heavy bursts.",
        outdoorScore: 4.5,
        hikingScore: 3.5,
        runningScore: 4,
        gardeningScore: 5,
        clothingTip: "Packable rain poncho or high-quality umbrella, with quick-drying shoes."
      };
    case 85:
    case 86:
      return {
        label: "Snow Showers",
        iconName: "Snowflake",
        bgClass: "from-cyan-300 via-slate-300 to-blue-400",
        textBgClass: "bg-cyan-400/20 text-cyan-950 border-cyan-400/30",
        recommendation: "Intermittent snow flurries. Beautiful but cold. Great for winter scenery.",
        indoorRecommendation: "Enjoy the periodic flurries with a view of the outdoors from a warm spot.",
        outdoorScore: 4.5,
        hikingScore: 3.5,
        runningScore: 3,
        gardeningScore: 1,
        clothingTip: "Puffer coat, warm knit hat, insulated gloves, and waterproof sneakers."
      };
    case 95:
    case 96:
    case 99:
      return {
        label: "Thunderstorm",
        iconName: "CloudLightning",
        bgClass: "from-slate-700 via-purple-900 to-zinc-800",
        textBgClass: "bg-purple-900/30 text-purple-200 border-purple-500/30",
        recommendation: "Active lightning hazard! Seek immediate sturdy shelter. Do not stand near trees.",
        indoorRecommendation: "Unplug sensitive electronics. Great time for cozy board games, baking, or streaming.",
        outdoorScore: 0.5,
        hikingScore: 0,
        runningScore: 0.5,
        gardeningScore: 1,
        clothingTip: "Stay fully indoors. If you must go out, avoid holding metal umbrellas."
      };
    default:
      return {
        label: "Unknown Weather",
        iconName: "CloudSun",
        bgClass: "from-blue-400 via-teal-400 to-indigo-500",
        textBgClass: "bg-blue-400/20 text-blue-900 border-blue-400/30",
        recommendation: "Weather conditions are variable. Plan with caution and check local updates.",
        indoorRecommendation: "Always a safe bet to have some indoor backup plans.",
        outdoorScore: 5,
        hikingScore: 5,
        runningScore: 5,
        gardeningScore: 5,
        clothingTip: "Standard layers to adapt to changing conditions."
      };
  }
}

/**
 * Dynamically computes planning scores adjusted for actual temperatures, wind speed, and humidity.
 * This takes simple WMO-based base scores and fine-tunes them for extreme heat, cold, or high winds.
 */
export function getAdjustedActivityScores(
  baseDetails: WeatherCodeDetails,
  temp: number,
  windSpeed: number,
  humidity: number
) {
  // Start with weather code base scores
  let outdoor = baseDetails.outdoorScore;
  let hiking = baseDetails.hikingScore;
  let running = baseDetails.runningScore;
  let gardening = baseDetails.gardeningScore;

  const alerts: string[] = [];

  // Temperature Adjustments
  if (temp > 35) {
    outdoor = Math.max(1, outdoor - 5);
    hiking = Math.max(1, hiking - 6);
    running = Math.max(1, running - 7);
    gardening = Math.max(2, gardening - 4);
    alerts.push(`Extreme heat advisory (${temp}°C). Risk of heat stroke!`);
  } else if (temp > 30) {
    outdoor = Math.max(4, outdoor - 2);
    hiking = Math.max(3, hiking - 3);
    running = Math.max(3, running - 4);
    gardening = Math.max(5, gardening - 2);
    alerts.push(`High temperature (${temp}°C). Stay hydrated and seek shade.`);
  } else if (temp < 0) {
    outdoor = Math.max(1, outdoor - 4);
    hiking = Math.max(1, hiking - 4);
    running = Math.max(1, running - 5);
    gardening = Math.max(0, gardening - 8);
    alerts.push(`Sub-zero cold (${temp}°C). Frostbite risk! Protect your skin.`);
  } else if (temp < 10) {
    outdoor = Math.max(4, outdoor - 1.5);
    hiking = Math.max(5, hiking - 1);
    running = Math.max(5, running - 1);
    gardening = Math.max(2, gardening - 4);
  }

  // Wind Adjustments (km/h)
  if (windSpeed > 40) {
    outdoor = Math.max(1, outdoor - 4);
    hiking = Math.max(1, hiking - 5);
    running = Math.max(2, running - 4);
    gardening = Math.max(1, gardening - 5);
    alerts.push(`Gale-force winds (${windSpeed} km/h). Loose objects may fly!`);
  } else if (windSpeed > 25) {
    outdoor = Math.max(5, outdoor - 1.5);
    hiking = Math.max(6, hiking - 1.5);
    running = Math.max(6, running - 1);
    gardening = Math.max(4, gardening - 2);
  }

  // Humidity Adjustments (relative %)
  if (humidity > 85 && temp > 28) {
    running = Math.max(2, running - 3);
    hiking = Math.max(3, hiking - 2);
    outdoor = Math.max(4, outdoor - 2);
    alerts.push(`Oppressive mugginess. High heat index makes exercise strain heavy.`);
  }

  return {
    outdoor: parseFloat(outdoor.toFixed(1)),
    hiking: parseFloat(hiking.toFixed(1)),
    running: parseFloat(running.toFixed(1)),
    gardening: parseFloat(gardening.toFixed(1)),
    alerts
  };
}

/**
 * Format string dates like "2026-07-20" into cleaner readable texts like "Monday, July 20"
 */
export function formatFullDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      timeZone: "UTC" // Open-Meteo dates are UTC-like
    });
  } catch {
    return dateStr;
  }
}

/**
 * Format string dates like "2026-07-20" into short weekdays like "Mon"
 */
export function formatWeekday(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      timeZone: "UTC"
    });
  } catch {
    return dateStr;
  }
}
