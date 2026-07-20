/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Sun,
  SunDim,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  Snowflake,
  CloudLightning,
  Wind,
  Compass,
  Droplets,
  Thermometer,
  Activity,
  Calendar,
  Search,
  MapPin,
  AlertCircle,
  Clock,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Footprints,
  Trees,
  Shovel,
  CheckCircle2,
  ThumbsUp,
  Flame,
  Snowflake as SnowIcon
} from "lucide-react";

interface WeatherIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function WeatherIcon({ name, className = "w-6 h-6", size }: WeatherIconProps) {
  const props = size ? { className, size } : { className };

  switch (name) {
    case "Sun":
      return <Sun {...props} />;
    case "SunDim":
      return <SunDim {...props} />;
    case "CloudSun":
      return <CloudSun {...props} />;
    case "Cloud":
      return <Cloud {...props} />;
    case "CloudFog":
      return <CloudFog {...props} />;
    case "CloudDrizzle":
      return <CloudDrizzle {...props} />;
    case "CloudRain":
      return <CloudRain {...props} />;
    case "Snowflake":
      return <Snowflake {...props} />;
    case "CloudLightning":
      return <CloudLightning {...props} />;
    case "Wind":
      return <Wind {...props} />;
    case "Compass":
      return <Compass {...props} />;
    case "Droplets":
      return <Droplets {...props} />;
    case "Thermometer":
      return <Thermometer {...props} />;
    case "Activity":
      return <Activity {...props} />;
    case "Calendar":
      return <Calendar {...props} />;
    case "Search":
      return <Search {...props} />;
    case "MapPin":
      return <MapPin {...props} />;
    case "AlertCircle":
      return <AlertCircle {...props} />;
    case "Clock":
      return <Clock {...props} />;
    case "ArrowRight":
      return <ArrowRight {...props} />;
    case "Sparkles":
      return <Sparkles {...props} />;
    case "RefreshCw":
      return <RefreshCw {...props} />;
    case "Footprints":
      return <Footprints {...props} />;
    case "Trees":
      return <Trees {...props} />;
    case "Shovel":
      return <Shovel {...props} />;
    case "CheckCircle2":
      return <CheckCircle2 {...props} />;
    case "ThumbsUp":
      return <ThumbsUp {...props} />;
    case "Flame":
      return <Flame {...props} />;
    default:
      return <CloudSun {...props} />;
  }
}
