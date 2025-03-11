import React, { useState, useEffect } from "react";
import axios from "axios";
import "./weathercard.css"; // Relative path to the file

export default function WeatherCard(props) {
	const [weatherUrl, setWeatherUrl] = useState("");
	const [backgroundUrl, setBackgroundUrl] = useState(
		"https://images.unsplash.com/photo-1445297983845-454043d4eef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MTY1MzR8MHwxfHNlYXJjaHwyfHxwYXJ0bHklMjBjbG91ZHl8ZW58MHx8fHwxNzQxMzE4MzM1fDA&ixlib=rb-4.0.3&q=80&w=1080"
	);
	const { splashKey, currentWeatherData, testData } = props;

	useEffect(() => {
		const randomNum = Math.floor(Math.random() * 10) + 1;

		if (currentWeatherData?.current?.condition?.text) {
			async function fetchWeatherImage() {
				const photoParams = new URLSearchParams({
					query: `${currentWeatherData.current.condition.text}`,
					client_id: `${splashKey}`,
				});

				const photoByWeather = `https://api.unsplash.com/search/photos/?${photoParams.toString()}`;

				try {
					const response = await axios.get(photoByWeather, {
						headers: {
							"Accept-Version": "v1",
						},
					});
					// console.log("WeatherPhotoresponse:", response);
					if (response.data) {
						const weatherData = response;
						const weatherPhotos = response.data.results;
						const weatherPhoto = weatherPhotos[randomNum].urls.regular;
						setWeatherUrl(weatherPhoto);
						return weatherData;
					}
				} catch (error) {
					console.error("Error fetching image: ", error);
				}
			}

			async function fetchBackgroundImage() {
				const photoParams = new URLSearchParams({
					query: `${currentWeatherData.current.condition.text} ${currentWeatherData.location.region}`,
					client_id: `${splashKey}`,
				});

				const backgroundImageEndPoint = `https://api.unsplash.com/search/photos/?${photoParams.toString()}`;

				try {
					const response = await axios.get(backgroundImageEndPoint, {
						headers: {
							"Accept-Version": "v1",
						},
					});
					if (response.data) {
						const regionalPhotos = response.data.results;
						const randomUrl = regionalPhotos[randomNum]?.urls?.regular;

						if (randomUrl) {
							setBackgroundUrl(randomUrl);
							document.body.style.backgroundImage = `url(${randomUrl})`;
							document.body.style.backgroundSize = "cover";
							document.body.style.backgroundPosition = "center";
						}
					}
				} catch (error) {
					console.error("Error fetching image: ", error);
				}
			}
			fetchBackgroundImage();
			fetchWeatherImage();
		}
	}, [currentWeatherData]);

	if (backgroundUrl.length > 0) {
		document.body.style.backgroundImage = `url(${backgroundUrl})`;
	}

	return (
		<>
			<div
				className="weathercard-main-container"
				style={{
					backgroundImage: `url(${weatherUrl})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<div className="weathercard-details">
					<div className="text-overlay">
						<img src={`https:${testData.current.condition.icon}`} />
						<br />
						<span>{testData.current.condition.text} </span>
						<div>{testData.current.temp_f}°F</div>
						<div>{testData.location.name}</div>
					</div>
				</div>
			</div>
			<div className="weathercard-square-container ">
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
		</>
	);
}
