/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent, MouseEvent } from "react";
import { CityInfo } from "../types";
import WeatherIcon from "./WeatherIcon";

interface CitySearchProps {
  onSelectCity: (city: CityInfo) => void;
  selectedCity: CityInfo | null;
}

export default function CitySearch({ onSelectCity, selectedCity }: CitySearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CityInfo[]>([]);
  const [history, setHistory] = useState<CityInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Load history from localstorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("weather_search_history");
      if (stored) {
        setHistory(JSON.parse(stored));
      } else {
        // Seed default popular history cities
        const defaults: CityInfo[] = [
          { id: 5128581, name: "New York", latitude: 40.71427, longitude: -74.00597, country: "United States", admin1: "New York", country_code: "US" },
          { id: 2643743, name: "London", latitude: 51.50853, longitude: -0.12574, country: "United Kingdom", admin1: "England", country_code: "GB" },
          { id: 1850147, name: "Tokyo", latitude: 35.6895, longitude: 139.69171, country: "Japan", admin1: "Tokyo", country_code: "JP" },
          { id: 2988507, name: "Paris", latitude: 48.85341, longitude: 2.3488, country: "France", admin1: "Île-de-France", country_code: "FR" }
        ];
        setHistory(defaults);
        localStorage.setItem("weather_search_history", JSON.stringify(defaults));
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
  }, []);

  const handleSearch = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setShowDropdown(true);

    try {
      const encoded = encodeURIComponent(query.trim());
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encoded}&count=5&language=en&format=json`
      );

      if (!res.ok) {
        throw new Error("Geocoding service unavailable. Please try again.");
      }

      const data = await res.json();

      if (!data.results || data.results.length === 0) {
        setError("City not found. Please verify spelling.");
        setResults([]);
      } else {
        const formattedResults: CityInfo[] = data.results.map((item: any) => ({
          id: item.id,
          name: item.name,
          latitude: item.latitude,
          longitude: item.longitude,
          country: item.country || "Unknown Country",
          admin1: item.admin1,
          country_code: item.country_code,
          timezone: item.timezone
        }));
        setResults(formattedResults);
        // If there is exact 1 result, trigger it automatically to save user click
        if (formattedResults.length === 1) {
          selectCity(formattedResults[0]);
        }
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch locations. Please check connection.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const selectCity = (city: CityInfo) => {
    onSelectCity(city);
    setQuery("");
    setShowDropdown(false);
    setResults([]);

    // Add to history (remove duplicate first)
    setHistory((prev) => {
      const filtered = prev.filter((item) => item.id !== city.id);
      const updated = [city, ...filtered].slice(0, 5); // Keep up to 5
      localStorage.setItem("weather_search_history", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromHistory = (e: MouseEvent, id: number) => {
    e.stopPropagation();
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("weather_search_history", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="relative w-full space-y-4">
      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="relative flex gap-2">
        <div className="relative flex-grow">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Search for a city (e.g. Rome, Tokyo)..."
            className="w-full h-11 pl-10 pr-12 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 font-sans text-sm focus:border-blue-500 outline-none shadow-sm transition-colors"
          />
          <WeatherIcon name="Search" className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
          
          {query.trim() && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setShowDropdown(false);
                setResults([]);
              }}
              className="absolute right-3 top-3 text-xs font-semibold text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="h-11 px-5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm cursor-pointer transition-colors shrink-0 flex items-center justify-center gap-2"
        >
          {loading ? (
            <WeatherIcon name="RefreshCw" className="w-3.5 h-3.5 animate-spin" />
          ) : (
            "Search"
          )}
        </button>
      </form>

      {/* Geocoding Dropdown Results */}
      {showDropdown && (results.length > 0 || error || loading) && (
        <div className="absolute z-50 w-full bg-white border border-slate-200 shadow-lg rounded-lg overflow-hidden max-h-72 overflow-y-auto mt-1 font-sans">
          <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
              {results.length > 0 ? "Select Location Match" : "Search Status"}
            </span>
            <button
              onClick={() => setShowDropdown(false)}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600"
            >
              Close
            </button>
          </div>

          {loading && (
            <div className="p-6 flex flex-col items-center justify-center gap-2 text-slate-400">
              <WeatherIcon name="RefreshCw" className="w-5 h-5 animate-spin text-blue-500" />
              <span className="text-xs">Locating cities...</span>
            </div>
          )}

          {error && (
            <div className="p-5 flex gap-2 items-center text-rose-600 bg-rose-50/50">
              <WeatherIcon name="AlertCircle" className="w-4 h-4 shrink-0" />
              <span className="text-xs font-semibold">{error}</span>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="divide-y divide-slate-100">
              {results.map((city) => (
                <button
                  key={city.id}
                  onClick={() => selectCity(city)}
                  className="w-full p-3 hover:bg-slate-50 text-left flex items-center justify-between gap-3 group transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <WeatherIcon name="MapPin" className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {city.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {[city.admin1, city.country].filter(Boolean).join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {city.country_code && (
                      <span className="text-[9px] bg-slate-100 px-1.5 py-0.5 rounded font-mono font-bold text-slate-500">
                        {city.country_code.toUpperCase()}
                      </span>
                    )}
                    <WeatherIcon name="ArrowRight" className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Favorites / Recently Searched Chips */}
      {history.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <WeatherIcon name="Clock" className="w-3 h-3 text-slate-400" />
            Quick Locations
          </p>
          <div className="flex flex-wrap gap-2">
            {history.map((city) => {
              const isActive = selectedCity?.id === city.id;
              return (
                <div
                  key={city.id}
                  onClick={() => onSelectCity(city)}
                  className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
                    isActive
                      ? "bg-blue-50 border-blue-200 text-blue-600 shadow-sm"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <WeatherIcon name="MapPin" className={`w-3 h-3 ${isActive ? "text-blue-500" : "text-slate-400"}`} />
                  <span>{city.name}</span>
                  <button
                    onClick={(e) => removeFromHistory(e, city.id)}
                    className={`ml-1 hover:text-rose-500 p-0.5 rounded transition-colors ${
                      isActive ? "text-blue-300 hover:text-blue-600" : "text-slate-400 opacity-40 group-hover:opacity-100"
                    }`}
                    title="Remove from history"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
