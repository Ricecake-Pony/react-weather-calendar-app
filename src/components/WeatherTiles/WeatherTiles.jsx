import React from "react";
import "./weathertiles.css";

export default function WeatherTiles({displayedWeatherData}) {
	const { current, forecast } = displayedWeatherData;

	return (
		<div className="weather-tiles-container">
			<div className="weather-tile">
				Cloud coverage: {current.cloud}%
			</div>
			<div className="weather-tile">
				Heat Index: {current.heatindex_f}°F
			</div>
			<div className="weather-tile">
				Max Temp: {forecast.forecastday[0].day.maxtemp_f}°F
			</div>
			<div className="weather-tile">
				Min Temp: {forecast.forecastday[0].day.mintemp_f}°F
			</div>
		</div>
	);
}
