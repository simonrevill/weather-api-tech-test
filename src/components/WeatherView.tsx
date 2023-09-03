import Image from "next/image";
import { WeatherLocationResponse } from "@/types";
import MagnifyingGlassIcon from "@/components/MagnifyingGlassIcon";

type WeatherViewProps = {
  data: WeatherLocationResponse | undefined;
};

const WeatherView = ({ data }: WeatherViewProps) => {
  if (!data) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <div className="flex flex-col items-center gap-2">
          <MagnifyingGlassIcon
            className="h-12 w-12 md:h-24 md:w-24 text-slate-400"
            aria-hidden="true"
            data-testid="search-icon"
          />
          <h2 className="text-slate-400" data-testid="search-text">
            Search for city to get started.
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold" data-testid="location-name">
          {data.location.name}
        </h2>
        <p className="text-sm font-bold" data-testid="location-region">
          {data.location.region}
        </p>
        <p className="text-sm font-bold" data-testid="location-country">
          {data.location.country}
        </p>
      </div>
      <div className="flex items-end gap-4">
        <Image
          src={`https:${data.current.condition.icon}`}
          width={64}
          height={64}
          alt={data.current.condition.text}
          data-testid="icon"
        />
        <div className="flex flex-col">
          <p className="text-3xl font-bold" data-testid="temp_c">
            {data.current.temp_c}&deg;C
          </p>
          <p
            className="text-lg font-medium text-slate-600"
            data-testid="temp_f"
          >
            {data.current.temp_f}&deg;F
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-xl font-bold" data-testid="desciption">
          {data.current.condition.text}
        </p>
        <p data-testid="humidity">
          Humidity: <strong>{data.current.humidity}</strong>
        </p>
        <p data-testid="wind_speed">
          Wind speed: <strong>{data.current.wind_mph} mph</strong>
        </p>
      </div>
    </div>
  );
};

export default WeatherView;
