"use client";

import { CrowdWidget } from "@/components/crowd/crowd-widget";
import { RiverWidget } from "@/components/conditions/river-widget";
import { WeatherWidget } from "@/components/conditions/weather-widget";

export function ConditionsLiveWidgets() {
  return (
    <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:gap-6">
      <WeatherWidget variant="default" />
      <RiverWidget variant="default" />
      <CrowdWidget variant="default" />
    </div>
  );
}
