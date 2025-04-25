import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { fetchVideos } from "@/services/youtubeApi";
import VideoCard from "./videoCard";
import { useRouter } from "expo-router";
import { useVideoStore } from '@/stores/videoStorage';

const rowList = ({ query, title }: { query: string; title: string }) => {
  const [videos, setVideos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchVideos(query, 10).then(setVideos);
  }, []);

  return (
    <View className="mb-6 border-t-2 border-[#2b2d42] pt-4 px-4">
      <View className="flex-row justify-between mb-2 items-center">
        <Text className="text-lg font-bold">{title}</Text>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(tabs)/searchScreen",
              params: { q: query },
            })
          }
        >
          <Text className="text-text text-sm underline">Show more</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {videos.map((v: any) => (
          <TouchableOpacity
            key={v.id.videoId}
            onPress={() => {
              useVideoStore.getState().setSelectedVideo(v);
              router.push("/screens/detailsScreen");
            }}
          >
            <VideoCard data={v} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default rowList;
