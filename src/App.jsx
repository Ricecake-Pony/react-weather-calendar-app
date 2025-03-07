import React, { useState, useEffect } from "react";
import { Routes, Route, data } from "react-router-dom";
import { useGeolocation } from "react-use";
import { AppProvider } from "./contexts/AppContext";
import axios from "axios";
import CurrentLocationTile from "./components/CurrentLocationTile/index.jsx";
import HomePage from "./pages/HomePage/index.jsx";
import CityPage from "./pages/CityPage/index.jsx";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar/index.jsx";
import WeatherCard from "./components/WeatherCard/WeatherCard.jsx";

export default function App() {
	//    STATE VARIABLES
	const [realTimeData, setRealTimeData] = useState({});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	// API KEYS
	const weatherKey = import.meta.env.VITE_WEATHER_API_KEY;
	const unsplashKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

	// Geolocation Information
	const location = useGeolocation();
	const lat = location.latitude;
	const long = location.longitude;
	const locationParams = new URLSearchParams({
		key: weatherKey,
		q: `${lat},${long}`,
		aqi: "yes",
		alerts: "yes",
		days: 5,
	});
	
	// -- URLS/ENDPOINTS  --  \\
	const baseWeatherURL = `http://api.weatherapi.com/v1/forecast`;
	const currentWeather = `${baseWeatherURL}/current.json?${locationParams.toString()}`;
	
	const randomCityPhoto = `https://api.unsplash.com/photos/random?`;
	// const photoByWeather = `https://api.unsplash.com//photos/random?`
	
	async function fetchWeatherData() {
		try {
			const response = await axios.get(currentWeather);
			
			if (response.data) {
				setRealTimeData(response.data);
			} else {
				setError("No data received from the weather service");
			}
			return;
		} catch (err) {
			const errorMessage = err.response ? err.response.data : err.message;
			const errorStatus = err.response ? err.response.status : err.code;
			setError(`${errorMessage} Code: ${errorStatus}`);
		} finally {
			setLoading(false);
		}
	}
	
	useEffect(() => {
			if (lat && long) {
					fetchWeatherData();
				}
			}, [lat, long]);

			// const photoParams = new URLSearchParams({
			// 	query: {realTimeData.current.condition.text},
			// 	client_id: `${splashKey}`,
			// })

	// For pretty print weather data -->
	// console.log("realTimeState:", JSON.stringify(realTimeData, null, 2));
	// console.log("this is location:", location)

	return (
		<>
			<AppProvider>
				<div className="master-container">
					<div className="sidebar">
						<img
							src="/logo.png"
							alt="Logo"
							class="logo"
						/>
						{/* {location && lat && long &&  }*/}
						<CurrentLocationTile realTimeData={realTimeData} />
						<SearchBar />
						<NavBar
							realTimeData={realTimeData}
							splashKey={unsplashKey}
						/>
						<Routes>
							<Route
								path="/"
								element={<HomePage />}
							/>
							<Route
								path="/cities/:cityName"
								element={<CityPage />}
							/>
						</Routes>
					</div>
					<div className="main-content">
						{/* <ForecastCard splashKey={unsplashKey} /> */}
						<WeatherCard
							realTimeData={realTimeData}
							splashKey={unsplashKey}
						/>
					</div>
					<div className="sidebar">
						{/* randomText topRight lorem ipsum? */}
						{/* WeatherDetails (contains weatherDetailTile(s)) */}
					</div>
				</div>
			</AppProvider>
		</>
	);
}

// Future Enhancements:
// Loading Indicator: If the API request takes time, you may want to show a loading spinner or message to the user until the data is available.
// Error Display: Make sure that if there's an error with the weather API or geolocation.
// Dynamic Cities List: Consider adding functionality that allows users to add cities dynamically via an input field.

// UNSPLASH Supported parameters
// We officially support the parameters:
// w, h: for adjusting the width and height of a photo
// crop: for applying cropping to the photo
// fm: for converting image format
// auto=format: for automatically choosing the optimal image format depending on user browser
// q: for changing the compression quality when using lossy file formats
// fit: for changing the fit of the image within the specified dimensions
