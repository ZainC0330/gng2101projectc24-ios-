import { Pressable, StyleSheet, Text, TouchableOpacity, View, Alert, ImageBackground } from 'react-native';
import { Link, useLocalSearchParams, useRouter, usePathname  } from 'expo-router';
import "../global.css";
import { useGlobal } from '../contexts/GlobalContext';
import { useEffect, useState } from 'react';

function Item({image, title, frenchTitle ,video, frenchVideo, basicVideo, basicFrenchVideo, regularDescription, frenchDescription, basicDescription, basicFrenchDescription}){

    const { items, setItems} = useGlobal();
    const { videoToBePlayed, setVideoToBePlayed } = useGlobal();
    const [titleToBeDisplayed, setTitleToBeDisplayed] = useState("");
    const { descriptionToBeDisplayed, setDescriptionToBeDisplayed } = useGlobal();
    const pathname = usePathname();
    const router = useRouter();
    const { language, setLanguage } = useGlobal();
    const { level, setLevel } = useGlobal();

    function engageItemHandler(){
        if(pathname==="/Exhibits"){
            router.push("/VideoPlayer");
        }
        if(pathname==="/Delete"){
            setItems(
                items.filter((it) => {
                    return (it.image!==image && it.title!==title && it.video!==video);
                })
            );
        }
    }

    useEffect(() => {
        if(language === "english"){
            setTitleToBeDisplayed(title);
            if(level === "regular"){
                setDescriptionToBeDisplayed(regularDescription);
                setVideoToBePlayed(video);
            }
            if(level === "basic"){
                setDescriptionToBeDisplayed(basicDescription);
                setVideoToBePlayed(basicVideo);
            }
        }
        if(language==="french"){
            setTitleToBeDisplayed(frenchTitle);
            if(level === "regular"){
                setDescriptionToBeDisplayed(frenchDescription);
                setVideoToBePlayed(frenchVideo);
            }
            if(level === "basic"){
                setDescriptionToBeDisplayed(basicFrenchDescription);
                setVideoToBePlayed(basicFrenchVideo);
            }            
        }
    }, [language, level]);

    return(
        <TouchableOpacity onPress={engageItemHandler}>
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

export default Item;

const styles = StyleSheet.create({});