import React from "react";
import "./forecastcard.css";

export default function ForecastCard(props) {
	const { dayData } = props;

	// console.log("dayData:", dayData)

	const today = new Date();
	const forecastDate = new Date(dayData.date);
	// console.log("forecast Date:", forecastDate, "today's date:", today);

	const isToday =
		today.getFullYear() === forecastDate.getFullYear() &&
		today.getMonth() === forecastDate.getMonth() &&
		today.getDate() === forecastDate.getDate();

	console.log("isToday:", isToday);

	return (
		<div
			className={
				isToday ? "forecastcard-container today" : "forecastcard-container"
			}
		>
			{new Date(dayData.date).toLocaleDateString("en-US", {
				weekday: "long",
			})}
			<br />
			{new Date(dayData.date).toLocaleDateString("en-US")}
			<br />
			<img src={`https:${dayData.day.condition.icon}`} />
			<br />
			<span>{dayData.day.condition.text}</span>
			<br />
			<br />
			{dayData.day.maxtemp_f}°F / {dayData.day.mintemp_f}°F
		</div>
	);
}
