import { Pressable, StyleSheet, Text, TouchableOpacity, View, Alert, ImageBackground } from 'react-native';
import { Link, useLocalSearchParams, useRouter, usePathname  } from 'expo-router';
import "../global.css";
import { useGlobal } from '../contexts/GlobalContext';
import { useEffect, useState } from 'react';

function Item({id, image, title, frenchTitle, video, audioVideo, frenchAudioVideo, regularDescription, frenchDescription, basicDescription, basicFrenchDescription, advancedDescription, advancedFrenchDescription, exhibition}){

    const { items, setItems, itemToBeEdited, setItemToBeEdited } = useGlobal();
    const { videoToBePlayed, setVideoToBePlayed } = useGlobal();
    const { audioVideoToBePlayed, setAudioVideoToBePlayed } = useGlobal();
    const [titleToBeDisplayed, setTitleToBeDisplayed] = useState("");
    const { descriptionToBeDisplayed, setDescriptionToBeDisplayed } = useGlobal();
    const pathname = usePathname();
    const router = useRouter();
    const { language, setLanguage } = useGlobal();
    const { level, setLevel } = useGlobal();

    function engageItemHandler(){
        if(language === "english"){
            setTitleToBeDisplayed(title);
            setAudioVideoToBePlayed(audioVideo);
            if(level === "regular"){
                setDescriptionToBeDisplayed(regularDescription);
            }
            if(level === "basic"){
                setDescriptionToBeDisplayed(basicDescription);
            }
            if(level === "advanced"){
                setDescriptionToBeDisplayed(advancedDescription);
            }
        }
        if(language==="french"){
            setTitleToBeDisplayed(frenchTitle);
            setAudioVideoToBePlayed(frenchAudioVideo);
            if(level === "regular"){
                setDescriptionToBeDisplayed(frenchDescription);
            }
            if(level === "basic"){
                setDescriptionToBeDisplayed(basicFrenchDescription);
            }
            if(level === "advanced"){
                setDescriptionToBeDisplayed(advancedFrenchDescription);
            }            
        }
        if(pathname==="/Delete"){
            setItems(
                items.filter((it) => {
                    return (it.id!==id);
                })
            );
            router.push("/Delete");
        }
        else if(pathname==="/Edit"){
            setItemToBeEdited({id: id, image: image, title: title, frenchTitle: frenchTitle, video: video, audioVideo: audioVideo, frenchAudioVideo: frenchAudioVideo, regularDescription: regularDescription, frenchDescription: frenchDescription, basicDescription: basicDescription, basicFrenchDescription: basicFrenchDescription, advancedDescription: advancedDescription, advancedFrenchDescription: advancedFrenchDescription, exhibition: exhibition});
            router.push("/ExhibitEditor");
        }
        else{
            router.push("/VideoPlayer");
        }
    }

    useEffect(() => {
        setVideoToBePlayed(video);
        if(language === "english"){
            setAudioVideoToBePlayed(audioVideo);
            setTitleToBeDisplayed(title);
            if(level === "regular"){
                setDescriptionToBeDisplayed(regularDescription);
            }
            if(level === "basic"){
                setDescriptionToBeDisplayed(basicDescription);
            }
            if(level === "advanced"){
                setDescriptionToBeDisplayed(advancedDescription);
            }
        }
        if(language==="french"){
            setAudioVideoToBePlayed(frenchAudioVideo);
            setTitleToBeDisplayed(frenchTitle);
            if(level === "regular"){
                setDescriptionToBeDisplayed(frenchDescription);
            }
            if(level === "basic"){
                setDescriptionToBeDisplayed(basicFrenchDescription);
            }
            if(level === "advanced"){
                setDescriptionToBeDisplayed(advancedFrenchDescription);
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