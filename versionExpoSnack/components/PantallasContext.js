import {createContext, useState} from "react";

const PantallasContext = createContext();

export const PantallasProvider = ({ children }) => {
    const [user, setUser] = useState();
    
    return (
        <PantallasContext.Provider value ={{ user, setUser }}>
            {children}
        </PantallasContext.Provider>
        
    )
}

export default PantallasContext;