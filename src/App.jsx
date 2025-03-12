import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useGeolocation } from "react-use";
import { AppProvider } from "./contexts/AppContext";
import axios from "axios";
import HomePage from "./pages/HomePage/index.jsx";
import CityPage from "./pages/CityPage/index.jsx";
import CurrentLocationTile from "./components/CurrentLocationTile/index.jsx";
import ForecastBar from "./components/ForecastBar/index.jsx"
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar/index.jsx";
import WeatherCard from "./components/WeatherCard/WeatherCard.jsx";
import WeatherTiles from "./components/WeatherTiles/WeatherTiles.jsx";
import testData from "./testData.json";

export default function App() {
	//    STATE VARIABLES
	const [currentWeatherData, setCurrentWeatherData] = useState({});
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
		days: 10,
	});

	// -- UrlS/ENDPOINTS  --  \\
	const baseWeatherUrl = `http://api.weatherapi.com/v1/`;
	const currentWeather = `${baseWeatherUrl}/forecast.json?${locationParams.toString()}`;

	useEffect(() => {
	async function fetchWeatherData() {
		try {
			const response = await axios.get(currentWeather);

			if (response.data) {
				setCurrentWeatherData(response.data);
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

	if (lat && long) {
			fetchWeatherData();
		}
	}, [lat, long]);

	// For pretty print weather data -->
	// console.log("realTimeState:", JSON.stringify(currentWeatherData, null, 2));

	return (
		<>
			<AppProvider>
				<div className="master-container">
					<div className="sidebar blurredBackground">
						<img
							src="/logo.png"
							alt="Logo"
							className="logo"
						/>
						{/* {location && lat && long &&  }*/}
						<CurrentLocationTile currentWeatherData={currentWeatherData} />
						<SearchBar
							testData={testData}
							currentWeatherData={currentWeatherData}
							splashKey={unsplashKey}
						/>
						<NavBar
							testData={testData}
							currentWeatherData={currentWeatherData}
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
					<div className="main-content blurredBackground">
						<ForecastBar
							testData={testData}
							splashKey={unsplashKey}
							currentWeatherData={currentWeatherData}
						/>
						{Object.keys(currentWeatherData).length > 0 && (
							<WeatherCard
								testData={testData}
								currentWeatherData={currentWeatherData}
								splashKey={unsplashKey}
							/>
						)}
					</div>
					<div className="sidebar blurredBackground">
						{/* randomText topRight lorem ipsum? */}
						<WeatherTiles testData={testData}/>
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
