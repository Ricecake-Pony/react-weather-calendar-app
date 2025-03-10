import React, {useState} from "react";
import ForecastCard from "../ForecastCard";

export default function ForecastBar(props) {
	const { splashKey, currentWeatherData, testData } = props;
	const [forecastDays, setForecastDays] = useState(testData.forecast.forecastday)

	// FOR THE CAROUSEL using react slick: if (testData.forecast.forecastday.length >= 5){}

	console.log(forecastDays)
	return (
	<div className="forecast-master-container">
			<div>
				{testData.location.name}, {testData.location.region}
			</div>
			<ul className="forecast-bar">
				{forecastDays.map( (day) => <li> <ForecastCard testData={forecastDays}/> </li>)}
			</ul>
	</div>
	);
}
