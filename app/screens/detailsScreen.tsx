import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Video, { VideoRef } from "react-native-video";
import { useVideoStore } from "@/stores/videoStorage";
import { useEffect, useRef, useState } from "react";
import PersonIcon from "@/assets/icons/person-icon-white.svg";
import ViewsIcon from "@/assets/icons/views-icon-white.svg";
import LikeIcon from "@/assets/icons/likes-icon-white.svg";
import { fetchVideoDetails } from "@/services/youtubeApi";

const DetailsScreen = () => {
  const video = useVideoStore((state) => state.selectedVideo);
  const [details, setDetails] = useState<any>(null);
  const videoRef = useRef<VideoRef>(null);
  const file = require("../../assets/video/broadchurch.mp4");

  const [activeTab, setActiveTab] = useState<"details" | "notes">("details");
  const { title, description, channelTitle } = details?.snippet || {};
  const {likeCount, viewCount} = details?.statistics || {};

  if (!video || !video.snippet) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text>No video data passed</Text>
      </SafeAreaView>
    );
  }

  useEffect(() => {
    //console.log("Video data:", video);
    fetchVideoDetails(video.id.videoId).then((data) => {
      //console.log("Video details:", data);
      setDetails(data);
    });
  }, []);

  return (
    <View className="flex-1 bg-white">
      <ScrollView>
        {/* Video */}
        <View className="w-full h-[40vh] bg-black">
          {/* <Video
            // Can be a URL or a local file.
            source={file}
            // Store reference
            ref={videoRef}
            onBuffer={(e) => console.log(e)}
            onError={(e) => console.log(e)}
            className="w-full h-[40vh]"
          /> */}
        </View>

        {/* Details */}
        <View className="px-4 mt-4">
          <Text className="text-lg font-bold text-black">{title}</Text>
          <View className="flex-row items-center mt-3 mb-4">
            <View className="w-12 h-12 bg-secondary rounded-full items-center justify-center px-2 py-2">
              <PersonIcon className="w-4 h-4" />
            </View>
            <Text className="ml-2 font-semibold">{channelTitle}</Text>
          </View>

          {/* Tab switcher */}
          <View className="flex-row items-center justify-evenly border-b border-gray-300 mb-4">
            <TouchableOpacity
              className={`pb-2 border-b-2 w-[50%] justify-center items-center ${
                activeTab === "details" ? "border-black" : "border-transparent"
              }`}
              onPress={() => setActiveTab("details")}
            >
              <Text
                className={`text-base font-semibold justify-center items-center ${
                  activeTab === "details" ? "text-black" : "text-gray-400"
                }`}
              >
                Details
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`pb-2 border-b-2 w-[50%] justify-center items-center ${
                activeTab === "notes" ? "border-black" : "border-transparent"
              }`}
              onPress={() => setActiveTab("notes")}
            >
              <Text
                className={`text-base font-semibold justify-center items-center ${
                  activeTab === "notes" ? "text-black" : "text-gray-400"
                }`}
              >
                Notes
              </Text>
            </TouchableOpacity>
          </View>

          {/* Content area */}
          {activeTab === "details" ? (
            <>
              {/* Description */}
              <Text className="text-sm font-semibold text-black mb-2">
                Description
              </Text>
              <Text className="text-sm text-gray-700 leading-5 mb-4">
                {description}
              </Text>

              {/* Statistics */}
              <Text className="text-sm font-semibold text-black mb-2">
                Statistics
              </Text>
              <View className="flex-row gap-4">
                <View className="flex-row items-center bg-[#2b2d42] px-4 py-2 rounded-lg">
                  <ViewsIcon />
                  <Text className="text-white text-sm font-semibold ml-2">
                    {parseInt(viewCount).toLocaleString()} views
                  </Text>
                </View>
                <View className="flex-row items-center bg-[#2b2d42] px-4 py-2 rounded-lg">
                  <LikeIcon />
                  <Text className="text-white text-sm font-semibold ml-2">
                    {parseInt(likeCount).toLocaleString()} likes
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <>
              {/* Notes tab content — can be editable later */}
              <Text className="text-sm text-gray-400">No notes yet...</Text>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;
