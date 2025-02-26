import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, Slot } from 'expo-router'

export default function AppLayout(){
    const loading = false;
    const isLoggedIn = false; //true - login แล้ว, false - ยังไม่ login
    if(loading){
        return(
            <SafeAreaView className="bgwhite h-full flex justify-center items-center">
                <ActivityIndicator className="text-purple-500" size="large"/>
            </SafeAreaView>
        )
    }
    if(!isLoggedIn) return <Redirect href="/sign-in"/>
    return <Slot/>
    
}