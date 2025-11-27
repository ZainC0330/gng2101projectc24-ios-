import { Pressable, StyleSheet, Text, Image, TouchableOpacity, View, Alert, TextInput, ScrollView } from 'react-native';
import { Link, useLocalSearchParams, useRouter, usePathname } from 'expo-router';
import "../global.css";
import Item from './Item';
import ExhibitionItem from './ExhibitionItem';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker'; 
import { useGlobal } from '../contexts/GlobalContext';

const Edit = () => {

    const { items, setItems } = useGlobal();
    const { exhibitions, setExhibitions } = useGlobal();    
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [video, setVideo] = useState("");
    const exhibitionCells = exhibitions.map((ei) => {
        return <ExhibitionItem id={ei.id} image={ei.image} title={ei.title} frenchTitle={ei.frenchTitle} isCurrent={ei.isCurrent}/>
    });
    const exhibitCells = items.map((it) => {
        return <Item id={it.id} image={it.image} title={it.title} frenchTitle={it.frenchTitle} video={it.video} audioVideo={it.audioVideo} frenchAudioVideo={it.frenchAudioVideo} regularDescription={it.regularDescription} frenchDescription={it.frenchDescription} basicDescription={it.basicDescription} basicFrenchDescription={it.basicFrenchDescription} advancedDescription={it.advancedDescription} advancedFrenchDescription={it.advancedFrenchDescription} exhibition={it.exhibition}/>
    });
    const router = useRouter();

    function exitHandler(){
        router.push("/Settings");
    }

    useEffect(() => {
        setExhibitions(exhibitions);
        setItems(items);
    }, [exhibitions, items]);

    return(
        <ScrollView className="bg-red-600 flex-1" contentContainerStyle={{ alignItems: 'center' }}>
            <Text className="text-6xl font-bold text-white mt-16 mb-8 text-center">
                Edit
            </Text>
            <Text className="text-4xl font-bold text-white text-center my-4">
                Exhibitions
            </Text>            
            <View className="flex-row flex-wrap justify-center gap-4 p-4">
            {exhibitionCells}
            </View>
            <Text className="text-4xl font-bold text-white text-center my-4">
                Exhibits
            </Text>             
            <View className="flex-row flex-wrap justify-center gap-4 p-4">
            {exhibitCells}
            </View>            
            <TouchableOpacity onPress={exitHandler} className='mb-8'>
                <View className="bg-green-500 w-96 h-24 rounded-2xl items-center justify-center" >                
                    <Text className="text-4xl text-white">
                        Exit    
                    </Text>   
                </View>  
            </TouchableOpacity> 
        </ScrollView>
    )
}

export default Edit;

const styles = StyleSheet.create({});