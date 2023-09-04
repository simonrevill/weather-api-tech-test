import { useState, ChangeEvent } from "react";
import useDebounce from "./useDebounce";
import { useQuery } from "@tanstack/react-query";
import API from "@/services";
import { API_KEY } from "@/constants";
import { LocationResponse } from "@/types";

const useCitySearch = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCity, setSelectedCity] = useState("");

  const debouncedSearchQuery = useDebounce<string>(searchQuery);

  const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSetSelectedCity = (value: string) => {
    setSelectedCity(value);
  };

  const { data, isFetching, isError } = useQuery<LocationResponse[]>({
    enabled: !!debouncedSearchQuery,
    queryKey: ["cities", debouncedSearchQuery],
    queryFn: () =>
      API.get(`/search.json?key=${API_KEY}&q=${debouncedSearchQuery}`).then(
        (res) => res.data
      ),
  });

  return {
    query: debouncedSearchQuery,
    handleChangeQuery,
    selectedCity: selectedCity,
    handleSetSelectedCity,
    isLoadingCities: isFetching && !!debouncedSearchQuery,
    cities: data,
    noResults: data?.length === 0,
    coordinates: selectedCity?.split(" | ")[1] ?? "",
    isError,
  };
};

export default useCitySearch;
