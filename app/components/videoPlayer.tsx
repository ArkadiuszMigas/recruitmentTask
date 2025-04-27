import { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, Text, Pressable } from "react-native";
import Video, { VideoRef } from "react-native-video";
import { useNavigation } from "@react-navigation/native";
import AirPlay from "@/assets/icons/airplay-icon-white.svg";
import Backward from "@/assets/icons/backward-icon-white.svg";
import Forward from "@/assets/icons/forward-icon-white.svg";
import Pause from "@/assets/icons/pause-icon.svg";
import Play from "@/assets/icons/play-icon-white.svg";
import FullScreen from "@/assets/icons/fullscreen-icon-white.svg";
import Back from "@/assets/icons/leftarrow-icon-white.svg";
import Sound from "@/assets/icons/volume-icon-white.svg";
interface VideoPlayerProps {
  file: any;
}

const VideoPlayer = ({ file }: VideoPlayerProps) => {
  const navigation = useNavigation();
  const videoRef = useRef<VideoRef>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const hideControls = () => {
    setTimeout(() => setShowControls(false), 3000);
  };

  const toggleControls = () => {
    setShowControls(true);
    hideControls();
  };

  useEffect(() => {
    hideControls();
  }, []);

  const handleProgress = (data: any) => {
    setCurrentTime(data.currentTime);
  };

  const handleLoad = (data: any) => {
    setDuration(data.duration);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? `0${secs}` : secs}`;
  };
  return (
    <Pressable
      style={{ width: "100%", height: 220, backgroundColor: "black" }}
      onPress={toggleControls}
    >
      <Video
        source={file}
        ref={videoRef}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
        muted={isMuted}
        paused={!isPlaying}
        onProgress={handleProgress}
        onLoad={handleLoad}
      />

      {showControls && (
        <View className="absolute bottom-0 left-0 right-0 p-4 bg-white/70 flex-1 h-full items-center justify-center">
          <View className="flex-row items-center justify-between w-full h-[25%] mb-2">
            <View className="flex-row items-center justify-start w-[50%]">
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="bg-gray-500/50 p-2 rounded-full"
              >
                <Back className="w-6 h-6 text-white" />
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center justify-end w-[50%]">
              <TouchableOpacity
                onPress={() => {videoRef.current?.setVolume(isMuted ? 1 : 0); setIsMuted(!isMuted);}}
                className="bg-gray-500/50 p-2 rounded-full mr-2"
              >
                {isMuted ? (
                  <Sound className="w-6 h-6 text-white" />
                ) : (
                  <Sound className="w-6 h-6 text-white" /> //W projekcie nie ma ikony wyciszenia do pobrania :(
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                className="bg-gray-500/50 p-2 rounded-full"
              >
                <AirPlay className="w-6 h-6 text-white" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row items-center justify-center w-full h-[50%] mb-2">
            <TouchableOpacity
              onPress={() => videoRef.current?.seek(currentTime - 10)}
              className="bg-gray-500/50 p-2 rounded-full justify-center items-center"
            >
              <Backward className="w-6 h-6 text-white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {isPlaying ? videoRef.current?.pause() : videoRef.current?.resume(); setIsPlaying(!isPlaying);}}
              className="bg-gray-500/50 p-2 rounded-full mx-12 w-14 h-14 items-center justify-center"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => videoRef.current?.seek(currentTime + 10)}
              className="bg-gray-500/50 p-2 rounded-full justify-center items-center"
            >
              <Forward className="w-6 h-6 text-white" />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center justify-between w-full h-[25%] mb-2">
            <View className="flex-row items-end justify-start w-[50%]">
              <Text className="text-white">{formatTime(currentTime)} / </Text>
              <Text className="text-white">{formatTime(duration)}</Text>
            </View>
            <View className="flex-row items-center justify-end w-[50%]">
              <TouchableOpacity onPress={() => {
                videoRef.current?.presentFullscreenPlayer();
              }}>
                <FullScreen className="w-6 h-6 text-white" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300">
            <View
              style={{
                width: `${(currentTime / duration) * 100}%`,
                backgroundColor: "rgba(199, 31,31, 1)",
              }}
              className="h-full"
            ></View>
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default VideoPlayer;
