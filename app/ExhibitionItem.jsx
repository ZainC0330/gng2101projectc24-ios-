import { Pressable, StyleSheet, Text, TouchableOpacity, View, Alert, ImageBackground } from 'react-native';
import { Link, useLocalSearchParams, useRouter, usePathname  } from 'expo-router';
import "../global.css";
import { useGlobal } from '../contexts/GlobalContext';
import { useEffect, useState } from 'react';

function ExhibitionItem({id, image, title, frenchTitle, isCurrent}){

    const { items, setItems, language, setLanguage, exhibitionToBeDisplayed, setExhibitionToBeDisplayed, itemToBeEdited, setItemToBeEdited, exhibitionToBeEdited, setExhibitionToBeEdited } = useGlobal();
    const { exhibitions, setExhibitions } = useGlobal();
    const [titleToBeDisplayed, setTitleToBeDisplayed] = useState("");
    const pathname = usePathname();
    const router = useRouter();

    function engageExhibitionHandler(){
        setExhibitionToBeDisplayed({id: id, image: image, title: title, frenchTitle: frenchTitle, isCurrent: isCurrent});
        if(language === "english"){
            setTitleToBeDisplayed(title);
        }
        if(language==="french"){
            setTitleToBeDisplayed(frenchTitle);            
        }
        if(pathname==="/CurrentExhibits" || pathname==="/PastExhibits"){
            router.push("/ExhibitionDisplayer");
        }
        else if(pathname==="/DeleteExhibition"){
            setExhibitions(
                exhibitions.filter((ex) => {
                    return (ex.id!==id);
                })
            );
            setItems(
                items.filter((it) => {
                    return (exhibitions.includes(it.exhibition));
                })
            );
            router.push("/DeleteExhibition");
        }
        else if(pathname==="/Edit"){
            setExhibitionToBeEdited({id: id, image: image, title: title, frenchTitle: frenchTitle, isCurrent: isCurrent});
            router.push("/ExhibitionEditor");
        }
    }

    useEffect(() => {
        if(language === "english"){
            setTitleToBeDisplayed(title);
        }
        if(language==="french"){
            setTitleToBeDisplayed(frenchTitle);           
        }
    }, [language]);

    return(
        <TouchableOpacity onPress={engageExhibitionHandler}>
            <ImageBackground source={{uri: image}} className="w-48 h-48 rounded-3xl mb-4" resizeMode="cover" style={{ overflow: 'hidden' }}>
                <View className="w-full h-full rounded-2xl items-center justify-end">                
                    <Text className="text-white text-xl font-bold bg-black p-2 truncate max-w-84 max-h-10 w-full h-10">
                        {titleToBeDisplayed}    
                    </Text>   
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default ExhibitionItem;

const styles = StyleSheet.create({});