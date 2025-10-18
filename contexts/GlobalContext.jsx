import { createContext, useState, useContext } from 'react';

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    
    const [items, setItems] = useState([]);
    const [videoToBePlayed, setVideoToBePlayed] = useState();
    const [password, setPassword] = useState("fish");

    return (
        <GlobalContext.Provider value={{ 
            items, setItems, videoToBePlayed, setVideoToBePlayed, password, setPassword
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobal() {
    return useContext(GlobalContext);
}