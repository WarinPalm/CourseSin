import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, Slot, Stack } from 'expo-router';
import React, { useEffect } from "react";
import useStore from "./store/store";
import { currentUser } from "@/app/(root)/api/auth/auth";
import { useRouter, usePathname } from 'expo-router';

export default function RootLayout() {

    const user = useStore((state) => state.user);
    const token = useStore((state) => state.token);
    const pathname = usePathname();

    useEffect(() => {
        if (user && token) {
            currentUser(token).then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.error(err);
            });
        }
    }, [user, token]); 

    // ตรวจสอบว่าหน้า path เป็น register หรือไม่
    const isRegisterPage = pathname === '/auth/register';

   
    if ((!user || !token) && !isRegisterPage) {
        return <Redirect href="/sign-in" />;
    }
    
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            {/* <Slot /> */}
        </Stack>
    );
}
