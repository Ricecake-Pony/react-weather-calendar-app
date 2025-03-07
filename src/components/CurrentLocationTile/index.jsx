import React from "react";
import { countryCodeEmoji } from "country-code-emoji";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import "./currentlocationtile.css";
countries.registerLocale(en);

export default function CurrentLocationTile(props) {
	const { currentWeatherData } = props;

	const testData = {
		realTimeState: {
			location: {
				name: "Longmont",
				region: "Colorado",
				country: "United States of America",
				lat: 40.167,
				lon: -105.101,
				tz_id: "America/Denver",
				localtime_epoch: 1741235667,
				localtime: "2025-03-05 21:34",
			},
			current: {
				last_updated_epoch: 1741235400,
				last_updated: "2025-03-05 21:30",
				temp_c: 6.2,
				temp_f: 43.2,
				is_day: 0,
				condition: {
					text: "Partly cloudy",
					icon: "//cdn.weatherapi.com/weather/64x64/night/116.png",
					code: 1003,
				},
				wind_mph: 10.1,
				wind_kph: 16.2,
				wind_degree: 161,
				wind_dir: "SSE",
				pressure_mb: 1012,
				pressure_in: 29.88,
				precip_mm: 0,
				precip_in: 0,
				humidity: 47,
				cloud: 75,
				feelslike_c: 3.1,
				feelslike_f: 37.5,
				windchill_c: 3.9,
				windchill_f: 39.1,
				heatindex_c: 5.2,
				heatindex_f: 41.4,
				dewpoint_c: -0.1,
				dewpoint_f: 31.9,
				vis_km: 16,
				vis_miles: 9,
				uv: 0,
				gust_mph: 17,
				gust_kph: 27.4,
				air_quality: {
					co: 418.1,
					no2: 50.505,
					o3: 38,
					so2: 2.405,
					pm2_5: 12.58,
					pm10: 17.205,
					"us-epa-index": 1,
					"gb-defra-index": 2,
				},
			},
		},
	};
	const countryName = testData.realTimeState.location.country.toString();
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
						{testData.realTimeState.location.country} -{" "}
						{testData.realTimeState.location.name}
					</span>
				</div>
			</div>
		</>
	);
}
