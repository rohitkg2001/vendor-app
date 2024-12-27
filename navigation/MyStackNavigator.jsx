import MyMaterialBottomNavigator from "./MyMaterialBottomNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import DashboardScreen from "../screens/DashboardScreen";
import NotificationScreen from "../screens/NotificationScreen";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import TotalEarningScreen from "../screens/TotalEarningScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingScreen";
import InternalSetting from "../screens/InternalSetting";
import FileUploadScreen from "../screens/FileUploadScreen";
import InventoryScreen from "../screens/InventoryScreen";
import SiteScreen from "../screens/SiteScreen";
import ProjectsScreen from "../screens/ProjectsScreen";
import TasksScreen from "../screens/TasksScreen";
import ViewDetailScreen from "../screens/ViewDetailScreen";
import StockApprovalScreen from "../screens/StockApprovalScreen";
import ReportScreen from "../screens/ReportScreen";
import SiteDetailScreen from "../screens/SiteDetailScreen";
import InventoryDetailsScreen from "../screens/InventoryDetailsScreen";
import TaskDetailsScreen from "../screens/TaskDetailsScreen";

const Stack = createNativeStackNavigator();
export default function MyStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="loginScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="loginScreen" component={LoginScreen} />
      <Stack.Screen name="dashboardScreen" component={DashboardScreen} />
      <Stack.Screen name="homeScreen" component={MyMaterialBottomNavigator} />
      <Stack.Screen name="notificationScreen" component={NotificationScreen} />
      <Stack.Screen name="privacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="profileScreen" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="internalSetting" component={InternalSetting} />
      <Stack.Screen name="fileUploadScreen" component={FileUploadScreen} />
      <Stack.Screen name="inventoryScreen" component={InventoryScreen} />
      <Stack.Screen name="totalEarningScreen" component={TotalEarningScreen} />
      <Stack.Screen name="siteScreen" component={SiteScreen} />
      <Stack.Screen name="projectsScreen" component={ProjectsScreen} />
      <Stack.Screen name="taskScreen" component={TasksScreen} />
      <Stack.Screen name="viewDetailScreen" component={ViewDetailScreen} />
      <Stack.Screen
        name="stockApprovalScreen"
        component={StockApprovalScreen}
      />
      <Stack.Screen name="reportScreen" component={ReportScreen} />
      <Stack.Screen name="siteDetailsScreen" component={SiteDetailScreen} />
      <Stack.Screen
        name="inventoryDetailsScreen"
        component={InventoryDetailsScreen}
      />
      <Stack.Screen name="taskDetailsScreen" component={TaskDetailsScreen} />
    </Stack.Navigator>
  );
}
