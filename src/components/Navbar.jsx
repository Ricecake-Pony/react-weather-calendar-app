import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
	return (
		<>
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					{cities.map((city) => (
						<li>
							<Link to={`/city/${city}`}>{city}</Link>
						</li>
					))}
				</ul>
			</nav>
		</>
	);
}
