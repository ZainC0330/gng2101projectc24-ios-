import { Pressable, StyleSheet, Text, TouchableOpacity, View, Alert, ScrollView } from 'react-native';
import { Link, useLocalSearchParams, useRouter  } from 'expo-router';
import { Video, ResizeMode, Audio } from 'expo-av';
import { useRef, useState, useEffect } from 'react';
import "../global.css";
import { useGlobal } from '../contexts/GlobalContext';
import * as Speech from 'expo-speech';

const VideoPlayer = () => {

    const { videoToBePlayed, setVideoToBePlayed } = useGlobal();
    const { audioVideoToBePlayed, setAudioVideoToBePlayed } = useGlobal();
    const { descriptionToBeDisplayed, setDescriptionToBeDisplayed } = useGlobal();
    const router = useRouter();
    const vid = useRef(null);
    const [sound, setSound] = useState();

    function goToHomeHandler(){
        Speech.stop();
        setSound(null);
        setVideoToBePlayed("");
        setAudioVideoToBePlayed("");
        router.push("/");
    }

    function goToExhibitsHandler(){
        Speech.stop();
        setSound(null);
        setVideoToBePlayed("");
        setAudioVideoToBePlayed("");
        router.push("/Exhibits");
    }

    function textToSpeech(){
        Speech.speak(descriptionToBeDisplayed);
    }

    async function playAudioNarration(){
        if (audioVideoToBePlayed) {
            try {
                // Unload any existing sound
                if (sound) {
                    await sound.unloadAsync();
                }
                
                const { sound: newSound } = await Audio.Sound.createAsync(
                    { uri: audioVideoToBePlayed },
                    { shouldPlay: true }
                );
                setSound(newSound);
            } catch (error) {
                Alert.alert("Error", "Could not play audio narration");
                console.error(error);
            }
        } else {
            Alert.alert("No Audio", "No audio narration available for this exhibit");
        }
    }    

    useEffect(() => {
        return sound ? () => { sound.unloadAsync(); } : undefined;
    }, [sound]);    

    return(
        <ScrollView className="bg-red-600 flex-1" contentContainerStyle={{ alignItems: 'center' }}>
            <View className="mt-12 mb-8">
                <Video
                    ref={vid}
                    source={{uri: videoToBePlayed}}
                    style={{ width: 400, height: 300 }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                />
            </View>
            <Text className="mb-8 px-8 text-3xl text-white">
                {descriptionToBeDisplayed}
            </Text>
            <TouchableOpacity onPress={textToSpeech}>
                <View className="bg-yellow-500 w-96 h-24 rounded-2xl items-center justify-center mb-8" >                
                    <Text className="text-4xl text-white">
                        Play AI Description    
                    </Text>   
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={playAudioNarration}>
                <View className="bg-purple-500 w-96 h-24 rounded-2xl items-center justify-center mb-8" >                
                    <Text className="text-4xl text-white">
                        Play Audio Narration    
                    </Text>   
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToExhibitsHandler}>
                <View className="bg-orange-500 w-96 h-24 rounded-2xl items-center justify-center mb-8" >                
                    <Text className="text-4xl text-white">
                        Exhibits    
                    </Text>   
                </View>  
            </TouchableOpacity> 
            <TouchableOpacity onPress={goToHomeHandler} className='mb-8'>
                <View className="bg-pink-400 w-96 h-24 rounded-2xl items-center justify-center" >                
                    <Text className="text-4xl text-white">
                        Home    
                    </Text>   
                </View>  
            </TouchableOpacity> 
        </ScrollView>
    )
}

export default VideoPlayer;

const styles = StyleSheet.create({});