import { Stack } from "expo-router";
import './global.css';
import CourseDetail from "./screens/courseDetail";
import ViewAll from "./screens/viewAll";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />

    </Stack>
  );
}