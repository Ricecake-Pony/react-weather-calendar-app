import React, { useState, useEffect } from "react";
import axios from "axios";
import "./weathercard.css"; // Relative path to the file

export default function WeatherCard(props) {
	const [weatherURL, setWeatherURL] = useState("");
	const { splashKey, currentWeatherData, testData } = props;

	// useEffect(() => {

	// 	const randomNum = Math.floor(Math.random() * 10) + 1;

	// 	if (currentWeatherData?.current?.condition?.text) {
	// 		async function fetchWeatherImage() {
	// 			const photoParams = new URLSearchParams({
	// 				query: `${currentWeatherData.current.condition.text}`,
	// 				client_id: `${splashKey}`,
	// 			});

	// 			const photoByWeather = `https://api.unsplash.com/search/photos/?${photoParams.toString()}`;

	// 			try {
	// 				const response = await axios.get(photoByWeather, {
	// 					headers: {
	// 						"Accept-Version": "v1",
	// 					},
	// 				});
	// 				console.log("response", response);
	// 				if (response.data) {
	// 					const weatherData = response
	// 					const arrayOfPhotos = response.data.results
	// 					const randomUrl = arrayOfPhotos[randomNum].urls.regular
	// 					console.log(randomUrl)
	// 					setWeatherURL(randomUrl);
	// 				}
	// 			} catch (error) {
	// 				console.error("Error fetching image: ", error);
	// 			}
	// 		}
	// 		fetchWeatherImage();
	// 	}
	// }, [splashKey, currentWeatherData]);

	return (
		<>
			<h5>Weather for {testData.location.country}</h5>
			<div
				className="weathercard-main-container"
				style={{
					backgroundImage: `url(${weatherURL})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<div>
					<div>
						<img src={`https:${testData.current.condition.icon}`} />
						<span>{testData.current.condition.text} </span>
					</div>
					<div>{testData.current.temp_f}°F</div>
					<div>{testData.location.name}</div>
				</div>

				<div className="weathercard-square-container">
					<div className="weathercard-square">
						Feels like:
						{testData.current.feelslike_f}
					</div>
					<div className="weathercard-square">Max Temp:</div>
					<div className="weathercard-square">Min Temp:</div>
					<div className="weathercard-square">
						Cloud Coverage: {testData.current.cloud}
					</div>
				</div>
			</div>
		</>
	);
}
