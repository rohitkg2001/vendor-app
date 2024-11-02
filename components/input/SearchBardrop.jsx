import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ContainerComponent from "../ContainerComponent";

const SearchBardrop = ({
  placeholder,
  onBackPress,
  onMorePress,
  onChangeText,
}) => {
  return (
    <ContainerComponent>
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={onBackPress}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <TextInput
          style={styles.searchInput}
          placeholder={placeholder || "Search"}
          placeholderTextColor="#999"
          onChangeText={onChangeText}
        />

        <TouchableOpacity onPress={onMorePress}>
          <Icon name="more-vert" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 16,
    color: "#000",
  },
});

export default SearchBardrop;
