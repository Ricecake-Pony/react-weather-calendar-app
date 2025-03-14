import React from "react";
import { countryCodeEmoji } from "country-code-emoji";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import "./currentlocationtile.css";
countries.registerLocale(en);

export default function CurrentLocationTile({ geoWeatherData }) {
	const { location, current } = geoWeatherData;
	const countryName = location.country.toString();
	const countryCode = countries.getAlpha2Code(countryName, "en");
	const countryCodeFlag = countryCodeEmoji(countryCode);
	return (
		<>
			<div className="current-location-tile-container">
				<div className="flag">{countryCodeFlag}</div>
				<div className="current-location-tile-info">
					<span>Current Location</span>
					<br />
					<span>
						{location.country} - {location.name}
					</span>
				</div>
			</div>
		</>
	);
}
