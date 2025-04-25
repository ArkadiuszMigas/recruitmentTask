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
    <View className="flex-1 font-regular">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="(tabs)"
        />
        <Stack.Screen
          name="screens/authScreen"
        />
      </Stack>
    </View>
  );
}
