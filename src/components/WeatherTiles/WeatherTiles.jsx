import React from "react";
import "./weathertiles.css";

export default function WeatherTiles(props) {
	const { testData } = props;

	return (
		<div className="weather-tiles-container">
			<div className="weather-tile">
				Cloud coverage: {testData.current.cloud}%
			</div>
			<div className="weather-tile">
				Heat Index: {testData.current.heatindex_f}°F
			</div>
			<div className="weather-tile">
				Max Temp: {testData.forecast.forecastday[0].day.maxtemp_f}°F
			</div>
			<div className="weather-tile">
				Min Temp: {testData.forecast.forecastday[0].day.mintemp_f}°F
			</div>
		</div>
	);
}
