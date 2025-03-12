import React from "react";
import "./weathertiles.css"

export default function WeatherTiles(props) {
	const {testData} = props
	console.log(testData)
	return (
		<div className="weather-tiles-container">
			<div className="weather-tile">
					Cloud coverage: {testData.current.cloud} %
			</div>
			<div className="weather-tile">
					Heat Index: {testData.current.heatindex_f} %
			</div>
			<div className="weather-tile">
					Humidity: {testData.current.humidity} %
			</div>
			<div className="weather-tile">
					Wind Chill: {testData.current.windchill_f} %
			</div>
		</div>
	);
}
