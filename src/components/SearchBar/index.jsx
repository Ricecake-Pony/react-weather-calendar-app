import React, { useState, useEffect } from "react";
import "./searchbar.css";

export default function SearchBar({ fetchWeatherData, weatherKey }) {
    const [userInput, setUserInput] = useState("");
    const cityParams = new URLSearchParams({
        key: weatherKey,
        q: `${userInput}`,
    });
    const cityUrl = `http://api.weatherapi.com/v1/search.json?${cityParams.toString()}`

    const handleChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
            fetchWeatherData(cityUrl)
            setUserInput("")
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={userInput} onChange={handleChange} placeholder="Enter city" />
            <button type="submit">Search</button>
        </form>
    );
}

