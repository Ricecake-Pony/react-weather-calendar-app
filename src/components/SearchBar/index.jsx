import React, { useState, useContext } from "react";
import AppContext from "./contexts/AppContext";
import "./searchbar.css";

export default function SearchBar({ fetchWeatherData, weatherKey }) {
	const [userInput, setUserInput] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const { cities, setCities } = useContext(AppContext);

	const userQuery = userInput.trim().toLowerCase();
	const cityParams = new URLSearchParams({
		key: weatherKey,
		q: userQuery,
	});
	const cityUrl = `http://api.weatherapi.com/v1/forecast.json?${cityParams.toString()}`;

	const handleChange = (e) => {
		setUserInput(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!cities.includes(userQuery)) {
			setCities([...cities, userQuery]);
			setUserInput("");
			setErrorMsg(""); // clear any previous error
			fetchWeatherData(cityUrl);
		} else {
			console.error("City already added:", userQuery);
			setErrorMsg("City already added.");
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={userInput}
					onChange={handleChange}
					placeholder="Enter city"
				/>
				<button type="submit">Search</button>
			</form>
			{errorMsg && <div className="error">{errorMsg}</div>}
		</div>
	);
}
