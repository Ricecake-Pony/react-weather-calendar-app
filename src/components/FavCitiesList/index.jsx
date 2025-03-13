import React, {useState, useContext, useEffect} from "react";
import AppContext from "../../contexts/AppContext";
import CityTile from "../CityTile";
import { Link } from "react-router-dom";


export default function FavCities ({currentWeatherData}){

    const { user, setUser } = useContext(AppContext);

    console.log("Is this Trey?", user,
        "is this my city?:", user.fav_cities
    )
    
    return(
        <div className="fav-city-list-main">
            <h4>Favorite Cities!</h4>
            <ul className="fav-city-list">
            {user.fav_cities.map((city) => (
				<li key={city}>
					<CityTile currentWeatherData={currentWeatherData} />
					<Link to={`/city/${city}`}>{city}</Link>
				</li>
			))}
        </ul>
    </div>
    )
}