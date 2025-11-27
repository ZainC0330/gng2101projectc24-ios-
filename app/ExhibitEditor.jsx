import { Pressable, StyleSheet, Text, Image, TouchableOpacity, View, Alert, TextInput, ScrollView } from 'react-native';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';
import { useRef, useEffect } from 'react';
import "../global.css";
import Item from './Item';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker'; 
import { useGlobal } from '../contexts/GlobalContext';
import Checkbox from 'expo-checkbox';

const ExhibitEditor = () => {

    const { items, setItems, itemToBeEdited, setItemToBeEdited } = useGlobal();
    const { language, setLanguage } = useGlobal();
    const { level, setLevel } = useGlobal();
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [frenchTitle, setFrenchTitle] = useState("");
    const [video, setVideo] = useState("");
    const [audioVideo, setAudioVideo] = useState("");
    const [frenchAudioVideo, setFrenchAudioVideo] = useState("");
    const [regularDescription, setRegularDescription] = useState("");
    const [frenchDescription, setFrenchDescription] = useState("");
    const [basicDescription, setBasicDescription] = useState("");
    const [basicFrenchDescription, setBasicFrenchDescription] = useState("");
    const [advancedDescription, setAdvancedDescription] = useState("");
    const [advancedFrenchDescription, setAdvancedFrenchDescription] = useState("");    
    const [exhibition, setExhibition] = useState("");
    const router = useRouter();
    const vid = useRef(null);
    const audioVid = useRef(null);
    const frenchAudioVid = useRef(null);

    useEffect(() => {
        if (itemToBeEdited) {
            setImage(itemToBeEdited.image || "");
            setTitle(itemToBeEdited.title || "");
            setFrenchTitle(itemToBeEdited.frenchTitle || "");
            setVideo(itemToBeEdited.video || "");
            setAudioVideo(itemToBeEdited.audioVideo || "");
            setFrenchAudioVideo(itemToBeEdited.frenchAudioVideo || "");            
            setRegularDescription(itemToBeEdited.regularDescription || "");
            setFrenchDescription(itemToBeEdited.frenchDescription || "");
            setBasicDescription(itemToBeEdited.basicDescription || "");
            setBasicFrenchDescription(itemToBeEdited.basicFrenchDescription || "");
            setAdvancedDescription(itemToBeEdited.advancedDescription || "");
            setAdvancedFrenchDescription(itemToBeEdited.advancedFrenchDescription || "");            
            setExhibition(itemToBeEdited.exhibition || "");
        }
    }, [itemToBeEdited]);

    const imageUploadHandler = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Please grant permission to access images');
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
            setVideo(result.assets[0].uri);
        }
    }

    const audioVideoUploadHandler = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Please grant permission to access videos');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: false,
            quality: 1,
        });

        if(!result.canceled){
            setAudioVideo(result.assets[0].uri);
        }
    }

    const frenchAudioVideoUploadHandler = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Please grant permission to access videos');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: false,
            quality: 1,
        });

        if(!result.canceled){
            setFrenchAudioVideo(result.assets[0].uri);
        }
    }    

    function saveAndUploadHandler(){
        if(title.trim()==="" || frenchTitle.trim()===""){
            Alert.alert("Cannot save, missing a title.");
        }
        else if(image===""){
            Alert.alert("Cannot save, missing image.");
        }
        else if(video===""){
            Alert.alert("Cannot save, missing video.");
        }
        else{
            setItems(prev => prev.map(item => 
                item.id === itemToBeEdited.id 
                    ? {
                        id: item.id, 
                        image, 
                        title, 
                        frenchTitle, 
                        video,
                        audioVideo,
                        frenchAudioVideo, 
                        regularDescription, 
                        frenchDescription, 
                        basicDescription, 
                        basicFrenchDescription,
                        advancedDescription,
                        advancedFrenchDescription, 
                        exhibition
                    }
                    : item
            ));
            Alert.alert("Changes Saved!");
            router.push("/Edit");
        }
    }

    function exitHandler(){
        router.push("/Settings");
    }

    return(
        <ScrollView className="bg-red-600 flex-1" contentContainerStyle={{ alignItems: 'center' }}>
            <Text className="text-6xl font-bold text-white mt-16 mb-16">
                Edit Exhibit
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
                ref={audioVid}
                source={{uri: audioVideo}}
                style={{ width: 268, height: 200 }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
            />      
            <TouchableOpacity onPress={audioVideoUploadHandler} className="rounded-2xl mt-8 mb-8 p-4 bg-purple-500 w-96 h-24 items-center justify-center">
                <Text className="text-4xl text-white">Audio Narration</Text>
            </TouchableOpacity>
            <Video
                ref={frenchAudioVid}
                source={{uri: frenchAudioVideo}}
                style={{ width: 268, height: 200 }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
            />      
            <TouchableOpacity onPress={frenchAudioVideoUploadHandler} className="rounded-2xl mt-8 mb-8 p-4 bg-purple-500 w-96 h-24 items-center justify-center">
                <Text className="text-4xl text-white">French Audio Narration</Text>
            </TouchableOpacity>            
            <Text className="text-4xl text-white mb-4">Regular Description</Text>
            <TextInput placeholder='Regular Description...' value={regularDescription} onChangeText={setRegularDescription} multiline keyboardShouldPersistTaps="handled" className="text-2xl border-2 p-2 bg-white w-96 h-96 mb-8"/>
            <Text className="text-4xl text-white mb-4">French Description</Text>
            <TextInput placeholder='French Description...' value={frenchDescription} onChangeText={setFrenchDescription} multiline keyboardShouldPersistTaps="handled" className="text-2xl border-2 p-2 bg-white w-96 h-96 mb-8"/>
            <Text className="text-4xl text-white mb-4">Basic Description</Text>
            <TextInput placeholder='Basic Description...' value={basicDescription} onChangeText={setBasicDescription} multiline keyboardShouldPersistTaps="handled" className="text-2xl border-2 p-2 bg-white w-96 h-96 mb-8"/>
            <Text className="text-4xl text-white mb-4">Basic French Description</Text>
            <TextInput placeholder='Basic French Description...' value={basicFrenchDescription} onChangeText={setBasicFrenchDescription} multiline keyboardShouldPersistTaps="handled" className="text-2xl border-2 p-2 bg-white w-96 h-96 mb-8"/>
            <Text className="text-4xl text-white mb-4">Advanced Description</Text>
            <TextInput placeholder='Regular Description...' value={advancedDescription} onChangeText={setAdvancedDescription} multiline keyboardShouldPersistTaps="handled" className="text-2xl border-2 p-2 bg-white w-96 h-96 mb-8"/>
            <Text className="text-4xl text-white mb-4">Advanced French Description</Text>
            <TextInput placeholder='Regular Description...' value={advancedFrenchDescription} onChangeText={setAdvancedFrenchDescription} multiline keyboardShouldPersistTaps="handled" className="text-2xl border-2 p-2 bg-white w-96 h-96 mb-8"/>
            <Text className="text-4xl text-white mb-4">Exhibition</Text>
            <TextInput placeholder='Exhibition...' value={exhibition} onChangeText={setExhibition} keyboardShouldPersistTaps="handled" className="text-2xl border-2 p-2 bg-white w-96 h-12 mb-8"/>
            <TouchableOpacity onPress={saveAndUploadHandler} className="rounded-2xl mb-8 p-4 bg-blue-500 w-96 h-24 items-center justify-center">
                <Text className="text-4xl text-white">Save Changes</Text>
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

export default ExhibitEditor;

const styles = StyleSheet.create({});