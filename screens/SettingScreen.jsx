import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import ProfileCard from "../components/ProfileCard";
import MenuItem from "../components/MenuItem";
import ContainerComponent from "../components/ContainerComponent";
import { H5 } from "../components/text";
import { DANGER_COLOR } from "../styles/constant";
import { projects, vendor } from "../utils/faker";
import Button from "../components/buttons/Button";
import { menuItems } from "../utils/faker";
import { layouts, spacing, ICON_SMALL } from "../styles";

export default function SettingsScreen() {
  const navigation = useNavigation();

  const handleLogoutPress = () => {
    navigation.navigate("loginScreen");
  };

  return (
    <ContainerComponent justifyContent="space-between">
      <ProfileCard
        imageUri={vendor.image}
        name={`${vendor.first_name} ${vendor.last_name}`}
        phoneNumber={vendor.phone}
        onPress={() => navigation.navigate("profileScreen")}
      />
      <View style={{ flex: 1 }}>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            label={item.label}
            icon={item.icon}
            onPress={() => {
              item.id === 0
                ? navigation.navigate(item.page, {
                    DATA: projects,
                    title: item.label,
                  })
                : navigation.navigate(item.page);
            }}
          />
        ))}
      </View>

      <Button style={[spacing.mb2, layouts.center]} onPress={handleLogoutPress}>
        <Icon name="power-outline" size={ICON_SMALL} color={DANGER_COLOR} />
        <H5 style={{ color: DANGER_COLOR }}>Logout</H5>
      </Button>
    </ContainerComponent>
  );
}
