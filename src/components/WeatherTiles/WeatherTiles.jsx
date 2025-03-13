import React from "react";
import "./weathertiles.css";

export default function WeatherTiles(props) {
	const { currentWeatherData } = props;

	return (
		<div className="weather-tiles-container">
			<div className="weather-tile">
				Cloud coverage: {currentWeatherData.current.cloud}%
			</div>
			<div className="weather-tile">
				Heat Index: {currentWeatherData.current.heatindex_f}°F
			</div>
			<div className="weather-tile">
				Max Temp: {currentWeatherData.forecast.forecastday[0].day.maxtemp_f}°F
			</div>
			<div className="weather-tile">
				Min Temp: {currentWeatherData.forecast.forecastday[0].day.mintemp_f}°F
			</div>
		</div>
	);
}
