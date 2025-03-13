import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../contexts/AppContext";
import CityTile from "../../components/CityTile/index";
import FavCitiesList from "../FavCitiesList";

export default function NavBar(props) {
	const { currentWeatherData } = props;
	const { cities } = useContext(AppContext);

	return (
		<>
			<nav>
				<ul id="citiesList">
					<li>
						<Link to="/">Home</Link>
					</li>
					{cities.map((city) => (
						<li key={city}>
							<CityTile currentWeatherData={currentWeatherData} />
							<Link to={`/city/${city}`}>{city}</Link>
						</li>
					))}
				</ul>
				<FavCitiesList currentWeatherData = { currentWeatherData } />
			</nav>
		</>
	);
}
