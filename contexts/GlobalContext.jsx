import { createContext, useState, useContext } from 'react';

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    
    const [items, setItems] = useState([]);
    const [videoToBePlayed, setVideoToBePlayed] = useState();
    const [password, setPassword] = useState("fish");
    const [descriptionToBeDisplayed, setDescriptionToBeDisplayed] = useState();
    const [language, setLanguage] = useState("english");//english or french.
    const [level, setLevel] = useState("regular");//regular or basic.
    const [radioEnglish, setRadioEnglish] = useState(true);
    const [radioFrench, setRadioFrench] = useState(false);
    const [radioRegular, setRadioRegular] = useState(true);
    const [radioBasic, setRadioBasic] = useState(false);

    return (
        <GlobalContext.Provider value={{ 
            items, setItems, videoToBePlayed, setVideoToBePlayed, password, setPassword, descriptionToBeDisplayed, setDescriptionToBeDisplayed, language, setLanguage, level, setLevel, radioEnglish, setRadioEnglish, radioFrench, setRadioFrench, radioRegular, setRadioRegular, radioBasic, setRadioBasic
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobal() {
    return useContext(GlobalContext);
}