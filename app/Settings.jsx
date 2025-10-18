import { Pressable, StyleSheet, Text, TouchableOpacity, View, Alert, ImageBackground } from 'react-native';
import { Link } from 'expo-router';
import { Audio } from 'expo-av';
import "../global.css";

const Settings = () => {
    return(
        <View className="flex items-center">
            <Text className = "mt-28 text-2xl">Settings</Text>
            <Link href="/" className='mb-8'>
                <View className="bg-green-500 w-96 h-24 rounded-2xl items-center justify-center" >                
                    <Text className="text-2xl">
                        Home    
                    </Text>   
                </View>  
            </Link> 
        </View>
    )
}

export default Settings;

const styles = StyleSheet.create({});