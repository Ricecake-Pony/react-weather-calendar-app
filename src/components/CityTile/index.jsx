import React from "react";
import { countryCodeEmoji } from "country-code-emoji";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import "./citytile.css";
countries.registerLocale(en);
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";

export default function CityTile({ displayedWeatherData = {} }) {
	if (!displayedWeatherData.location || !displayedWeatherData.current) {
		return null; // Or return a loading spinner/message
	}
		const {location, current} = displayedWeatherData

	const countryName = location.country.toString();
	const countryCode = countries.getAlpha2Code(countryName, "en");
	const countryCodeFlag = countryCodeEmoji(countryCode);

	return (
		<div className="city-tile-container">
			<div className="flag">{countryCodeFlag}</div>
			<span>
				{countryCode} {location.name}
			</span>
			<span>{current.temp_f}</span> <ArrowLongRightIcon />
		</div>
	);
}
