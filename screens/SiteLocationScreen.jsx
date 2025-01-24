import React, { useState } from "react";
import { View } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { H1, H5 } from "../components/text";
import MyPickerInput from "../components/input/MyPickerInput";
import MyButton from "../components/buttons/MyButton";
import { blocks, panchayats, wards } from "../utils/faker";

const SetSiteLocationScreen = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedPanchayat, setSelectedPanchayat] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const getBlockOptions = () => {
    return selectedDistrict ? blocks[selectedDistrict] : [];
  };

  const getPanchayatOptions = () => {
    return selectedDistrict ? panchayats[selectedDistrict] : [];
  };

  const getWardOptions = () => {
    return selectedDistrict ? wards[selectedDistrict] : [];
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    setSelectedBlock("");
    setSelectedPanchayat("");
    setSelectedWard("");
  };

  const handleBlockChange = (value) => {
    setSelectedBlock(value);
  };

  const handlePanchayatChange = (value) => {
    setSelectedPanchayat(value);
  };

  const handleWardChange = (value) => {
    setSelectedWard(value);
  };

  return (
    <ContainerComponent>
      <MyHeader isBack title={"Set Site Location "} hasIcon />

      <H1>{"Bihar"}</H1>

      {/* Wrap everything inside a View container and add marginLeft */}
      <View style={{ marginLeft: -35 }}>
        {" "}
        {/* Adjust this value as needed */}
        <View style={{ marginBottom: 15 }}>
          <H5 style={{ marginBottom: -10 }}>{"District"}</H5>
          <MyPickerInput
            selectedValue={selectedDistrict}
            onChange={handleDistrictChange}
            options={[
              { label: "Patna", value: "district1" },
              { label: "Gaya", value: "district2" },
            ]}
          />
        </View>
        <View style={{ marginBottom: 15 }}>
          <H5 style={{ marginBottom: -10 }}>{"Block"}</H5>
          <MyPickerInput
            selectedValue={selectedBlock}
            onChange={handleBlockChange}
            options={getBlockOptions()}
          />
        </View>
        <View style={{ marginBottom: 15 }}>
          <H5 style={{ marginBottom: -10 }}>{"Panchayat"}</H5>
          <MyPickerInput
            selectedValue={selectedPanchayat}
            onChange={handlePanchayatChange}
            options={getPanchayatOptions()}
          />
        </View>
        <View style={{ marginBottom: 15 }}>
          <H5 style={{ marginBottom: -10 }}>{"Ward"}</H5>
          <MyPickerInput
            selectedValue={selectedWard}
            onChange={handleWardChange}
            options={getWardOptions()}
          />
        </View>
      </View>
      <View style={{ flex: 1 }} />
      <MyButton title="Next" />
    </ContainerComponent>
  );
};

export default SetSiteLocationScreen;
