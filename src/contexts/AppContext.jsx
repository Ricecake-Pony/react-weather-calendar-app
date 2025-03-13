import React, { useState, createContext, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [user, setUser] = useState(() => {
		const savedUser = localStorage.getItem("user");
		return savedUser
			? JSON.parse(savedUser)
			: { username: "", fav_cities: ["Denver", "Bogota", "Tokyo"] };
	});
    
	useEffect(() => {
        const signIn = prompt("Please enter your name:");
		if (signIn.length > 0) {
            setUser((prevUser) => ({
                ...prevUser,
				username: signIn,
			}));
		}
		alert(`Hello, ${user.username}!`);
	}, []);
    
        useEffect(() => {
            localStorage.setItem("user", JSON.stringify(user));
        }, [user]);
    
	return (
		<AppContext.Provider value={{ cities, setCities, user, setUser }}>
			{children}
		</AppContext.Provider>
	);
}
export default AppContext;
