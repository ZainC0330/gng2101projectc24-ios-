import { Pressable, StyleSheet, Text, Image, TouchableOpacity, View, Alert, ScrollView, Modal, TextInput } from 'react-native';
import { Link, useLocalSearchParams, useRouter, usePathname  } from 'expo-router';
import "../global.css";
import Item from './Item';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useGlobal } from '../contexts/GlobalContext';

const Exhibits = () => {

    const { items, setItems, password, setPassword } = useGlobal();
    const [passwordEntryText, setPasswordEntryText] = useState("");
    const cells = items.map((it) => {
        return <Item image={it.image} title={it.title} frenchTitle={it.frenchTitle} video={it.video} frenchVideo={it.frenchVideo} basicVideo={it.basicVideo} basicFrenchVideo={it.basicFrenchVideo} regularDescription={it.regularDescription} frenchDescription={it.frenchDescription} basicDescription={it.basicDescription} basicFrenchDescription={it.basicFrenchDescription}/>
    });
    const router = useRouter();

    function goHomeHandler(){
        router.push("/");
    }

    return(
        <ScrollView className="bg-red-600 flex-1" contentContainerStyle={{ alignItems: 'center' }}>
            <Text className="text-6xl font-bold text-white mt-16 mb-8">
                Exhibits
            </Text>
            <View className="flex-row flex-wrap justify-center gap-4 p-4">
                {cells}
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

export default Exhibits;

const styles = StyleSheet.create({});