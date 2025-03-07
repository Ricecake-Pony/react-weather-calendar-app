import React, {useState, createContext} from "react";

const AppContext = createContext()

export function AppProvider({children}){
    const [user, setUser] = useState({name:"Trey", fav_cities:['Denver', 'Bogota', 'Tokyo']}) 
    const [cities, setCities] = useState(["london", "paris"])
    
    return(
        <AppContext.Provider value={{cities, user}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext