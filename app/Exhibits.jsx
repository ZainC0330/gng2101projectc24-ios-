import { Pressable, StyleSheet, Text, Image, TouchableOpacity, View, Alert, ScrollView, Modal, TextInput } from 'react-native';
import { Link, useLocalSearchParams, useRouter, usePathname  } from 'expo-router';
import "../global.css";
import Item from './Item';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useGlobal } from '../contexts/GlobalContext';

const Exhibits = () => {

    const { items, setItems, password, setPassword } = useGlobal();
    const [uploadModalVisibility, setUploadModalVisibility] = useState(false);
    const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
    const [passwordEntryText, setPasswordEntryText] = useState("");
    const cells = items.map((it) => {
        return <Item image={it.image} title={it.title} video={it.video}/>
    });
    const router = useRouter();

    function uploadIntiationHandler(){
        setUploadModalVisibility(true);
    }

    function deleteIntiationHandler(){
        setDeleteModalVisibility(true);
    }

    function goHomeHandler(){
        router.push("/");
    }

    function uploadPasswordCheckHandler(){
        if(passwordEntryText===password){
            setUploadModalVisibility(false);
            setPasswordEntryText("");
            router.push("/Upload");
        }
        else{
            Alert.alert("Password Incorrect.");
            setUploadModalVisibility(false);
        }
    }

    function deletePasswordCheckHandler(){
        if(passwordEntryText===password){
            setDeleteModalVisibility(false);
            setPasswordEntryText("");
            router.push("/Delete");
        }
        else{
            Alert.alert("Password Incorrect.");
            setDeleteModalVisibility(false);
        }
    }

    return(
        <ScrollView className="bg-red-600 flex-1" contentContainerStyle={{ alignItems: 'center' }}>
            <Text className="text-6xl font-bold text-white mt-16 mb-8">
                Exhibits
            </Text>
            <View className="flex-row flex-wrap justify-center gap-4 p-4">
                {cells}
            </View>
            <TouchableOpacity onPress={goHomeHandler} className='mb-8'>
                <View className="bg-green-500 w-96 h-24 rounded-2xl items-center justify-center" >                
                    <Text className="text-4xl text-white">
                        Home    
                    </Text>   
                </View>  
            </TouchableOpacity>   
            <TouchableOpacity onPress={uploadIntiationHandler}>
                <View className="bg-yellow-500 rounded-2xl items-center justify-center w-96 h-24 mb-8" >                
                    <Text className="text-4xl text-white">
                        Upload    
                    </Text>   
                </View>  
            </TouchableOpacity>
            <Modal visible={uploadModalVisibility}>
                <View className="flex items-center justify-center h-full w-full">
                    <Text className="text-black text-4xl">Enter Password</Text>
                    <TextInput placeholder='' value={passwordEntryText} onChangeText={setPasswordEntryText} className="text-2xl text-black border-2 p-2 w-64 bg-gray-200 mb-2"/>
                    <TouchableOpacity className="border-2 p-4 rounded-md bg-blue-400 w-40 items-center" onPress={uploadPasswordCheckHandler}>
                        <Text className="text-white text-2xl">Enter</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <TouchableOpacity onPress={deleteIntiationHandler}>
                <View className="bg-purple-500 rounded-2xl items-center justify-center w-96 h-24" >                
                    <Text className="text-4xl text-white">
                        Delete    
                    </Text>   
                </View>  
            </TouchableOpacity>
            <Modal visible={deleteModalVisibility}>
                <View className="flex items-center justify-center h-full w-full">
                    <Text className="text-black text-4xl">Enter Password</Text>
                    <TextInput placeholder='' value={passwordEntryText} onChangeText={setPasswordEntryText} className="text-2xl text-black border-2 p-2 w-64 bg-gray-200 mb-2"/>
                    <TouchableOpacity className="border-2 p-4 rounded-md bg-blue-400 w-40 items-center" onPress={deletePasswordCheckHandler}>
                        <Text className="text-white text-2xl">Enter</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </ScrollView>
    )
}

export default Exhibits;

const styles = StyleSheet.create({});