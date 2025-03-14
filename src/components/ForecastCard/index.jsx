import React from "react";
import "./forecastcard.css";

export default function ForecastCard(dayData) {
	const { date, day } = dayData;

	const today = new Date();
	const forecastDate = new Date(dayData.date);
	const isToday =
		today.getFullYear() === forecastDate.getFullYear() &&
		today.getMonth() === forecastDate.getMonth() &&
		today.getDate() === forecastDate.getDate();

	return (
		<div
			className={
				isToday ? "forecastcard-container today" : "forecastcard-container"
			}
		>
			<br/>
			{new Date(date).toLocaleDateString("en-US", {
				weekday: "long",
			})}
			<br />
			{new Date(date).toLocaleDateString("en-US")}
			<br />
			<img src={`https:${day.condition.icon}`} />
			<br />
			<span>{day.condition.text}</span>
			<br />
			<br />
			{day.maxtemp_f}°F / {day.mintemp_f}°F
		</div>
	);
}
