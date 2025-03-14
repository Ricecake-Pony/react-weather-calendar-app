import React, { useState } from "react";
import ForecastCard from "../ForecastCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./forecastbar.css";

export default function ForecastBar(displayedWeatherData = {}) {
	if (!displayedWeatherData.location || !displayedWeatherData.forecast) {
		return null; // Or return a loading spinner/message
	}

	const { location, forecast } = displayedWeatherData;

	const [forecastDays, setForecastDays] = useState(forecast.forecastday);

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 2,
		variableWidth: false,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2, // Show 2 slides for medium screens
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1, // Show 1 slide for small screens
				},
			},
		],
	};

	return (
		<>
			<span className="forecast-header">
				{forecastDays.length}-Day Forecast for {location.name},{location.region}
			</span>
			<div className="forecast-master-container">
				<Slider {...settings}>
					{forecastDays.map((day) => (
						<div key={day.date}>
							<ForecastCard dayData={day} />
						</div>
					))}
				</Slider>
			</div>
		</>
	);
}
