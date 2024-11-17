import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import ProfileCard from "../components/ProfileCard";
import MenuItem from "../components/MenuItem";
import ContainerComponent from "../components/ContainerComponent";
import { H5 } from "../components/text";
import { DANGER_COLOR } from "../styles/constant";
import { staff } from "../utils/faker";
import { Button } from "../components/buttons/Button"
import { menuItems } from "../utils/faker";

export default function SettingsScreen() {
  const navigation = useNavigation();

  const handleLogoutPress = () => {
    console.log("Logout pressed");
    navigation.navigate("loginScreen");
  };
  
  return (
    <ContainerComponent justifyContent="space-between">
      <ProfileCard
        imageUri={staff.image}
        name={`${staff.first_name} ${staff.last_name}`}
        phoneNumber={staff.phone}
        onPress={() => navigation.navigate("profileScreen")}
      />
      <View style={{ flex: 1 }}>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            label={item.label}
            icon={item.icon}
           onPress={() => navigation.navigate(item.page)}
          />
        ))}
      </View>

      <Button
        style={{
          marginBottom: 8,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={handleLogoutPress}
      >
        <Icon name="power-outline" size={24} color={DANGER_COLOR} />
        <H5 style={{ color: DANGER_COLOR }}>Logout</H5>
      </Button>
    </ContainerComponent>
  );
}
