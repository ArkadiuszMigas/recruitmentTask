import { View, Text, Image } from "react-native";
import React from "react";

const videoCard = ({ data }: { data: any }) => {
  const { title, thumbnails, publishedAt } = data.snippet;
  return (
    <View className="w-60 mr-4">
      <Image
        source={{ uri: thumbnails.medium.url }}
        className="w-full h-32 rounded-xl"
        resizeMode="cover"
      />
      <Text numberOfLines={2} className="text-gray-700 text-sm">
        {title}
      </Text>
      <View className="flex-row justify-end items-center mt-1 w-full">
        <Text className="text-gray-400 text-xs mt-1">
          {new Date(publishedAt).toLocaleDateString("pl-PL")}
        </Text>
      </View>
    </View>
  );
};

export default videoCard;
