import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, Slot, Stack } from 'expo-router';
import React, { useEffect } from "react";
import useStore from "./store/store";
import { currentUser } from "./api/auth";

export default function RootLayout() {

    const user = useStore((state) => state.user);
    const token = useStore((state) => state.token);

    useEffect(() => {
        if (user && token) {
            currentUser(token).then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.error(err);
            });
        }
    }, [user, token]); 

    if (!user || !token) {
        return <Redirect href="/sign-in" />;
    }
    
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Slot />
        </Stack>
    );
}
