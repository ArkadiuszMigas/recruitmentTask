import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

interface SortModalProps {
  visible: boolean;
  selectedSort: string;
  onSelectSort: (sortType: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}

const SortModal = ({
  visible,
  selectedSort,
  onSelectSort,
  onClose,
  onConfirm,
}: SortModalProps) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/70 justify-center items-center">
        <View className="w-[320] h-[400] bg-primary rounded-2xl p-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-lg font-bold mb-6">
              Sort records by:
            </Text>
          </View>
          <View className="flex-1">
            {["latest", "oldest", "popular"].map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => {
                  console.log(selectedSort);
                  onSelectSort(option);
                }}
                className="flex-row items-center mb-8"
              >
                <View className="w-6 h-6 rounded-full border-2 border-white justify-center items-center mr-4">
                  {selectedSort === option && (
                    <View className="w-3.5 h-3.5 rounded-full bg-secondary" />
                  )}
                </View>
                <Text className="text-white text-sm font-regular">
                  {option === "latest" && "Upload date: latest"}
                  {option === "oldest" && "Upload date: oldest"}
                  {option === "popular" && "Most popular"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View className="flex-row justify-center items-center mt-6">
            <TouchableOpacity 
              onPress={onConfirm}
              className="bg-[#2b2d42] rounded-lg py-3 mt-4 items-center w-full"
            >
              <Text className="text-white font-semibold">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SortModal;
