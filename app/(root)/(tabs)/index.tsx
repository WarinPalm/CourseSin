import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text className="bg-font-bold my-10 font-rubik text-3xl">Home</Text>
      <Link href="/sign-in">Sign In</Link>
      <Link href="/search">search</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/properties/1">Sign In</Link>
    </View>
  );
}
