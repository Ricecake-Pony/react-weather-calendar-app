import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../contexts/AppContext";

export default function NavBar() {
	const { cities, user } = useContext(AppContext);
	console.log(user);
	console.log(cities);
	// http://api.weatherapi.com/v1/current.json?key=MYKEY&q=CITY&aqi=yes
	// http://api.weatherapi.com/v1/search.json?key=05ae205d1759424694b23957250403&q=London

	return (
		<>
			<nav>
				<ul id="citiesList">
					<li>
						<Link to="/">Home</Link>
					</li>
					{cities.map((city) => (
						<li key={city}>
							<Link to={`/city/${city}`}>{city}</Link>
						</li>
					))}
				</ul>
			</nav>
		</>
	);
}
