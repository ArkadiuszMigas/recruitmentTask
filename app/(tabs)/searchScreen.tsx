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
import SortModal from "@/app/components/sortModal";
import { sortVideos } from "@/services/sortVideos";

const SearchScreen = () => {
  const { q } = useLocalSearchParams();
  const [query, setQuery] = useState(String(q || ""));
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState<string>("popular");

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
          <View className="flex-row justify-end items-center mt-1 w-full">
            <Text className="text-gray-400 text-xs mt-1">
              {new Date(publishedAt).toLocaleDateString("pl-PL")}
            </Text>
          </View>
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
        <Text className="text-sm text-gray-500 font-regular mr-2">
          {videos.length} results found for:
          <Text className="font-semiBold text-black">"{query}"</Text>
        </Text>
      </View>

      <View className="flex-row justify-end items-center mb-4 mx-4">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => {
            setIsSortModalVisible(true);
          }}
        >
          <Text className="text-text text-sm font-regular mr-2">Sort by:</Text>
          <Text className="text-text text-sm font-semibold">
            {selectedSort === "latest"
              ? "Upload date: latest"
              : selectedSort === "oldest"
              ? "Upload date: oldest"
              : "Most popular"}
          </Text>
        </TouchableOpacity>
      </View>
      <SortModal
        visible={isSortModalVisible}
        onClose={() => setIsSortModalVisible(false)}
        onSelectSort={(sortType) => setSelectedSort(sortType)}
        selectedSort={selectedSort}
        onConfirm={async () => {
          const sorted = await sortVideos(videos, selectedSort);
          setVideos(sorted);
          setIsSortModalVisible(false);
        }}
      />
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
