import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CityPage({ fetchCityWeatherData, weatherKey }) {
	const { cityName } = useParams();
	const [weatherData, setWeatherData] = useState(null);

	useEffect(() => {
		if (!cityName) return; 
		async function fetchData() {
			try {
				const cityParams = new URLSearchParams({
					key: weatherKey,
					q: decodeURIComponent(cityName),
				});
				const cityUrl = `https://api.weatherapi.com/v1/forecast.json?${cityParams.toString()}`;
				const data = await fetchCityWeatherData(cityUrl);
				setWeatherData(data); 
			} catch (error) {
				console.error("Error fetching weather data:", error);
			}
		}
		fetchData();
	}, [cityName]);

	if (!weatherData) return <p>Loading...</p>;

	return (
		<div>
			<h1>Weather for {decodeURIComponent(cityName)}</h1>
			<p>Temperature: {weatherData.current?.temp_f}°F</p>
		</div>
	);
}
