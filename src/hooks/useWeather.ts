import { useQuery } from "@tanstack/react-query";
import API from "@/services";
import { API_KEY } from "@/constants";
import { WeatherLocationResponse } from "@/types";

type UseWeatherProps = {
  coordinates: string;
};

const useWeather = ({ coordinates }: UseWeatherProps) => {
  const { data, isFetching } = useQuery<WeatherLocationResponse>({
    enabled: !!coordinates,
    queryKey: ["weather", coordinates],
    queryFn: () =>
      API.get(`/current.json?key=${API_KEY}&q=${coordinates}&aqi=no`).then(
        (res) => res.data
      ),
  });

  return {
    data,
    isLoadingWeatherData: isFetching,
  };
};

export default useWeather;
