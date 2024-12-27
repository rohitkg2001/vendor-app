import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import DashboardScreen from "../screens/DashboardScreen";
import SettingsScreen from "../screens/SettingScreen";
import TasksScreen from "../screens/TasksScreen";
import {
  INFO_COLOR,
  LIGHT,
  PRIMARY_COLOR,
  ICON_MEDIUM,
} from "../styles/constant";

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
            <Icon name="desktop-outline" size={ICON_MEDIUM} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="tasksScreen"
        component={TasksScreen}
        options={{
          tabBarLabel: "Tasks",
          tabBarIcon: ({ color }) => (
            <Icon name="grid-outline" size={ICON_MEDIUM} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Me",
          tabBarIcon: ({ color }) => (
            <Icon name="person-outline" size={ICON_MEDIUM} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
