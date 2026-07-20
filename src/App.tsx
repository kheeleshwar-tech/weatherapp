/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { CityInfo, WeatherDataBundle, DailyForecastItem } from "./types";
import { getWeatherCodeDetails } from "./utils/weather";
import CitySearch from "./components/CitySearch";
import CurrentWeather from "./components/CurrentWeather";
import Forecast7Day from "./components/Forecast7Day";
import WeatherChart from "./components/WeatherChart";
import RecommendationCard from "./components/RecommendationCard";
import WeatherIcon from "./components/WeatherIcon";

export default function App() {
  const [selectedCity, setSelectedCity] = useState<CityInfo | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherDataBundle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize with New York or the first item in search history
  useEffect(() => {
    try {
      const stored = localStorage.getItem("weather_search_history");
      if (stored) {
        const history: CityInfo[] = JSON.parse(stored);
        if (history.length > 0) {
          setSelectedCity(history[0]);
          return;
        }
      }
    } catch (e) {
      console.error("Failed to parse history", e);
    }
    
    // Default fallback city
    setSelectedCity({
      id: 5128581,
      name: "New York",
      latitude: 40.71427,
      longitude: -74.00597,
      country: "United States",
      admin1: "New York",
      country_code: "US"
    });
  }, []);

  // Fetch weather when selectedCity changes
  useEffect(() => {
    if (!selectedCity) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const lat = selectedCity.latitude;
        const lon = selectedCity.longitude;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=celsius&wind_speed_unit=kmh&forecast_days=7&timezone=auto`;
        
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Unable to fetch weather forecast data. Please try again later.");
        }

        const data = await res.json();

        // Parse forecast data
        const forecast: DailyForecastItem[] = [];
        const times = data.daily.time;
        const tempMaxs = data.daily.temperature_2m_max;
        const tempMins = data.daily.temperature_2m_min;
        const codes = data.daily.weather_code;

        for (let i = 0; i < times.length; i++) {
          const detail = getWeatherCodeDetails(codes[i]);
          forecast.push({
            date: times[i],
            tempMax: tempMaxs[i],
            tempMin: tempMins[i],
            weatherCode: codes[i],
            conditionLabel: detail.label
          });
        }

        setWeatherData({
          city: selectedCity,
          current: {
            temperature: data.current.temperature_2m,
            humidity: data.current.relative_humidity_2m,
            weatherCode: data.current.weather_code,
            windSpeed: data.current.wind_speed_10m,
            time: data.current.time
          },
          forecast
        });
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to fetch weather forecast.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [selectedCity]);

  // Determine current weather visual details or fallback
  const codeDetails = weatherData 
    ? getWeatherCodeDetails(weatherData.current.weatherCode)
    : getWeatherCodeDetails(0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between relative pb-12">
      
      {/* Container holding app views */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 pt-6 space-y-6 relative z-10 flex-grow">
        
        {/* Navigation & Brand Title */}
        <header className="bg-white border border-slate-200 rounded-xl p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-extrabold text-sm">
              WI
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-800">
                Weather<span className="text-blue-600">Intel</span>
              </h1>
              <p className="text-xs font-semibold text-slate-400">
                Professional Weather Intelligence & Decision Platform
              </p>
            </div>
          </div>

          <div className="w-full md:w-96">
            <CitySearch onSelectCity={setSelectedCity} selectedCity={selectedCity} />
          </div>
        </header>

        {/* Dynamic Loading Overlay */}
        {loading && !weatherData && (
          <div className="bg-white border border-slate-200 rounded-xl p-12 shadow-sm flex flex-col items-center justify-center text-center gap-4 min-h-[400px]">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-blue-600 animate-spin" />
              <WeatherIcon name="RefreshCw" className="absolute top-3 left-3 w-6 h-6 text-blue-500 animate-pulse" />
            </div>
            <p className="text-sm font-semibold text-slate-600">
              Retrieving meteorological metrics and telemetry...
            </p>
          </div>
        )}

        {/* Global Error Banner */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 flex flex-col items-center gap-3 text-center">
            <WeatherIcon name="AlertCircle" className="w-10 h-10 text-rose-500 shrink-0" />
            <h4 className="font-bold text-slate-800">Service Connectivity Interrupted</h4>
            <p className="text-xs text-rose-600 max-w-md font-medium">
              {error}
            </p>
            <button
              onClick={() => setSelectedCity(selectedCity)}
              className="mt-2 text-xs bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Core Dashboard Grid */}
        {weatherData && !error && (
          <main className="space-y-6">
            
            {/* Top row: Metrics card and planning assistant */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className={loading ? "opacity-60 transition-opacity" : ""}>
                <CurrentWeather
                  current={weatherData.current}
                  city={weatherData.city}
                  codeDetails={codeDetails}
                />
              </div>

              <div className={loading ? "opacity-60 transition-opacity" : ""}>
                <RecommendationCard
                  current={weatherData.current}
                  codeDetails={codeDetails}
                />
              </div>
            </section>

            {/* Bottom Row: Temperature Trends Chart */}
            <section className={loading ? "opacity-60 transition-opacity" : ""}>
              <WeatherChart forecast={weatherData.forecast} />
            </section>

            {/* 7-Day extended outlook row */}
            <section className={`p-6 bg-white border border-slate-200 rounded-xl shadow-sm ${loading ? "opacity-60 transition-opacity" : ""}`}>
              <Forecast7Day forecast={weatherData.forecast} />
            </section>

          </main>
        )}
      </div>

      {/* Aesthetic Footer */}
      <footer className="mt-12 text-center text-[11px] font-semibold text-slate-400 z-10 relative">
        <p>© 2026 Weather Intelligence. Meteorological forecast telemetry served by Open-Meteo API.</p>
        <p className="opacity-75 mt-0.5">Automated decisions modeled around outdoor exposure guidelines and physiological thresholds.</p>
      </footer>
    </div>
  );
}
