import { Pressable, StyleSheet, Text, TouchableOpacity, View, Alert, ScrollView } from 'react-native';
import { Link, useLocalSearchParams, useRouter  } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';
import { useRef } from 'react';
import "../global.css";
import { useGlobal } from '../contexts/GlobalContext';

const VideoPlayer = () => {

    const { videoToBePlayed, setVideoToBePlayed } = useGlobal();
    const { descriptionToBeDisplayed, setDescriptionToBeDisplayed } = useGlobal();
    const router = useRouter();
    const vid = useRef(null);

    function goToHomeHandler(){
        setVideoToBePlayed("");
        router.push("/");
    }

    function goToExhibitsHandler(){
        setVideoToBePlayed("");
        router.push("/Exhibits");
    }

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