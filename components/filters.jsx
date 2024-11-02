import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import SearchBar from "./input/SearchBar";

const Filter = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <SearchBar
        placeholder="Search transactions"
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Filter Options */}
      <View style={styles.filtersContainer}>
        <TouchableOpacity style={styles.filterIcon}>
          <Icon name="tune" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={"status"}
            onValueChange={(itemValue) => console.log(itemValue)}
          >
            <Picker.Item label="Status" value="status" />
            <Picker.Item label="Completed" value="completed" />
            <Picker.Item label="Pending" value="pending" />
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={"paymentMethod"}
            onValueChange={(itemValue) => console.log(itemValue)}
          >
            <Picker.Item label="Payment method" value="paymentMethod" />
            <Picker.Item label="Credit Card" value="creditCard" />
            <Picker.Item label="PayPal" value="paypal" />
          </Picker>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  filtersContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 60,
  },
  filterIcon: {
    marginRight: 8,
  },
  pickerContainer: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f1f1f1",
  },
  picker: {
    width: "100%",
    color: "#000",
  },
});

export default Filter;
