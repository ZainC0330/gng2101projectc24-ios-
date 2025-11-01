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
    const { language, setLanguage } = useGlobal();
    const { level, setLevel } = useGlobal();
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [frenchTitle, setFrenchTitle] = useState("");
    const [video, setVideo] = useState("");
    const [frenchVideo, setFrenchVideo] = useState("");
    const [basicVideo, setBasicVideo] = useState("");
    const [basicFrenchVideo, setBasicFrenchVideo] = useState("");
    const [regularDescription, setRegularDescription] = useState("");
    const [frenchDescription, setFrenchDescription] = useState("");
    const [basicDescription, setBasicDescription] = useState("");
    const [basicFrenchDescription, setBasicFrenchDescription] = useState("");
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

    const videoUploadHandler = async (videoLanguage, videoLevel) => {

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

        if(!result.canceled){
            if(videoLanguage === "english"){
                if(videoLevel === "regular"){
                    setVideo(result.assets[0].uri);
                }
                if(videoLevel === "basic"){
                    setBasicVideo(result.assets[0].uri);
                }
            }
            if(videoLanguage==="french"){
                if(videoLevel === "regular"){
                    setFrenchVideo(result.assets[0].uri);
                }
                if(videoLevel === "basic"){
                    setBasicFrenchVideo(result.assets[0].uri);
                }         
            }
        }
        
    }

    function saveAndUploadHandler(){
        if(title.trim()==="" || frenchTitle.trim()===""){
            Alert.alert("Cannot upload, missing a title.");
        }
        else if(image===""){
            Alert.alert("Cannot upload, missing image.");
        }
        else if(video==="" || frenchVideo==="" || basicVideo==="" || basicFrenchVideo===""){
            Alert.alert("Cannot upload, missing a video.");
        }
        else{
            setItems(prev => [...prev, {image: image, title: title, frenchTitle: frenchTitle, video: video, frenchVideo: frenchVideo, basicVideo: basicVideo, basicFrenchVideo: basicFrenchVideo, regularDescription: regularDescription, frenchDescription: frenchDescription, basicDescription: basicDescription, basicFrenchDescription: basicFrenchDescription}]);
            Alert.alert("Entry Saved.");
        }
    }

    function exitHandler(){
        router.push("/Settings");
        setImage("");
        setTitle("");
        setFrenchTitle("");
        setVideo("");
        setFrenchVideo("");
        setBasicVideo("");
        setBasicFrenchVideo("");
        setRegularDescription("");
        setFrenchDescription("");
        setBasicDescription("");
        setBasicFrenchDescription("");
    }

    return(
        <ScrollView className="bg-red-600 flex-1" contentContainerStyle={{ alignItems: 'center' }}>
            <Text className="text-6xl font-bold text-white mt-16 mb-16">
                Upload
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
            <Video
                ref={vid}
                source={{uri: video}}
                style={{ width: 268, height: 200 }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
            />      
            <TouchableOpacity onPress={() => videoUploadHandler("english","regular")} className="rounded-2xl mt-8 mb-8 p-4 bg-orange-500 w-96 h-24 items-center justify-center">
                <Text className="text-4xl text-white">Video</Text>
            </TouchableOpacity>
            <Video
                ref={vid}
                source={{uri: frenchVideo}}
                style={{ width: 268, height: 200 }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
            />      
            <TouchableOpacity onPress={() => videoUploadHandler("french","regular")} className="rounded-2xl mt-8 mb-8 p-4 bg-orange-500 w-96 h-24 items-center justify-center">
                <Text className="text-4xl text-white">French Video</Text>
            </TouchableOpacity>
            <Video
                ref={vid}
                source={{uri: basicVideo}}
                style={{ width: 268, height: 200 }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
            />      
            <TouchableOpacity onPress={() => videoUploadHandler("english","basic")} className="rounded-2xl mt-8 mb-8 p-4 bg-orange-500 w-96 h-24 items-center justify-center">
                <Text className="text-4xl text-white">Basic Video</Text>
            </TouchableOpacity>
            <Video
                ref={vid}
                source={{uri: basicFrenchVideo}}
                style={{ width: 268, height: 200 }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
            />      
            <TouchableOpacity onPress={() => videoUploadHandler("french","basic")} className="rounded-2xl mt-8 mb-8 p-4 bg-orange-500 w-96 h-24 items-center justify-center">
                <Text className="text-4xl text-white">Basic French Video</Text>
            </TouchableOpacity>
            <Text className="text-4xl text-white mb-4">Regular Description</Text>
            <TextInput placeholder='Regular Description...' value={regularDescription} onChangeText={setRegularDescription} multiline keyboardShouldPersistTaps="handled" className="text-2xl border-2 p-2 bg-white w-96 h-96 mb-8"/>
            <Text className="text-4xl text-white mb-4">French Description</Text>
            <TextInput placeholder='French Description...' value={frenchDescription} onChangeText={setFrenchDescription} multiline keyboardShouldPersistTaps="handled" className="text-2xl border-2 p-2 bg-white w-96 h-96 mb-8"/>
            <Text className="text-4xl text-white mb-4">Basic Description</Text>
            <TextInput placeholder='Basic Description...' value={basicDescription} onChangeText={setBasicDescription} multiline keyboardShouldPersistTaps="handled" className="text-2xl border-2 p-2 bg-white w-96 h-96 mb-8"/>
            <Text className="text-4xl text-white mb-4">Basic French Description</Text>
            <TextInput placeholder='Basic French Description...' value={basicFrenchDescription} onChangeText={setBasicFrenchDescription} multiline keyboardShouldPersistTaps="handled" className="text-2xl border-2 p-2 bg-white w-96 h-96 mb-8"/>
            <TouchableOpacity onPress={saveAndUploadHandler} className="rounded-2xl mb-8 p-4 bg-blue-500 w-96 h-24 items-center justify-center">
                <Text className="text-4xl text-white">Save & Upload</Text>
            </TouchableOpacity>

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

export default Upload;

const styles = StyleSheet.create({});