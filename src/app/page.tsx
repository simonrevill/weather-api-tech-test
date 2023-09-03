"use client";

import CitySearch from "@/components/CitySearch";
import WeatherView from "@/components/WeatherView";
import useCitySearch from "@/hooks/useCitySearch";
import useWeather from "@/hooks/useWeather";

export default function Home() {
  const {
    query,
    handleChangeQuery,
    selectedCity,
    handleSetSelectedCity,
    isLoadingCities,
    cities,
    noResults,
    coordinates,
    isError,
  } = useCitySearch();

  const { data } = useWeather({
    coordinates,
  });

  return (
    <main className="mx-auto max-w-5xl h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)] flex flex-col gap-4">
      <h1 className="text-3xl md:text-4xl font-bold">Weather Search</h1>
      <CitySearch
        query={query}
        value={selectedCity}
        onChange={handleSetSelectedCity}
        setSearchQuery={handleChangeQuery}
        isLoadingCities={isLoadingCities}
        cities={cities}
        noResults={noResults}
        isError={isError}
      />
      <WeatherView data={data} />
    </main>
  );
}
