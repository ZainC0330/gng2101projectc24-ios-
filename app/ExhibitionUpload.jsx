import { Pressable, StyleSheet, Text, Image, TouchableOpacity, View, Alert, TextInput, ScrollView } from 'react-native';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';
import { useRef } from 'react';
import "../global.css";
import Item from './Item';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker'; 
import { useGlobal } from '../contexts/GlobalContext';
import Checkbox from 'expo-checkbox';

const ExhibitionUpload = () => {

    const { items, setItems } = useGlobal();
    const { exhibitions, setExhibitions } = useGlobal();
    const { language, setLanguage } = useGlobal();
    const { level, setLevel } = useGlobal();
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [frenchTitle, setFrenchTitle] = useState("");
    const [isCurrent, setIsCurrent] = useState(true);
    const router = useRouter();

    const imageUploadHandler = async () => {

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Please grant permission to access videos');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
        
    }

    function saveAndUploadHandler(){
        if(title.trim()==="" || frenchTitle.trim()===""){
            Alert.alert("Cannot upload, missing a title.");
        }
        else if(image===""){
            Alert.alert("Cannot upload, missing image.");
        }
        else{
            setExhibitions(prev => [...prev, {id: Date.now(), image: image, title: title, frenchTitle: frenchTitle, isCurrent: isCurrent}]);
            Alert.alert("Entry Saved.");
        }
    }

    function exitHandler(){
        router.push("/Settings");
        setImage("");
        setTitle("");
        setFrenchTitle("");
        setIsCurrent(true);
    }

    function setToCurrentHandler(){
        setIsCurrent(true);
    }

    function setToPastHandler(){
        setIsCurrent(false);
    }

    return(
        <ScrollView className="bg-red-600 flex-1" contentContainerStyle={{ alignItems: 'center' }}>
            <Text className="text-6xl font-bold text-white mt-16 mb-16 text-center">
                Upload Exhibition
            </Text>
            <Text className="text-4xl text-white mb-4">Title</Text>
            <TextInput placeholder='Title...' value={title} onChangeText={setTitle} className="text-2xl border-2 p-2 bg-white w-96 h-12 mb-8"/>
            <Text className="text-4xl text-white mb-4">French Title</Text>
            <TextInput placeholder='French Title...' value={frenchTitle} onChangeText={setFrenchTitle} className="text-2xl border-2 p-2 bg-white w-96 h-12 mb-8"/>
            <Image
                source={{uri: image}}
                style={{width: 150, height: 150}}
            />
            <TouchableOpacity onPress={imageUploadHandler} className="rounded-2xl mt-8 mb-8 p-4 bg-yellow-500 w-96 h-24 items-center justify-center">
                <Text className="text-4xl text-white">Image</Text>
            </TouchableOpacity>       
            <TouchableOpacity onPress={saveAndUploadHandler} className="rounded-2xl mb-8 p-4 bg-blue-500 w-96 h-24 items-center justify-center">
                <Text className="text-4xl text-white">Save & Upload</Text>
            </TouchableOpacity>
            <View className="mb-4" style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text className="text-white text-4xl mr-2">Current</Text>
                <Checkbox
                value={isCurrent}
                onValueChange={setToCurrentHandler}
                color={isCurrent ? '#2196F3' : undefined}
                style={{ width: 40, height: 40 }}
                />
            </View>
            <View className="mb-8" style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text className="text-white text-4xl mr-2">Past</Text>
                <Checkbox
                value={!isCurrent}
                onValueChange={setToPastHandler}
                color={!isCurrent ? '#2196F3' : undefined}
                style={{ width: 40, height: 40 }}
                />
            </View>
            <TouchableOpacity onPress={exitHandler} className='mb-8'>
                <View className="bg-green-500 w-96 h-24 rounded-2xl items-center justify-center">
                    <Text className="text-4xl text-white">
                        Exit    
                    </Text>   
                </View>  
            </TouchableOpacity>
        </ScrollView>
    )
}

export default ExhibitionUpload;

const styles = StyleSheet.create({});