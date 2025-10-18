import { Pressable, StyleSheet, Text, TouchableOpacity, View, Alert, ImageBackground } from 'react-native';
import { Link, useLocalSearchParams, useRouter, usePathname  } from 'expo-router';
import "../global.css";
import { useGlobal } from '../contexts/GlobalContext';

function Item({image, title ,video}){

    const { items, setItems} = useGlobal();
    const { videoToBePlayed, setVideoToBePlayed } = useGlobal();
    const pathname = usePathname();
    const router = useRouter();

    function engageItemHandler(){
        setVideoToBePlayed(video);
        if(pathname==="/Exhibits"){
            router.push("/VideoPlayer");
        }
        if(pathname==="/Delete"){
            setItems(
                items.filter((it) => {
                    return (it.image!==image && it.title!==title && it.video!==video);
                })
            );
        }
    }

    return(
        <TouchableOpacity onPress={engageItemHandler}>
            <ImageBackground source={{uri: image}} className="w-48 h-48 rounded-3xl mb-4" resizeMode="cover" style={{ overflow: 'hidden' }}>
                <View className="w-full h-full rounded-2xl items-center justify-end">                
                    <Text className="text-white text-xl font-bold bg-black p-2 truncate max-w-84 max-h-10 w-full h-10">
                        {title}    
                    </Text>   
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default Item;

const styles = StyleSheet.create({});