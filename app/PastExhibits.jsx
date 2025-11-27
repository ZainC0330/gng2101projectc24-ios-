import { Pressable, StyleSheet, Text, Image, TouchableOpacity, View, Alert, ScrollView, Modal, TextInput } from 'react-native';
import { Link, useLocalSearchParams, useRouter, usePathname  } from 'expo-router';
import "../global.css";
import Item from './Item';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useGlobal } from '../contexts/GlobalContext';
import ExhibitionItem from './ExhibitionItem';

const PastExhibits = () => {

    const { items, setItems, exhibitions, setExhibitions, password, setPassword, language, setLanguage } = useGlobal();
    const [passwordEntryText, setPasswordEntryText] = useState("");
    
    const currentOnes = exhibitions.filter((ex) => {
        return ex.isCurrent === false;
    }); 

    const currentCells = currentOnes.map((ei) => {
        return <ExhibitionItem id={ei.id} image={ei.image} title={ei.title} frenchTitle={ei.frenchTitle} isCurrent={ei.isCurrent}/>
    });
    const router = useRouter();

    function goHomeHandler(){
        router.push("/");
    }

    function goBackHandler(){
        router.push("/Exhibits");
    }
    
    return(
        <ScrollView className="bg-red-600 flex-1" contentContainerStyle={{ alignItems: 'center' }}>
            <Text className="text-6xl font-bold text-white mt-16 mb-8">
                Past Exhibits
            </Text>
            <View className="flex-row flex-wrap justify-center gap-4 p-4">
                {currentCells}
            </View>
            <TouchableOpacity onPress={goBackHandler} className='mb-8'>
                <View className="bg-orange-500 w-96 h-24 rounded-2xl items-center justify-center" >                
                    <Text className="text-4xl text-white">
                        Back    
                    </Text>   
                </View>  
            </TouchableOpacity>
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

export default PastExhibits;

const styles = StyleSheet.create({});