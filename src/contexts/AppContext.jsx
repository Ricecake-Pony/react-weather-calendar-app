import React, {useState, createContext} from "react";

const AppContext = createContext()

export function AppProvider({children}){
    const [user, setUser] = useState({name:"Trey", fav_cities:['Denver', 'Bogota', 'Tokyo']}) 
    const [cities, setCities] = useState([])
    
    return(
        <AppContext.Provider value={{cities, setCities, setUser, user}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext