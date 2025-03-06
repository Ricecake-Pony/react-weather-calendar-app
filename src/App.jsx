import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useGeolocation } from "react-use";
import { AppProvider } from "./contexts/AppContext";
import axios from "axios";
import CurrentLocationTile from "./components/CurrentLocationTile/index.jsx"
import Home from "./pages/Home";
import City from "./pages/City";
import NavBar from "./components/NavBar";

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
	});

	// -- URLS/ENDPOINTS  --  \\
	const baseWeatherURL = `http://api.weatherapi.com/v1/`;
	const currentWeather = `${baseWeatherURL}/current.json?${locationParams.toString()}`;

	const baseUnsplashURL = `https://api.unsplash.com/photos/random?`;
	// const randomPhoto = ``;

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
	// useEffect(() => {
	// 	if (lat && long) {
	// 		fetchWeatherData();
	// 	}
	// }, [lat, long]);

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
						<img
							src="/hypelogo.jpg"
							alt="App Logo"
							class="logo"
						/>
						<NavBar />
						{/* {location && lat && long &&  }*/}
						<CurrentLocationTile realTimeData={realTimeData} />
						{/* SearchBar */}
						{/* CitiesList(will contain the CityTile(s)) */}
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
					</div>
					<div className="main-content">
						{/* ForecastCard */}
						{/* WeatherCard */}
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
