import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useGeolocation } from "react-use";
import axios from "axios";
import Home from "./pages/Home";
import City from "./pages/City";
import Navbar from "./components/Navbar";

export default function App() {
	const [realTimeData, setRealTimeData] = useState([]);
  const [error, setError] = useState(``)
	const weatherKey = import.meta.env.VITE_WEATHER_API_KEY;
	const unsplashKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

	const location = useGeolocation();
	const lat = location.latitude;
	const long = location.longitude;
  
	const locationParams = new URLSearchParams({
		key: weatherKey,
		q: `${lat},${long}`,
    aqi: 'yes',
	});

	// -- URLS/ENDPOINTS  --  \\
	const baseWeatherURL = `http://api.weatherapi.com/v1/`;
  
	async function fetchWeatherData() {
    const currentWeather = `${baseWeatherURL}/current.json?${locationParams.toString()}`;
		try {
			const response = await axios.get(currentWeather);
			console.log("weather response:", response.data);
			return setRealTimeData(response.data);
		} catch (err) {
			const errorMessage = err.response ? err.response.data : err.message;
			const errorStatus = err.response ? err.response.status : err.code;
			setError(`${errorMessage} Code: ${errorStatus}`);
		}
	}

	useEffect(() => {
		if (lat && long) {
			fetchWeatherData();
		}
	}, [lat, long]);

  console.log("realTimeState:", realTimeData)

	return (
		<>
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/cities/:cityName"
					element={<City />}
				/>
			</Routes>
			<h3>The Weather App BABY!</h3>
			<span>{}</span>

		</>
	);
}

// NOTE: Checklist for UNSPLASH
// Hotlink photos so photos must be hotlinked to the original image URL on Unsplash
// Attribute photographer and Unsplash, photographer’s full name and Unsplash are properly attributed and linked (ex: Photo by Annie Spratt on Unsplash)
