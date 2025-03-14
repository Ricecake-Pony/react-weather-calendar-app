import React, { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { useGeolocation } from "react-use";
import { AppProvider } from "./contexts/AppContext";
import axios from "axios";
import HomePage from "./pages/HomePage/index.jsx";
import CityPage from "./pages/CityPage/index.jsx";
import CurrentLocationTile from "./components/CurrentLocationTile/index.jsx";
import ForecastBar from "./components/ForecastBar/index.jsx";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar/index.jsx";
import WeatherCard from "./components/WeatherCard/WeatherCard.jsx";
import WeatherTiles from "./components/WeatherTiles/WeatherTiles.jsx";

export default function App() {
	// STATE VARIABLES
	const [geoWeatherData, setGeoWeatherData] = useState({});
	const [cityWeatherData, setCityWeatherData] = useState({});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);


	// API KEYS
	const weatherKey = import.meta.env.VITE_WEATHER_API_KEY;
	const unsplashKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

	// Geolocation Information
	const location = useGeolocation();
	const lat = location.latitude;
	const long = location.longitude;
	const baseWeatherUrl = `http://api.weatherapi.com/v1`;

	async function fetchGeoWeatherData(url) {
		try {
			const response = await axios.get(url);
			if (response.data) {
				setGeoWeatherData(response.data);
				return response.data
			} else {
				setError("No data received from the weather service");
			}
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
			const locationParams = new URLSearchParams({
				key: weatherKey,
				q: `${lat},${long}`,
				aqi: "yes",
				alerts: "yes",
				days: 10,
			});
			const url = `${baseWeatherUrl}/forecast.json?${locationParams.toString()}`;
			fetchGeoWeatherData(url);
		}
	}, [lat, long]);

	async function fetchCityWeatherData(url) {
		console.log("Fetching weather data from:", url);
		try {
			const response = await axios.get(url);
			if (response.data) {
				setCityWeatherData(response.data);
				return response.data
			} else {
				setError("No data received from the weather service");
			}
		} catch (err) {
			const errorMessage = err.response ? err.response.data : err.message;
			const errorStatus = err.response ? err.response.status : err.code;
			setError(`${errorMessage} Code: ${errorStatus}`);
		} finally {
			setLoading(false);
		}
	}



	// a work around to use .length on an object
	const displayedWeatherData =
		Object.keys(cityWeatherData).length > 0 ? cityWeatherData : geoWeatherData;

	return (
		<>
			{Object.keys(displayedWeatherData).length > 0 && (
				<AppProvider>
					<div className="master-container">
						<div className="sidebar blurredBackground">
							<img
								src="/logo.png"
								alt="Logo"
								className="logo"
							/>
							{lat && long && (
								<CurrentLocationTile geoWeatherData={geoWeatherData} />
							)}
							<SearchBar
								fetchCityWeatherData={fetchCityWeatherData}
								weatherKey={weatherKey}
							/>
							<NavBar displayedWeatherData={displayedWeatherData} />
							<Routes>
								<Route
									path="/"
									element={<HomePage fetchGeoWeatherData={fetchGeoWeatherData} />}
								/>
								<Route
									path="/cities/:cityName"
									element={<CityPage weatherKey={weatherKey}  fetchCityWeatherData={fetchCityWeatherData}/>}
								/>
							</Routes>
						</div>
						<div className="main-content blurredBackground">
							<ForecastBar displayWeatherData={displayedWeatherData} />
							<WeatherCard
								displayedWeatherData={displayedWeatherData}
								splashKey={unsplashKey}
							/>
						</div>
						<div className="sidebar blurredBackground">
							<WeatherTiles displayedWeatherData={displayedWeatherData} />
						</div>
					</div>
				</AppProvider>
			)}
		</>
	);
}
