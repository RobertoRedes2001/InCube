import {createContext, useState} from "react";

const PantallasContext = createContext();

export const PantallasProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [ip, setIp] = useState();
    
    return (
        <PantallasContext.Provider value ={{ user, setUser, ip, setIp }}>
            {children}
        </PantallasContext.Provider>
        
    )
}

export default PantallasContext;