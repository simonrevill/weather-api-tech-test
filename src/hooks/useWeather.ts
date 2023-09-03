import { useQuery } from "@tanstack/react-query";
import API from "@/services";
import { API_KEY } from "@/constants";
import { WeatherLocationResponse } from "@/types";

type UseWeatherProps = {
  coordinates: string;
};

const useWeather = ({ coordinates }: UseWeatherProps) => {
  const { data } = useQuery<WeatherLocationResponse>({
    enabled: !!coordinates.length,
    queryKey: ["weather", coordinates],
    queryFn: () =>
      API.get(`/current.json?key=${API_KEY}&q=${coordinates}&aqi=no`).then(
        (res) => res.data
      ),
  });

  return {
    data,
  };
};

export default useWeather;
