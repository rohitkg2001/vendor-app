import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import Ionicons
import { spacing, SCREEN_WIDTH } from "../styles";

const SuccessScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.goBack();
    }, 5000);
  }, [navigation]);

  return (
    <View
      style={{
        ...spacing.mh3,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        width: SCREEN_WIDTH - 16,
        paddingVertical: 20,
      }}
    >
      <Ionicons
        name="checkmark-sharp"
        size={100}
        color="green"
        style={{ marginBottom: 20 }}
      />
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Task update has been successfully saved.
      </Text>
    </View>
  );
};

export default SuccessScreen;
