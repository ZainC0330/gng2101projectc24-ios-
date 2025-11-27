import { Pressable, StyleSheet, Text, Image, TouchableOpacity, View, Alert, ScrollView, Modal, TextInput } from 'react-native';
import { Link, useLocalSearchParams, useRouter, usePathname } from 'expo-router';
import "../global.css";
import Item from './Item';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useGlobal } from '../contexts/GlobalContext';
import Checkbox from 'expo-checkbox';

const Settings = () => {

    const { items, setItems, password, setPassword, language, setLanguage, level, setLevel, radioEnglish, setRadioEnglish, radioFrench, setRadioFrench, radioRegular, setRadioRegular, radioBasic, setRadioBasic, radioAdvanced, setRadioAdvanced } = useGlobal();
    const [uploadModalVisibility, setUploadModalVisibility] = useState(false);
    const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
    const [uploadExhibitionModalVisibility, setUploadExhibitionModalVisibility] = useState(false);
    const [deleteExhibitionModalVisibility, setDeleteExhibitionModalVisibility] = useState(false);
    const [changePasswordModalVisibility, setChangePasswordModalVisibility] = useState(false);
    const [editModalVisibility, setEditModalVisibility] = useState(false);
    const [passwordEntryText, setPasswordEntryText] = useState("");
    const router = useRouter();

    function uploadIntiationHandler(){
        setUploadModalVisibility(true);
    }

    function deleteIntiationHandler(){
        setDeleteModalVisibility(true);
    }

    function uploadExhibitionIntiationHandler(){
        setUploadExhibitionModalVisibility(true);
    }

    function deleteExhibitionIntiationHandler(){
        setDeleteExhibitionModalVisibility(true);
    }    

    function changePasswordIntiationHandler(){
        setChangePasswordModalVisibility(true);
    }

    function editIntiationHandler(){
        setEditModalVisibility(true);
    }

    function goHomeHandler(){
        router.push("/");
    }

    function uploadPasswordCheckHandler(){
        if(passwordEntryText.trim() === password){
            setUploadModalVisibility(false);
            setPasswordEntryText("");
            router.push("/Upload");
        }
        else{
            Alert.alert("Password Incorrect.");
            setUploadModalVisibility(false);
            setPasswordEntryText("");
        }
    }

    function deletePasswordCheckHandler(){
        if(passwordEntryText.trim() === password){
            setDeleteModalVisibility(false);
            setPasswordEntryText("");
            router.push("/Delete");
        }
        else{
            Alert.alert("Password Incorrect.");
            setDeleteModalVisibility(false);
            setPasswordEntryText("");
        }
    }

    function uploadExhibitionPasswordCheckHandler(){
        if(passwordEntryText.trim() === password){
            setUploadExhibitionModalVisibility(false);
            setPasswordEntryText("");
            router.push("/ExhibitionUpload");
        }
        else{
            Alert.alert("Password Incorrect.");
            setUploadExhibitionModalVisibility(false);
            setPasswordEntryText("");
        }
    }

    function deleteExhibitionPasswordCheckHandler(){
        if(passwordEntryText.trim() === password){
            setDeleteExhibitionModalVisibility(false);
            setPasswordEntryText("");
            router.push("/DeleteExhibition");
        }
        else{
            Alert.alert("Password Incorrect.");
            setDeleteExhibitionModalVisibility(false);
            setPasswordEntryText("");
        }
    }

    function changePasswordPasswordCheckHandler(){
        if(passwordEntryText.trim() === password){
            setChangePasswordModalVisibility(false);
            setPasswordEntryText("");
            router.push("/PasswordManager");
        }
        else{
            Alert.alert("Password Incorrect.");
            setChangePasswordModalVisibility(false);
            setPasswordEntryText("");
        }
    }

    function editPasswordCheckHandler(){
        if(passwordEntryText.trim() === password){
            setEditModalVisibility(false);
            setPasswordEntryText("");
            router.push("/Edit");
        }
        else{
            Alert.alert("Password Incorrect.");
            setEditModalVisibility(false);
            setPasswordEntryText("");
        }
    }    

    function exitPasswordForUploadHandler(){
        setUploadModalVisibility(false);
        setPasswordEntryText("");
    }

    function exitPasswordForDeleteHandler(){
        setDeleteModalVisibility(false);
        setPasswordEntryText("");
    }

    function exitPasswordForUploadExhibitionHandler(){
        setUploadExhibitionModalVisibility(false);
        setPasswordEntryText("");
    }

    function exitPasswordForDeleteExhibitionHandler(){
        setDeleteExhibitionModalVisibility(false);
        setPasswordEntryText("");
    }    

    function exitPasswordForChangePasswordHandler(){
        setChangePasswordModalVisibility(false);
        setPasswordEntryText("");
    }

    function exitPasswordForEditHandler(){
        setEditModalVisibility(false);
        setPasswordEntryText("");
    }    

    function radioEnglishHandler(){
        setRadioEnglish(true);
        setRadioFrench(false);
        setLanguage("english");
    }
    
    function radioFrenchHandler(){
        setRadioEnglish(false);
        setRadioFrench(true);
        setLanguage("french");
    }
    
    function radioRegularHandler(){
        setRadioRegular(true);
        setRadioBasic(false);
        setRadioAdvanced(false);
        setLevel("regular");
    }
    
    function radioBasicHandler(){
        setRadioRegular(false);
        setRadioBasic(true);
        setRadioAdvanced(false);
        setLevel("basic");      
    }
    
    function radioAdvancedHandler(){
        setRadioRegular(false);
        setRadioBasic(false);
        setRadioAdvanced(true);
        setLevel("advanced");      
    } 

    return(
        <ScrollView className="bg-red-600 flex" contentContainerStyle={{ alignItems: 'center' }}>
            <Text className = "text-6xl font-bold text-white mt-16 mb-8">
                Settings
            </Text>
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
                    <TouchableOpacity className="border-2 p-4 rounded-md bg-blue-400 w-40 items-center mb-4" onPress={uploadPasswordCheckHandler}>
                        <Text className="text-white text-2xl">Enter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="border-2 p-4 rounded-md bg-red-400 w-40 items-center" onPress={exitPasswordForUploadHandler}>
                        <Text className="text-white text-2xl">Exit</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <TouchableOpacity onPress={uploadExhibitionIntiationHandler}>
                <View className="bg-orange-500 rounded-2xl items-center justify-center w-96 h-24 mb-8" >                
                    <Text className="text-4xl text-white">
                        Create New Exhibition    
                    </Text>   
                </View>  
            </TouchableOpacity>
            <Modal visible={uploadExhibitionModalVisibility}>
                <View className="flex items-center justify-center h-full w-full">
                    <Text className="text-black text-4xl">Enter Password</Text>
                    <TextInput placeholder='' value={passwordEntryText} onChangeText={setPasswordEntryText} className="text-2xl text-black border-2 p-2 w-64 bg-gray-200 mb-2"/>
                    <TouchableOpacity className="border-2 p-4 rounded-md bg-blue-400 w-40 items-center mb-4" onPress={uploadExhibitionPasswordCheckHandler}>
                        <Text className="text-white text-2xl">Enter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="border-2 p-4 rounded-md bg-red-400 w-40 items-center" onPress={exitPasswordForUploadExhibitionHandler}>
                        <Text className="text-white text-2xl">Exit</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <TouchableOpacity onPress={editIntiationHandler}>
                <View className="bg-blue-500 rounded-2xl items-center justify-center w-96 h-24 mb-8" >                
                    <Text className="text-4xl text-white">
                        Edit    
                    </Text>   
                </View>  
            </TouchableOpacity>                        
            <TouchableOpacity onPress={deleteIntiationHandler}>
                <View className="bg-purple-500 rounded-2xl items-center justify-center w-96 h-24 mb-8" >                
                    <Text className="text-4xl text-white">
                        Delete    
                    </Text>   
                </View>  
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteExhibitionIntiationHandler}>
                <View className="bg-pink-500 rounded-2xl items-center justify-center w-96 h-24 mb-8" >                
                    <Text className="text-4xl text-white">
                        Delete Exhibition    
                    </Text>   
                </View>  
            </TouchableOpacity>            
            <Modal visible={deleteModalVisibility}>
                <View className="flex items-center justify-center h-full w-full">
                    <Text className="text-black text-4xl">Enter Password</Text>
                    <TextInput placeholder='' value={passwordEntryText} onChangeText={setPasswordEntryText} className="text-2xl text-black border-2 p-2 w-64 bg-gray-200 mb-2"/>
                    <TouchableOpacity className="border-2 p-4 rounded-md bg-blue-400 w-40 items-center mb-4" onPress={deletePasswordCheckHandler}>
                        <Text className="text-white text-2xl">Enter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="border-2 p-4 rounded-md bg-red-400 w-40 items-center" onPress={exitPasswordForDeleteHandler}>
                        <Text className="text-white text-2xl">Exit</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal visible={deleteExhibitionModalVisibility}>
                <View className="flex items-center justify-center h-full w-full">
                    <Text className="text-black text-4xl">Enter Password</Text>
                    <TextInput placeholder='' value={passwordEntryText} onChangeText={setPasswordEntryText} className="text-2xl text-black border-2 p-2 w-64 bg-gray-200 mb-2"/>
                    <TouchableOpacity className="border-2 p-4 rounded-md bg-blue-400 w-40 items-center mb-4" onPress={deleteExhibitionPasswordCheckHandler}>
                        <Text className="text-white text-2xl">Enter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="border-2 p-4 rounded-md bg-red-400 w-40 items-center" onPress={exitPasswordForDeleteExhibitionHandler}>
                        <Text className="text-white text-2xl">Exit</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal visible={editModalVisibility}>
                <View className="flex items-center justify-center h-full w-full">
                    <Text className="text-black text-4xl">Enter Password</Text>
                    <TextInput placeholder='' value={passwordEntryText} onChangeText={setPasswordEntryText} className="text-2xl text-black border-2 p-2 w-64 bg-gray-200 mb-2"/>
                    <TouchableOpacity className="border-2 p-4 rounded-md bg-blue-400 w-40 items-center mb-4" onPress={editPasswordCheckHandler}>
                        <Text className="text-white text-2xl">Enter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="border-2 p-4 rounded-md bg-red-400 w-40 items-center" onPress={exitPasswordForEditHandler}>
                        <Text className="text-white text-2xl">Exit</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Text className="text-white text-5xl mb-8">
                Language
            </Text>
            <View className="mb-4" style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text className="text-white text-4xl mr-2">English</Text>
                <Checkbox
                value={radioEnglish}
                onValueChange={radioEnglishHandler}
                color={radioEnglish ? '#2196F3' : undefined}
                style={{ width: 40, height: 40 }}
                />
            </View>
            <View className="mb-8" style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text className="text-white text-4xl mr-2">French</Text>
                <Checkbox
                value={radioFrench}
                onValueChange={radioFrenchHandler}
                color={radioFrench ? '#2196F3' : undefined}
                style={{ width: 40, height: 40 }}
                />
            </View>
            <Text className="text-white text-5xl mb-8">
                Level
            </Text>
            <View className="mb-4" style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text className="text-white text-4xl mr-2">Regular</Text>
                <Checkbox
                value={radioRegular}
                onValueChange={radioRegularHandler}
                color={radioRegular ? '#2196F3' : undefined}
                style={{ width: 40, height: 40 }}
                />
            </View>
            <View className="mb-8" style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text className="text-white text-4xl mr-2">Basic</Text>
                <Checkbox
                value={radioBasic}
                onValueChange={radioBasicHandler}
                color={radioBasic ? '#2196F3' : undefined}
                style={{ width: 40, height: 40 }}
                />
            </View>
            <View className="mb-4" style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text className="text-white text-4xl mr-2">Advanced</Text>
                <Checkbox
                value={radioAdvanced}
                onValueChange={radioAdvancedHandler}
                color={radioAdvanced ? '#2196F3' : undefined}
                style={{ width: 40, height: 40 }}
                />
            </View>            
            <TouchableOpacity onPress={changePasswordIntiationHandler}>
                <View className="bg-orange-500 rounded-2xl items-center justify-center w-96 h-24 mb-8" >                
                    <Text className="text-4xl text-white">
                        Change Password    
                    </Text>   
                </View>  
            </TouchableOpacity>
            <Modal visible={changePasswordModalVisibility}>
                <View className="flex items-center justify-center h-full w-full">
                    <Text className="text-black text-4xl">Enter Password</Text>
                    <TextInput placeholder='' value={passwordEntryText} onChangeText={setPasswordEntryText} className="text-2xl text-black border-2 p-2 w-64 bg-gray-200 mb-2"/>
                    <TouchableOpacity className="border-2 p-4 rounded-md bg-blue-400 w-40 items-center mb-4" onPress={changePasswordPasswordCheckHandler}>
                        <Text className="text-white text-2xl">Enter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="border-2 p-4 rounded-md bg-red-400 w-40 items-center" onPress={exitPasswordForChangePasswordHandler}>
                        <Text className="text-white text-2xl">Exit</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </ScrollView>
    )
}

export default Settings;

const styles = StyleSheet.create({});