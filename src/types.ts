/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CityInfo {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
  country_code?: string;
  timezone?: string;
}

export interface CurrentWeatherData {
  temperature: number;
  humidity: number;
  weatherCode: number;
  windSpeed: number;
  time: string;
}

export interface DailyForecastItem {
  date: string;
  tempMax: number;
  tempMin: number;
  weatherCode: number;
  conditionLabel: string;
}

export interface WeatherDataBundle {
  city: CityInfo;
  current: CurrentWeatherData;
  forecast: DailyForecastItem[];
}

export interface WeatherCodeDetails {
  label: string;
  iconName: string; // Used to select Lucide icons dynamically
  bgClass: string; // Gradient class for card/app background
  textBgClass: string; // High contrast text background or badge color
  recommendation: string;
  indoorRecommendation: string;
  outdoorScore: number; // 0 to 10
  hikingScore: number; // 0 to 10
  runningScore: number; // 0 to 10
  gardeningScore: number; // 0 to 10
  clothingTip: string;
}
