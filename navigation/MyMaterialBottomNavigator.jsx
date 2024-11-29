import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import DashboardScreen from "../screens/DashboardScreen";
import SettingsScreen from "../screens/SettingScreen";
import CurrentProjectsScreen from "../screens/CurrentProjectsScreen";
<<<<<<< HEAD
import { INFO_COLOR, LIGHT, PRIMARY_COLOR } from "../styles/constant";
=======
import {
  INFO_COLOR,
  LIGHT,
  PRIMARY_COLOR,
  ICON_MEDIUM,
} from "../styles/constant";
>>>>>>> a85e4be1654a673a6c01d9c3c97de764acfbdfdc

const BottomTab = createMaterialBottomTabNavigator();
export default function MyMaterialBottomNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="dashboardScreen"
      activeColor={PRIMARY_COLOR}
      inactiveColor={INFO_COLOR}
      activeIndicatorStyle={{ backgroundColor: "transparent" }}
      barStyle={{
        backgroundColor: LIGHT,
        height: 70,
        borderTopWidth: 0.5,
        borderTopColor: "#6c6c6c",
      }}
    >
      <BottomTab.Screen
        name="dashboardScreen"
        component={DashboardScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
<<<<<<< HEAD
            <Icon name="desktop-outline" size={28} color={color} />
=======
            <Icon name="desktop-outline" size={ICON_MEDIUM} color={color} />
>>>>>>> a85e4be1654a673a6c01d9c3c97de764acfbdfdc
          ),
        }}
      />
      <BottomTab.Screen
        name="CurrentProjectScreen"
        component={CurrentProjectsScreen}
        options={{
          tabBarLabel: "Projects",
          tabBarIcon: ({ color }) => (
<<<<<<< HEAD
            <Icon name="grid-outline" size={28} color={color} />
=======
            <Icon name="grid-outline" size={ICON_MEDIUM} color={color} />
>>>>>>> a85e4be1654a673a6c01d9c3c97de764acfbdfdc
          ),
        }}
      />

      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Me",
          tabBarIcon: ({ color }) => (
<<<<<<< HEAD
            <Icon name="person-outline" size={28} color={color} />
=======
            <Icon name="person-outline" size={ICON_MEDIUM} color={color} />
>>>>>>> a85e4be1654a673a6c01d9c3c97de764acfbdfdc
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
