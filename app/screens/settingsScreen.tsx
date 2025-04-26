import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Platform,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Arrow from "@/assets/icons/leftarrow-icon.svg";
import PersonIcon from "@/assets/icons/person-icon-white.svg";
import NotificationIcon from "@/assets/icons/notification-icon.svg";
import ClockIcon from "@/assets/icons/clock-icon.svg";
import { useRouter } from "expo-router";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNotificationStore } from "@/stores/notificationStore";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const SettingsScreen = () => {
  const router = useRouter();
  const { enabled, time, setEnabled, setTime } = useNotificationStore();
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (token) => token && setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification Received:", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification Response Received:", response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  useEffect(() => {
    if (enabled) {
      scheduleDailyNotification(time);
    } else {
      Notifications.cancelAllScheduledNotificationsAsync();
    }
  }, [enabled, time]);

  const scheduleDailyNotification = async (selectedTime: Date) => {
    if (!Device.isDevice) {
      alert("Must use physical device for notifications");
      return;
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Notification permission not granted!");
      return;
    }

    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Przypomnienie o nauce",
        body: "Nie zapomnij się dzisiaj pouczyć!",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: selectedTime.getHours(),
        minute: selectedTime.getMinutes(),
      },
    });
  };

  const onTimeChange = (_event: any, selectedDate?: Date) => {
    setShowTimePicker(false);
    if (selectedDate) {
      setTime(selectedDate);
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-start bg-white">
      <View className="flex-row items-start justify-start w-full p-4">
        <Arrow onPress={() => router.back()} />
        <Text className="text-2xl font-bold text-text ml-4">Settings</Text>
      </View>

      <View className="flex-row items-center justify-center w-full p-12 border-b-2 border-[#2b2d42]">
        <View className="w-12 h-12 bg-secondary rounded-full items-center justify-center px-2 py-2">
          <PersonIcon className="w-4 h-4" />
        </View>
        <Text className="ml-2 font-semibold">John Doe</Text>
      </View>

      <View className="flex-1 items-center justify-start w-full px-4">
        <View className="flex-row items-center justify-start w-full p-4">
          <NotificationIcon width={36} height={36} />
          <Text className="text-sm font-regular ml-2">Learning reminders</Text>
        </View>

        <View className="flex-row items-center justify-between w-full p-4">
          <>
            <Text className="ml-2 text-sm font-regular">
              Repeat everyday at:
            </Text>

            <TouchableOpacity
              className="flex-row items-center my-2"
              onPress={() => setShowTimePicker(true)}
            >
              <ClockIcon width={20} height={20} />
              <Text className="ml-2 text-sm font-regular">
                {time.getHours().toString().padStart(2, "0")}:
                {time.getMinutes().toString().padStart(2, "0")}
              </Text>
            </TouchableOpacity>

            <Switch
              value={enabled}
              onValueChange={setEnabled}
              trackColor={{ false: "#ccc", true: "#2b2d42" }}
              thumbColor="#fff"
              style={{ scaleX: 1.2, scaleY: 1.2 }}
            />

            {showTimePicker && (
              <DateTimePicker
                mode="time"
                value={time}
                is24Hour={true}
                onChange={onTimeChange}
              />
            )}
          </>
        </View>

        <View className="flex-row items-center justify-start w-full p-4">
          <Text className="text-xs font-semiBold ml-2">
            You will receive friendly reminder to remember to study
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}
