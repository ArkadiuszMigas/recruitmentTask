import {
  ScrollView,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import RowList from "@/app/components/rowList";
import SearchIcon from "@/assets/icons/search-icon-black.svg";
import SettingsIcon from "@/assets/icons/settings-icon.svg";

const categories = ["React Native", "React", "Typescript", "Javascript"];

const homeScreen = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!search.trim()) return;
    router.push({
      pathname: "/(tabs)/searchScreen",
      params: { q: search.trim() },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <ScrollView className="bg-white px-4 pt-6">
        <View className="flex-row items-center justify-center rounded-full p-2 mb-4">
          <View className="flex-row items-center border border-[#2b2d42] rounded-full w-[80%] px-4 py-3 mb-6">
            <SearchIcon width={20} height={20} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              onSubmitEditing={handleSearch}
              placeholder="Search videos"
              placeholderTextColor="#999"
              className="flex-1 px-2 text-[16px]"
            />
          </View>
          <View className=" rounded-full w-[20%] px-2 py-3 mb-6 items-center justify-center">
            <TouchableOpacity onPress={() => {}}>
              <SettingsIcon width={32} height={32} />
            </TouchableOpacity>
          </View>
        </View>

        {categories.map((cat) => (
          <RowList key={cat} query={cat} title={cat} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default homeScreen;
