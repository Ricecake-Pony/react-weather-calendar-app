import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../contexts/AppContext";
import CityTile from "../../components/CityTile/index";
import FavCitiesList from "../FavCitiesList";

export default function NavBar({ displayedWeatherData }) {
	const { cities } = useContext(AppContext);

	return (
		<>
			<nav>
				<ul id="citiesList">
					<li>
						<Link to="/">Home</Link>
					</li>
					{cities.length > 0 && Object.keys(displayedWeatherData).length > 0 &&
						cities.map((city) => (
							<li key={city}>
								{/* Pass only the data for the specific city */}
								<CityTile displayedWeatherData={displayedWeatherData[city]} />
								<Link to={`/cities/${city}`}>{city}</Link>
							</li>
						))}
				</ul>
				<FavCitiesList displayedWeatherData={displayedWeatherData} />
			</nav>
		</>
	);
}
