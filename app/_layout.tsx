import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import "./globals.css";
import { View } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins: require("@/assets/fonts/Poppins-Regular.ttf"),
    SemiBold: require("@/assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <View></View>;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}/>
  );
}
