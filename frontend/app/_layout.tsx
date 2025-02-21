import { Stack } from "expo-router";
import './global.css';
import React,{useState} from "react";


export default function RootLayout() {
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* {isLoggedIn ? (
        <Stack.Screen name="(tabs)"/>
      ) : (
        <Stack.Screen name="login"/>
        )} */}
        <Stack.Screen name="(tabs)"/>
    </Stack>
  );
}