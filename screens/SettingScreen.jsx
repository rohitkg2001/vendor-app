import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import ProfileCard from "../components/ProfileCard";
import MenuItem from "../components/MenuItem";
import ContainerComponent from "../components/ContainerComponent";
import { H5 } from "../components/text";
import Button from "../components/buttons/Button";
import { menuItems } from "../utils/faker";
import { useSelector, useDispatch } from "react-redux";
import { layouts, spacing, ICON_SMALL, DANGER_COLOR } from "../styles";
import { useEffect } from "react";
import { getAllProjects } from "../redux/actions/projectActions";
import { getAllItems } from "../redux/actions/inventoryActions";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { vendor } = useSelector((state) => state);

  const handleLogoutPress = () => {
    navigation.navigate("loginScreen");
  };

  useEffect(() => {
    // dispatch(getAllTasks());
    dispatch(getAllProjects());
    dispatch(getAllItems());
  }, []);

  return (
    <ContainerComponent justifyContent="space-between">
      <ProfileCard
        imageUri={vendor.image}
        name={`${vendor.firstName} ${vendor.lastName}`}
        contactNo={vendor.contactNo}
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
