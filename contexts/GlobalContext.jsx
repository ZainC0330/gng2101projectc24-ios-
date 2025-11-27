import { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    
    const [items, setItems] = useState([]);
    const [exhibitions, setExhibitions] = useState([]);
    const [videoToBePlayed, setVideoToBePlayed] = useState();
    const [audioVideoToBePlayed, setAudioVideoToBePlayed] = useState();
    const [password, setPassword] = useState("default");
    const [descriptionToBeDisplayed, setDescriptionToBeDisplayed] = useState();
    const [language, setLanguage] = useState("english");
    const [level, setLevel] = useState("regular");
    const [radioEnglish, setRadioEnglish] = useState(true);
    const [radioFrench, setRadioFrench] = useState(false);
    const [radioRegular, setRadioRegular] = useState(true);
    const [radioBasic, setRadioBasic] = useState(false);
    const [radioAdvanced, setRadioAdvanced] = useState(false);    
    const [exhibitionToBeDisplayed, setExhibitionToBeDisplayed] = useState();
    const [itemToBeEdited, setItemToBeEdited] = useState({});
    const [exhibitionToBeEdited, setExhibitionToBeEdited] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            saveItems();
        }
    }, [items]);

    useEffect(() => {
        if (!isLoading) {
            saveExhibitions();
        }
    }, [exhibitions]);

    useEffect(() => {
        if (!isLoading) {
            savePassword();
        }
    }, [password]);

    useEffect(() => {
        if (!isLoading) {
            saveLanguage();
        }
    }, [language]);

    useEffect(() => {
        if (!isLoading) {
            saveLevel();
        }
    }, [level]);

    const loadData = async () => {
        try {
            const [storedItems, storedExhibitions, storedPassword, storedLanguage, storedLevel] = await Promise.all([
                AsyncStorage.getItem('items'),
                AsyncStorage.getItem('exhibitions'),
                AsyncStorage.getItem('password'),
                AsyncStorage.getItem('language'),
                AsyncStorage.getItem('level')
            ]);

            if (storedItems) setItems(JSON.parse(storedItems));
            if (storedExhibitions) setExhibitions(JSON.parse(storedExhibitions));
            if (storedPassword) setPassword(storedPassword);
            if (storedLanguage) {
                setLanguage(storedLanguage);
                setRadioEnglish(storedLanguage === 'english');
                setRadioFrench(storedLanguage === 'french');
            }
            if (storedLevel) {
                setLevel(storedLevel);
                setRadioRegular(storedLevel === 'regular');
                setRadioBasic(storedLevel === 'basic');
                setRadioAdvanced(storedLevel === 'advanced');
            }

            setIsLoading(false);
        } catch (error) {
            console.error('Error loading data:', error);
            setIsLoading(false);
        }
    };

    const saveItems = async () => {
        try {
            await AsyncStorage.setItem('items', JSON.stringify(items));
        } catch (error) {
            console.error('Error saving items:', error);
        }
    };

    const saveExhibitions = async () => {
        try {
            await AsyncStorage.setItem('exhibitions', JSON.stringify(exhibitions));
        } catch (error) {
            console.error('Error saving exhibitions:', error);
        }
    };

    const savePassword = async () => {
        try {
            await AsyncStorage.setItem('password', password);
        } catch (error) {
            console.error('Error saving password:', error);
        }
    };

    const saveLanguage = async () => {
        try {
            await AsyncStorage.setItem('language', language);
        } catch (error) {
            console.error('Error saving language:', error);
        }
    };

    const saveLevel = async () => {
        try {
            await AsyncStorage.setItem('level', level);
        } catch (error) {
            console.error('Error saving level:', error);
        }
    };

    const clearAllData = async () => {
        try {
            await AsyncStorage.multiRemove(['items', 'exhibitions', 'password', 'language', 'level']);
            setItems([]);
            setExhibitions([]);
            setPassword("fish");
            setLanguage("english");
            setLevel("regular");
            console.log('All data cleared');
        } catch (error) {
            console.error('Error clearing data:', error);
        }
    };

    if (isLoading) {
        return null; 
    }

    return (
        <GlobalContext.Provider value={{ 
            items, setItems, 
            exhibitions, setExhibitions, 
            videoToBePlayed, setVideoToBePlayed, 
            audioVideoToBePlayed, setAudioVideoToBePlayed, 
            password, setPassword, 
            descriptionToBeDisplayed, setDescriptionToBeDisplayed, 
            language, setLanguage, 
            level, setLevel, 
            radioEnglish, setRadioEnglish, 
            radioFrench, setRadioFrench, 
            radioRegular, setRadioRegular, 
            radioBasic, setRadioBasic, 
            radioAdvanced, setRadioAdvanced, 
            exhibitionToBeDisplayed, setExhibitionToBeDisplayed, 
            itemToBeEdited, setItemToBeEdited, 
            exhibitionToBeEdited, setExhibitionToBeEdited,
            clearAllData
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobal() {
    return useContext(GlobalContext);
}