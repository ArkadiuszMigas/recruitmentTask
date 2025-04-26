import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import HomeFocused from "@/assets/icons/home-icon.svg";
import SearchFocused from "@/assets/icons/search-icon.svg";
import Home from "@/assets/icons/home-icon-white.svg";
import Search from "@/assets/icons/search-icon-white.svg";

const TabsIcon = ({ focused, icon: Icon, title }: any) => {
  return (
    <View className="flex-1 items-center justify-start">
      <Icon width={32} height={32} />
      <Text
        className={`text-base font-bold size-4 mt-1 h-full w-full ${
          focused ? "text-secondary" : "text-white"
        }`}
      >
        {title}
      </Text>
    </View>
  );
};

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: "#8c99af",
          borderTopWidth: 0,
          height: 100,
          zIndex: 100,
        },
      }}
    >
      <Tabs.Screen
        name="homeScreen"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <TabsIcon
              focused={focused}
              icon={focused ? HomeFocused : Home}
              title="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="searchScreen"
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ focused }) => (
            <TabsIcon
              focused={focused}
              icon={focused ? SearchFocused : Search}
              title="Search"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _Layout;
