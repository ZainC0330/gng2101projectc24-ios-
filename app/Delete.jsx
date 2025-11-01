import { Pressable, StyleSheet, Text, Image, TouchableOpacity, View, Alert, TextInput, ScrollView } from 'react-native';
import { Link, useLocalSearchParams, useRouter, usePathname } from 'expo-router';
import "../global.css";
import Item from './Item';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker'; 
import { useGlobal } from '../contexts/GlobalContext';

const Delete = () => {

    const { items, setItems } = useGlobal();
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [video, setVideo] = useState("");
    const cells = items.map((it) => {
        return <Item image={it.image} title={it.title} video={it.video}/>
    });
    const router = useRouter();

    function exitHandler(){
        router.push("/Settings");
    }

    return(
        <ScrollView className="bg-red-600 flex-1" contentContainerStyle={{ alignItems: 'center' }}>
            <Text className="text-6xl font-bold text-white mt-16 mb-8">
                Delete
            </Text>
            <View className="flex-row flex-wrap justify-center gap-4 p-4">
                {cells}
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

export default Delete;

const styles = StyleSheet.create({});