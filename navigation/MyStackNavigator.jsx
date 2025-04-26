import MyMaterialBottomNavigator from "./MyMaterialBottomNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import DashboardScreen from "../screens/DashboardScreen";
import NotificationScreen from "../screens/NotificationScreen";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingScreen";
import InternalSetting from "../screens/InternalSetting";
import InventoryScreen from "../screens/InventoryScreen";
import SiteScreen from "../screens/SiteScreen";
import TasksScreen from "../screens/TasksScreen";
import ReportScreen from "../screens/ReportScreen";
import SiteDetailScreen from "../screens/SiteDetailScreen";
import InventoryDetailsScreen from "../screens/InventoryDetailsScreen";
import SurveyScreen from "../screens/SurveyScreen";
import SuccessScreen from "../screens/SuccessScreen";
import CardScreen from "../screens/CardScreen";
import welcomeScreen from "../screens/welcomeScreen";

import StreetLightPendingTask from "../screens/StreetLightPendingTask";
import TaskDetailScreen from "../screens/TaskDetailScreen";
import ProfileChangeScreen from "../screens/ProfileChangeScreen";
import StartInstallationScreen from "../screens/StartInstallationScreen";
import StreetLightDetailsScreen from "../screens/StreetLightDetailsScreen";
import SubmitInstallationScreen from "../screens/SubmitInstallationScreen";
import InventoryMaterialScreen from "../screens/InventoryMaterialScreen";
import ApprovedTaskScreen from "../screens/ApprovedTaskScreen";

const Stack = createNativeStackNavigator();

export default function MyStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="cardScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="loginScreen" component={LoginScreen} />
      <Stack.Screen name="dashboardScreen" component={DashboardScreen} />
      <Stack.Screen name="homeScreen" component={MyMaterialBottomNavigator} />
      <Stack.Screen name="notificationScreen" component={NotificationScreen} />
      <Stack.Screen name="privacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="profileScreen" component={ProfileScreen} />
      <Stack.Screen name="settings" component={SettingsScreen} />
      <Stack.Screen name="internalSetting" component={InternalSetting} />
      <Stack.Screen name="inventoryScreen" component={InventoryScreen} />
      <Stack.Screen name="siteScreen" component={SiteScreen} />
      <Stack.Screen name="taskScreen" component={TasksScreen} />

      <Stack.Screen name="reportScreen" component={ReportScreen} />
      <Stack.Screen name="siteDetailsScreen" component={SiteDetailScreen} />
      <Stack.Screen
        name="inventoryDetailsScreen"
        component={InventoryDetailsScreen}
      />
      <Stack.Screen name="surveyScreen" component={SurveyScreen} />
      <Stack.Screen name="successScreen" component={SuccessScreen} />
      <Stack.Screen name="cardScreen" component={CardScreen} />
      <Stack.Screen
        name="startInstallation"
        component={StartInstallationScreen}
      />
      <Stack.Screen name="welcomeScreen" component={welcomeScreen} />
      <Stack.Screen
        name="streetLightPendingTask"
        component={StreetLightPendingTask}
      />
      <Stack.Screen name="taskDetail" component={TaskDetailScreen} />
      <Stack.Screen name="profileChange" component={ProfileChangeScreen} />
      <Stack.Screen
        name="streetlightDetails"
        component={StreetLightDetailsScreen}
      />
      <Stack.Screen
        name="submitInstallation"
        component={SubmitInstallationScreen}
      />
      <Stack.Screen
        name="inventoryMaterialScreen"
        component={InventoryMaterialScreen}
      />
      <Stack.Screen name="approvedTaskScreen" component={ApprovedTaskScreen} />
    </Stack.Navigator>
  );
}
