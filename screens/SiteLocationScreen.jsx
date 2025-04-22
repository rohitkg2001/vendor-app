import { useState } from "react";
import { View } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { H1 } from "../components/text";
import MyPickerInput from "../components/input/MyPickerInput";
import MyButton from "../components/buttons/MyButton";
import { panchayats, wards } from "../utils/faker";
import { SCREEN_WIDTH, spacing } from "../styles";
import { useDispatch } from "react-redux";
import { setSiteInfo } from "../redux/actions/siteActions";

export default function SetSiteLocationScreen({ navigation }) {
  const [selectedPanchayat, setSelectedPanchayat] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const dispatch = useDispatch();

  const getPanchayatOptions = () => {
    return panchayats["Patna"] || [];
  };

  const getWardOptions = () => {
    return selectedPanchayat ? wards["Patna"] || [] : [];
  };

  const getSiteInfo = () => {
    const siteInfo = "FAT/WAR";
    dispatch(setSiteInfo(siteInfo));
    navigation.navigate("startInstallation");
  };

  return (
    <ContainerComponent>
      <MyHeader isBack title={"Set Site Location "} hasIcon />
      <H1>{"Bihar"}</H1>
      <View style={{ flex: 1, width: SCREEN_WIDTH - 16 }}>
        <MyPickerInput
          title="Panchayat"
          value={selectedPanchayat}
          onChange={(value) => setSelectedPanchayat(value)}
          options={getPanchayatOptions()}
          style={spacing.mv2}
        />
        <MyPickerInput
          title="Ward"
          value={selectedWard}
          onChange={(value) => setSelectedWard(value)}
          options={getWardOptions()}
          style={spacing.mv2}
        />
      </View>
      <MyButton title="Next" onPress={getSiteInfo} />
    </ContainerComponent>
  );
}
