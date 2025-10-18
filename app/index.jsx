import { Pressable, StyleSheet, Text, TouchableOpacity, View, Alert, ImageBackground } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Audio } from 'expo-av';
import "../global.css";

const index = () => {

    const router = useRouter();

    function startHandler(){
        router.push("/Exhibits");
    }

        function goToSettingsHandler(){
        router.push("/Settings");
    }

    return(
        <ImageBackground source={require("../assets/img1.jpg")} className="flex-1" resizeMode="cover">
            <View className="flex-1 items-center">
                <Text className="text-8xl font-bold text-white mt-28 mb-48 bg-green-400 p-4 rounded-3xl items-center justify-center">
                    Welcome
                </Text>
                <TouchableOpacity onPress={startHandler} className='mb-8'>
                    <View className="bg-green-500 w-96 h-24 rounded-2xl items-center justify-center" >                
                        <Text className="text-4xl text-white">
                            Start    
                        </Text>   
                    </View>  
                </TouchableOpacity>
                <TouchableOpacity onPress={goToSettingsHandler}>
                    <View className="bg-yellow-500 w-96 h-24 rounded-2xl items-center justify-center" >                
                        <Text className="text-4xl text-white">
                            Settings    
                        </Text>   
                    </View>  
                </TouchableOpacity>        
            </View>
        </ImageBackground>
    )
}

export default index;

const styles = StyleSheet.create({});