import { Pressable, StyleSheet, Text, TouchableOpacity, View, Alert, ImageBackground, ScrollView } from 'react-native';
import { Link, useLocalSearchParams, useRouter, usePathname  } from 'expo-router';
import "../global.css";
import { useGlobal } from '../contexts/GlobalContext';
import { useEffect, useState } from 'react';
import Item from './Item';

function ExhibitionDisplayer(){

    const { items, setItems, language, setLanguage, exhibitionToBeDisplayed, setExhibitionToBeDisplayed } = useGlobal();
    const { exhibitions, setExhibitions } = useGlobal();
    const [titleToBeDisplayed, setTitleToBeDisplayed] = useState("");
    const pathname = usePathname();
    const router = useRouter();

    const relatedExhibits = items.filter((it) => 
        (it.exhibition === exhibitionToBeDisplayed.title || it.exhibition===exhibitionToBeDisplayed.frenchTitle)
    );

    const relatedExhibitCells = relatedExhibits.map((it) => {
        return <Item id={it.id} image={it.image} title={it.title} frenchTitle={it.frenchTitle} video={it.video} audioVideo={it.audioVideo} frenchAudioVideo={it.frenchAudioVideo} regularDescription={it.regularDescription} frenchDescription={it.frenchDescription} basicDescription={it.basicDescription} basicFrenchDescription={it.basicFrenchDescription} advancedDescription={it.advancedDescription} advancedFrenchDescription={it.advancedFrenchDescription} exhibition={it.exhibition}/>
    });

    function goHomeHandler(){
        router.push("/");
    }

    useEffect(() => {
        if(language === "english"){
            setTitleToBeDisplayed(exhibitionToBeDisplayed.title);
        }
        if(language==="french"){
            setTitleToBeDisplayed(exhibitionToBeDisplayed.frenchTitle);           
        }
    }, [language]);

    return(
        <ScrollView className="bg-red-600 flex-1" contentContainerStyle={{ alignItems: 'center' }}>
            <Text className="text-6xl font-bold text-white mt-16 mb-8">
                {titleToBeDisplayed}
            </Text>
            <View className="flex-row flex-wrap justify-center gap-4 p-4">
                {relatedExhibitCells}
            </View>
            <TouchableOpacity onPress={goHomeHandler} className='mb-8'>
                <View className="bg-green-500 w-96 h-24 rounded-2xl items-center justify-center" >                
                    <Text className="text-4xl text-white">
                        Home    
                    </Text>   
                </View>  
            </TouchableOpacity>
        </ScrollView>
    )
}

export default ExhibitionDisplayer;

const styles = StyleSheet.create({});