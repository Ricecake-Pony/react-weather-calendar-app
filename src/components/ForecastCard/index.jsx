import React, { useState } from "react";
import "./forecastcard.css";

export default function ForecastCard(props) {
	const { dayData } = props;


	const isToday = dayData.day.date === new Date().toISOString().split("T")[0];

	return (
		<div className={isToday ? "forecastcard-container today" : "forecastcard-container"}>
			{new Date(dayData.date).toLocaleDateString("en-US", {
				weekday: "long",
			})}
			<br/>
			{new Date(dayData.date).toLocaleDateString("en-US")}
			<br/>
			<img src={`https:${dayData.day.condition.icon}`} />
			<br/>
			<span>{dayData.day.condition.text}</span>
			<br />
			<br/>
			{dayData.day.maxtemp_f}°F / {dayData.day.mintemp_f}°F
		</div>
	);
}
