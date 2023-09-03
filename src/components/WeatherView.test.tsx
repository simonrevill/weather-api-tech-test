import { render, screen } from "@testing-library/react";
import WeatherView from "./WeatherView";
import { mockWeatherData } from "@/test-utils";

describe("WeatherView component unit tests", () => {
  it("should render placeholder icon / text / view when data prop is undefined", () => {
    render(<WeatherView data={undefined} />);

    const searchIcon = screen.getByTestId("search-icon");
    const searchText = screen.getByTestId("search-text");

    expect(searchIcon).toBeInTheDocument();
    expect(searchText).toBeInTheDocument();
    expect(searchText).toHaveTextContent(/Search for city to get started./i);
  });

  it("should render the location name", () => {
    render(<WeatherView data={mockWeatherData} />);

    const locationName = screen.getByTestId("location-name");

    expect(locationName).toBeInTheDocument();
    expect(locationName).toHaveTextContent(/London/i);
  });

  it("should render the location region", () => {
    render(<WeatherView data={mockWeatherData} />);

    const locationRegion = screen.getByTestId("location-region");

    expect(locationRegion).toBeInTheDocument();
    expect(locationRegion).toHaveTextContent(/City of London, Greater London/i);
  });

  it("should render the location country", () => {
    render(<WeatherView data={mockWeatherData} />);

    const locationCountry = screen.getByTestId("location-country");

    expect(locationCountry).toBeInTheDocument();
    expect(locationCountry).toHaveTextContent(/United Kingdom/i);
  });

  it("should render the weather icon with alt text", () => {
    render(<WeatherView data={mockWeatherData} />);

    const weatherIcon = screen.getByTestId("icon");

    expect(weatherIcon).toBeInTheDocument();
    expect(weatherIcon).toHaveAttribute("alt", "Partly cloudy");
  });

  it("should render the temperature in Celcius", () => {
    render(<WeatherView data={mockWeatherData} />);

    const temperatureInCelcius = screen.getByTestId("temp_c");

    expect(temperatureInCelcius).toBeInTheDocument();
    expect(temperatureInCelcius).toHaveTextContent(/22°C/i);
  });

  it("should render the temperature in Fahrenheit", () => {
    render(<WeatherView data={mockWeatherData} />);

    const temperatureInFahrenheit = screen.getByTestId("temp_f");

    expect(temperatureInFahrenheit).toBeInTheDocument();
    expect(temperatureInFahrenheit).toHaveTextContent(/71.6°F/i);
  });

  it("should render the humidity", () => {
    render(<WeatherView data={mockWeatherData} />);

    const humidity = screen.getByTestId("humidity");

    expect(humidity).toBeInTheDocument();
    expect(humidity).toHaveTextContent(/Humidity: 73/i);
  });

  it("should render the wind speed", () => {
    render(<WeatherView data={mockWeatherData} />);

    const windSpeed = screen.getByTestId("wind_speed");

    expect(windSpeed).toBeInTheDocument();
    expect(windSpeed).toHaveTextContent(/Wind speed: 3.8 mph/i);
  });
});
