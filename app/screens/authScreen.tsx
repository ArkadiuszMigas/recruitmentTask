import { Pressable, Text, View, SafeAreaView } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";
import Logo from "@/assets/logo.svg";
import AppIcon from "@/assets/app-icon.svg";
const authScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-primary">
      <View className=" h-[20%] items-center justify-center">
        <Logo className="w-1/4 h-1/4" />
      </View>
      <View className=" h-[50%] items-center justify-center">
        <AppIcon className="w-1/4 h-1/4" />
      </View>
      <View className="h-[10%] items-center justify-center">
        <Text className="text-white text-2xl font-semibold text-left">
          Welcome to the best YouTube-based learning application.
        </Text>
      </View>
      <View className=" h-[10%] justify-center items-center w-full">
        <Pressable
          className="bg-secondary rounded-xl p-3 items-center justify-center w-[90%]"
          onPress={() => {
            router.replace("/homeScreen");
          }}
        >
          <Text className="text-white text-lg font-semiBold">
            Log in as guest
          </Text>
        </Pressable>
      </View>
      <View className="  h-[10%] items-center justify-center">
        <Text className="text-white text-lg text-center mb-1">
          By continuing you agree with
        </Text>
        <View className="flex-row flex-wrap justify-center items-center space-x-1">
          <Link href="/screens/terms-and-conditions">
            <Text className="text-secondary text-lg  underline">
              Terms and Conditions
            </Text>
          </Link>

          <Text className="text-white text-lg ml-2 mr-2">and</Text>

          <Link href="/screens/privacy-policy">
            <Text className="text-secondary text-lg underline">
              Privacy Policy
            </Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default authScreen;
