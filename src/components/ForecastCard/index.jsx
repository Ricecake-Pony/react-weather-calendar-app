import React, { useState } from "react";
import "./forecastcard.css";

export default function ForecastCard(props) {
	const { dayData } = props;
	// console.log("dayData.day:", dayData.day);

	return (
		<div className="forecastcard-container">
			{new Date(dayData.date).toLocaleDateString("en-US", {
				weekday: "long",
			})}
			<br/>
			<img src={`https:${dayData.day.condition.icon}`} />
			<br/>
			<span>{dayData.day.condition.text}</span>
			<br />
			{dayData.day.maxtemp_f}°F / {dayData.day.mintemp_f}°F
		</div>
	);
}
