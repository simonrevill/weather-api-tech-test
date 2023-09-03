import { ChangeEvent } from "react";
import { Fragment } from "react";
import { Combobox } from "@headlessui/react";
import ExclamationCircleIcon from "@/components/ExclamationCircleIcon";
import CheckIcon from "@/components/CheckIcon";
import ChevronUpDownIcon from "@/components/ChevronUpDownIcon";
import { LocationResponse } from "@/types";

type CitySearchProps = {
  query: string;
  value: string;
  onChange: (value: string) => void;
  setSearchQuery: (value: ChangeEvent<HTMLInputElement>) => void;
  isLoadingCities: boolean;
  cities: LocationResponse[] | undefined;
  noResults: boolean;
  isError: boolean;
};

const CitySearch = ({
  query,
  value,
  onChange,
  setSearchQuery,
  isLoadingCities,
  cities,
  noResults,
  isError,
}: CitySearchProps) => {
  return (
    <Combobox value={value} onChange={onChange} nullable>
      <div className="relative">
        <div className="relative w-full cursor-default overflow-hidden border rounded-md bg-white text-left text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 text-sm md:text-base">
          <Combobox.Input
            onChange={setSearchQuery}
            className="rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500 ring-offset-2 placeholder:text-slate-400 w-full"
            placeholder="Enter a city name..."
            displayValue={(value: string) => value?.split(" | ")[0] ?? ""}
            autoComplete="off"
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-slate-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        {isError && (
          <div className="flex items-center gap-2 pl-4 pt-2">
            <ExclamationCircleIcon
              className="h-4 w-4 text-red-500"
              aria-hidden="true"
            />
            <p className="text-xs text-red-500">Something went wrong.</p>
          </div>
        )}
        {isLoadingCities && (
          <Combobox.Options className="absolute bg-white left-0 right-0 flex flex-col border mt-2 rounded-md text-sm md:text-base shadow">
            <p className="flex justify-center pr-4 py-2">Loading...</p>
          </Combobox.Options>
        )}

        {noResults && (
          <Combobox.Options className="absolute bg-white left-0 right-0 flex flex-col border mt-2 rounded-md text-sm md:text-base shadow">
            <p className="flex justify-center pr-4 py-2">
              No results found for&nbsp;<strong>{query}</strong>.
            </p>
          </Combobox.Options>
        )}

        {cities && cities.length > 0 && (
          <Combobox.Options className="absolute bg-white left-0 right-0 flex flex-col border mt-2 rounded-md text-sm md:text-base shadow">
            {cities.map((city) => (
              <Combobox.Option
                key={city.id}
                as={Fragment}
                value={`${city.name}, ${city.region}, ${city.country} | ${city.lat},${city.lon}`}
              >
                {({ active, selected }) => (
                  <li
                    className={`flex items-center gap-4 pr-4 py-2 rounded-md cursor-pointer ${
                      active
                        ? "bg-slate-500 text-white"
                        : "bg-white text-slate-800"
                    } ${selected ? "pl-4" : "pl-12"}`}
                  >
                    {selected && (
                      <CheckIcon className="w-4 h-4" aria-hidden="true" />
                    )}
                    <span>
                      {`${city.name}, ${city.region} - `}
                      <strong>{city.country}</strong>
                    </span>
                  </li>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
};

export default CitySearch;
