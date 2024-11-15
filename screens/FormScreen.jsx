import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import Button from "../components/buttons/Button";
import { H2, H5 } from "../components/text";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import SearchableDropdown from "../components/SearchableDropdown";
import { styles } from "../styles";
import { spacing, typography } from "../styles";

const FormScreen = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [model, setModel] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [remarks, setRemarks] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleSubmit = () => {
    console.log("Form Submitted:", {
      selectedItem,
      model,
      quantity,
      price,
      remarks,
      selectedOption,
    });
  };

  return (
    <ContainerComponent>
      <ScrollView>
        <MyHeader title="Add Item Details" isBack={true} hasIcon={true} />

        {/* <View style={{ paddingHorizontal: 12 }}>
          <H5>Search Item</H5>
        </View> */}

        {/* <View
          style={{
            borderWidth: 1,
            borderColor: "#020409",
            backgroundColor: "#f9f9f9",
            paddingHorizontal: 2,
            borderRadius: 5,
          }}
        >
          <SearchableDropdown onItemSelect={(item) => setSelectedItem(item)} />
        </View> */}

        <View style={{ paddingHorizontal: 12 }}>
          <MyTextInput
            title="Make/Specifications"
            placeholder="Make Specifications"
            value={model}
            onChangeText={setModel}
          />
        </View>

        <View style={{ paddingHorizontal: 12 }}>
          <MyTextInput
            title="Model"
            placeholder="Enter Model"
            value={model}
            onChangeText={setModel}
          />
        </View>

        <View style={{ paddingHorizontal: 12 }}>
          <MyTextInput
            title="Quantity"
            placeholder="Enter Quantity"
            type="numeric"
            value={quantity}
            onChangeText={setQuantity}
          />
        </View>

        <View style={{ paddingHorizontal: 12 }}>
          <MyTextInput
            title="Tentative Price"
            placeholder="Enter Tentative Price"
            type="numeric"
            value={price}
            onChangeText={setPrice}
          />
        </View>
        <View style={{ paddingHorizontal: 12 }}>
          <MyTextInput
            title="Remarks"
            placeholder="Enter Remarks"
            value={remarks}
            onChangeText={setRemarks}
            multiline={true}
            style={[
              styles.textInputField,
              {
                height: 120,
                textAlignVertical: "top",
              },
            ]}
          />
        </View>

        <Button
          style={[
            styles.btn,
            styles.bgPrimary,
            { justifyContent: "center", marginHorizontal: 12 },
          ]}
          onPress={handleSubmit}
        >
          <H2 style={[styles.btnText, styles.textLarge, typography.textLight]}>
            Submit
          </H2>
        </Button>
      </ScrollView>
    </ContainerComponent>
  );
};

export default FormScreen;
