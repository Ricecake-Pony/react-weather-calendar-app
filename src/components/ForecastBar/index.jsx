import React, { useState } from "react";
import ForecastCard from "../ForecastCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./forecastbar.css";

export default function ForecastBar(props) {
	const { splashKey, currentWeatherData  } = props;
	const [forecastDays, setForecastDays] = useState(
		currentWeatherData.forecast.forecastday
	);

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
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
				{forecastDays.length}-Day Forecast for{" "}
				{currentWeatherData.location.name},{currentWeatherData.location.region}
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
