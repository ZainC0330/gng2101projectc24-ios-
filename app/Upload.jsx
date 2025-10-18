import { Pressable, StyleSheet, Text, Image, TouchableOpacity, View, Alert, TextInput, ScrollView } from 'react-native';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';
import { useRef } from 'react';
import "../global.css";
import Item from './Item';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker'; 
import { useGlobal } from '../contexts/GlobalContext';

const Upload = () => {

    const { items, setItems } = useGlobal();
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [video, setVideo] = useState("");
    const router = useRouter();
    const vid = useRef(null);

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

        const videoUploadHandler = async () => {

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Please grant permission to access videos');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setVideo(result.assets[0].uri);
        }
        
    }

    function saveAndUploadHandler(){
        if(title===""){
            Alert.alert("Cannot upload, no title.");
        }
        else if(image===""){
            Alert.alert("Cannot upload, no image.");
        }
        else if(video===""){
            Alert.alert("Cannot upload, no video.");
        }
        else{
            setItems(prev => [...prev, {image: image,title: title,video: video}]);
            Alert.alert("Entry Saved.");
        }
    }

    function exitHandler(){
        router.push("/Exhibits");
        setImage("");
        setTitle("");
        setVideo("");
    }

    return(
        <ScrollView className="bg-red-600 flex-1" contentContainerStyle={{ alignItems: 'center' }}>
            <Text className="text-6xl font-bold text-white mt-16 mb-16">
                Upload
            </Text>
            <TextInput placeholder='Title...' value={title} onChangeText={setTitle} className="text-2xl border-2 p-2 bg-white w-64 h-12 mb-8"/>
            <Image
                source={{uri: image}}
                style={{width: 150, height: 150}}
            />
            <TouchableOpacity onPress={imageUploadHandler} className="rounded-2xl mt-8 mb-8 p-4 bg-yellow-500 w-96 h-24 items-center justify-center">
                <Text className="text-4xl text-white">Image</Text>
            </TouchableOpacity>   
            <Video
                ref={vid}
                source={{uri: video}}
                style={{ width: 268, height: 200 }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
            />      
            <TouchableOpacity onPress={videoUploadHandler} className="rounded-2xl mt-8 mb-8 p-4 bg-orange-500 w-96 h-24 items-center justify-center">
                <Text className="text-4xl text-white">Video</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={saveAndUploadHandler} className="rounded-2xl mb-8 p-4 bg-blue-500 w-96 h-24 items-center justify-center">
                <Text className="text-4xl text-white">Save & Upload</Text>
            </TouchableOpacity>

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

export default Upload;

const styles = StyleSheet.create({});