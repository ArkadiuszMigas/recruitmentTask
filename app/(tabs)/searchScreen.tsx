import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  FlatList,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { fetchVideos } from "@/services/youtubeApi";
import SearchIcon from "@/assets/icons/search-icon-black.svg";
import { useVideoStore } from "@/stores/videoStorage";

const SearchScreen = () => {
  const { q } = useLocalSearchParams();
  const [query, setQuery] = useState(String(q || ""));
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchVideos = async (value: string) => {
    if (!value.trim()) return;
    setLoading(true);
    const results = await fetchVideos(value, 50);
    setVideos(results);
    setLoading(false);
  };

  useEffect(() => {
    searchVideos(query);
  }, []);

  const handleSubmit = () => {
    searchVideos(query);
  };

  const renderItem = ({ item }: { item: any }) => {
    const { title, thumbnails, publishedAt, channelTitle, description } =
      item.snippet;

    return (
      <TouchableOpacity
        onPress={() => {
          useVideoStore.getState().setSelectedVideo(item);
          router.push("/screens/detailsScreen");
        }}
      >
        <View className="mb-6">
          <Image
            source={{ uri: thumbnails.high.url }}
            className="w-full h-48 rounded-xl"
            resizeMode="cover"
          />
          <Text className="text-[13px] text-gray-500 mt-2 font-bold">
            {channelTitle}
          </Text>
          <Text
            numberOfLines={2}
            className="text-base font-semibold text-black mt-1"
          >
            {title}
          </Text>
          <Text numberOfLines={2} className="text-gray-600 text-sm mt-1">
            {description}
          </Text>
          <Text className="text-gray-400 text-xs mt-1">
            {new Date(publishedAt).toLocaleDateString()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6 pt-6">
      <View className="flex-row items-center border border-[#2b2d42] rounded-full mx-4 px-4 py-3 mb-4">
        <SearchIcon width={20} height={20} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSubmit}
          placeholder="Search videos"
          placeholderTextColor="#999"
          className="flex-1 px-2 text-[16px]"
        />
      </View>

      <View className="flex-row justify-between items-center mb-4 mx-4">
        <Text className="text-sm text-gray-500">
          {videos.length} results found for:{" "}
          <Text className="font-bold text-black">"{query}"</Text>
        </Text>
      </View>

      <View className="flex-row justify-end items-center mb-4 mx-4">
        <TouchableOpacity>
          <Text className="text-text text-sm font-semibold">
            Sort by: Most popular
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2b2d42" className="mt-20" />
      ) : (
        <FlatList
          data={videos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.videoId || item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
          className="px-4"
        />
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
