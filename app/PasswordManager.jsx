import { Pressable, StyleSheet, Text, Image, TouchableOpacity, View, Alert, ScrollView, Modal, TextInput } from 'react-native';
import { Link, useLocalSearchParams, useRouter, usePathname  } from 'expo-router';
import "../global.css";
import Item from './Item';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useGlobal } from '../contexts/GlobalContext';

const PasswordManager = () => {

    const { password, setPassword } = useGlobal();
    const [newPassword, setNewPassword] = useState("");
    const router = useRouter();

    function changePasswordHandler(){
        if(newPassword.trim()===""){
            Alert.alert("Cannot change, new password is empty.");
        }
        else{
            setPassword(newPassword);
            setNewPassword("");
            Alert.alert("Password changed successfully.");
            router.push("/Settings");
        }
    }

    function exitHandler(){
        setNewPassword("");
        router.push("/Settings");
    }

    return(
        <ScrollView className="bg-red-600" contentContainerStyle={{ alignItems: 'center' }}>
            <Text className="text-6xl font-bold text-white mt-16 mb-8 text-center">
                Password Manager
            </Text>
            <TextInput placeholder='Enter New Password...' value={newPassword} onChangeText={setNewPassword} className="text-2xl border-2 p-2 bg-white w-96 h-12 mb-8"/>
            <TouchableOpacity className="border-2 p-4 rounded-md bg-blue-400 w-40 items-center mb-4" onPress={changePasswordHandler}>
                <Text className="text-white text-2xl">Enter</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border-2 p-4 rounded-md bg-red-400 w-40 items-center" onPress={exitHandler}>
                <Text className="text-white text-2xl">Exit</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default PasswordManager;

const styles = StyleSheet.create({});