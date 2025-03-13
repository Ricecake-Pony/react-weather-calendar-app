import React from "react";
import { countryCodeEmoji } from "country-code-emoji";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import "./citytile.css";
countries.registerLocale(en);
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";

export default function CityTile({ currentWeatherData }) {

	console.log("testing:", currentWeatherData)

	const countryName =
		currentWeatherData.location.country.toString();
	const countryCode = countries.getAlpha2Code(countryName, "en");
	const countryCodeFlag = countryCodeEmoji(countryCode);

	return (
		<>
			<div className="city-tile-container">
				<div className="flag">{countryCodeFlag}</div>
				<span>
					{countryCode} {currentWeatherData.location.name}
				</span>
				<span>{currentWeatherData.current.temp_f}</span>{" "}
				<ArrowLongRightIcon />
			</div>
		</>
	);
}
