import React, { useState, useEffect } from "react";
import axios from "axios";
import "./weathercard.css"; // Relative path to the file

export default function WeatherCard(props) {
	const [weatherURL, setWeatherURL] = useState("");
	const data = {
		realTimeData: {
			location: {
				name: "Longmont",
				region: "Colorado",
				country: "United States of America",
				lat: 40.167,
				lon: -105.101,
				tz_id: "America/Denver",
				localtime_epoch: 1741235667,
				localtime: "2025-03-05 21:34",
			},
			current: {
				last_updated_epoch: 1741235400,
				last_updated: "2025-03-05 21:30",
				temp_c: 6.2,
				temp_f: 43.2,
				is_day: 0,
				condition: {
					text: "Partly cloudy",
					icon: "//cdn.weatherapi.com/weather/64x64/night/116.png",
					code: 1003,
				},
				wind_mph: 10.1,
				wind_kph: 16.2,
				wind_degree: 161,
				wind_dir: "SSE",
				pressure_mb: 1012,
				pressure_in: 29.88,
				precip_mm: 0,
				precip_in: 0,
				humidity: 47,
				cloud: 75,
				feelslike_c: 3.1,
				feelslike_f: 37.5,
				windchill_c: 3.9,
				windchill_f: 39.1,
				heatindex_c: 5.2,
				heatindex_f: 41.4,
				dewpoint_c: -0.1,
				dewpoint_f: 31.9,
				vis_km: 16,
				vis_miles: 9,
				uv: 0,
				gust_mph: 17,
				gust_kph: 27.4,
				air_quality: {
					co: 418.1,
					no2: 50.505,
					o3: 38,
					so2: 2.405,
					pm2_5: 12.58,
					pm10: 17.205,
					"us-epa-index": 1,
					"gb-defra-index": 2,
				},
			},
		},
	};
	const { splashKey, realTimeData } = props;
	// http://api.weatherapi.com/v1/forecast.json?key=05ae205d1759424694b23957250403&q=longmont&days=5&aqi=yes&alerts=yes

	async function getForecast() {
		try {
			const response = await axios.get(
				`http://api.weatherapi.com/v1/forecast.json?key=${splashKey}&q=longmont&days=5&aqi=yes&alerts=yes`,
				{
					headers: { "Accept-Version": "v1" },
				}
			);
			console.log("forecastData:", response.data); // ✅ Logs the actual data
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}

	// getForecast();

	// const photoParams = new URLSearchParams({
	// 	query: `${realTimeData.current.condition.text}`,
	// 	client_id: `${splashKey}`,
	// });

	console.log("data:", data);
	console.log("texts=", data.realTimeData.current.condition.text);
	// const photoByWeather = `https://api.unsplash.com/photos/random/?${photoParams.toString()}`
	const photoByWeather = `https://api.unsplash.com/photos/random/?${data.realTimeData.current.condition.text}&client_id=${splashKey}`;
	// useEffect(() => {
	// 	async function fetchWeatherImage() {
	// 		try {
	// 			const response = await axios.get(photoByWeather, {
	// 				headers: {
	// 					"Accept-Version": "v1",
	// 				},
	// 			});
	// 			console.log(response);
	//             if (response){
	//                 const weatherUrl = response.data.urls.regular
	//                 setWeatherURL(weatherUrl)
	//             }
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	}
	// 	fetchWeatherImage();
	// }, [photoByWeather]);

	return (
		<>
			<h5>Weather for {data.realTimeData.location.country}</h5>
			<div
				className="weathercard-main-container"
				style={{
					backgroundImage: `url(https://www.rochesterfirst.com/wp-content/uploads/sites/66/2021/04/sky-1107579_1920.jpg?w=900)`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<div>
					<div>
						<img src={`https:${data.realTimeData.current.condition.icon}`} />
						<span>{data.realTimeData.current.condition.text} </span>
					</div>
					<div>{data.realTimeData.current.temp_f}°F</div>
					<div>{data.realTimeData.location.name}</div>
				</div>

				<div className="weathercard-square-container">
					<div className="weathercard-square">
						Feels like:
						{data.realTimeData.current.feelslike_f}
					</div>
					<div className="weathercard-square">Max Temp:</div>
					<div className="weathercard-square">Min Temp</div>
					<div className="weathercard-square">
						Cloud Coverage: {data.realTimeData.current.cloud}
					</div>
				</div>
			</div>
		</>
	);
}
