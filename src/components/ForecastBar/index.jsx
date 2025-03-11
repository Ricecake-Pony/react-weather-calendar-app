import React, { useState } from "react";
import ForecastCard from "../ForecastCard";
import "./forecastbar.css";


export default function ForecastBar(props) {
	const { splashKey, currentWeatherData, testData } = props;
	const [forecastDays, setForecastDays] = useState(
		testData.forecast.forecastday
	);

	// FOR THE CAROUSEL using react slick: if (testData.forecast.forecastday.length >= 5){}
	return (
		<>
			<span className="center">
				{forecastDays.length}-Day Forecast over {testData.location.name},
				{testData.location.region}
			</span>
			<div className="forecast-master-container">
				<ul className="forecast-bar">
					{forecastDays.map((day) => (
						<li key={day.date}>
							<ForecastCard
								dayData={day}
							/>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
