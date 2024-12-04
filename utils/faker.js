import { Alert } from "react-native";

export const alertMessage = ({
  title,
  message,
  negativeTextClick = null,
  positiveText,
  positiveTextClick = null,
}) => {
  Alert.alert(title, message, [
    { text: "Cancel", style: "cancel", onPress: negativeTextClick },
    { text: positiveText, onPress: positiveTextClick },
  ]);
};

export const earnings = [
  {
    id: 1,
    projectName: "Solar Lighting Installation for Homes",
    totalEarnings: 12034,
    completionDate: "2023-10-10",
  },
  {
    id: 2,
    projectName: "Community Solar Street Lights Project",
    totalEarnings: 8500.0,
    completionDate: "2023-09-15",
  },
];

export const menuItems = [
  { label: "my_projects", icon: "grid-outline", page: "projectsScreen", id: 0 },
  { label: "my_tasks", page: "taskScreen", icon: "grid-outline", id: 1 },
  {
    label: "inventory_title",
    icon: "cart-outline",
    page: "inventoryScreen",
    id: 2,
  },
  { label: "reports", page: "reportScreen", icon: "pie-chart-outline", id: 3 },
  {
    label: "settings",
    page: "",
    icon: "cog-outline",
    page: "internalSetting",
    id: 4,
  },
];

export const internal = [
  // {
  //   label: "notification_title",
  //   page: "notificationScreen",
  //   icon: "notifications-outline",
  // },
  {
    label: "privacy_policy_title",
    page: "privacyPolicy",
    icon: "shield-checkmark-outline",
  },
  // { label: "Data Usage", page: "", icon: "folder-outline" },
];

// export const notifications = [
//   {
//     id: "1",
//     title: "You updated your profile picture",
//     description: "You just updated your profile picture.",
//     icon: "account",
//     time: "Just Now",
//   },
//   {
//     id: "2",
//     title: "Password Changed",
//     description: "You’ve completed changing the password.",
//     icon: "lock-reset",
//     time: "2 oct,22:22 Pm",
//   },
//   {
//     id: "3",
//     title: "Subham Applied for Leave",
//     description: "Please accept my leave request.",
//     icon: "account-circle",
//     time: "23 sept",
//   },
//   {
//     id: "4",
//     title: "System Update",
//     description: "Please update to the newest app for a better experience.",
//     icon: "cellphone-information",
//     time: "25 sept,21:22 Pm",
//   },
// ];

export const PRIVACY_POLICY =
  "At Dashandots Technology, we deeply value your privacy and are committed to safeguarding the personal information you share with us.We collect essential personal information, including but not limited to your name, email address, and contact details, to ensure the efficient delivery of our services, enhance user experience, and better understand your needs.We assure you that we do not sell,";

// statuscode=0->open,
//statuscode = 1 -> completed,
//statuscode = 2 -> hold

export const documentData = [
  {
    id: "1",
    staffId: 1,
    documentName: "Aadhar Card",
    documentImage:
      "https://static.dexform.com/media/docs/6915/sample-job-offer-letter_1.png",
  },
  {
    id: "2",
    staffId: 1,
    documentName: "Pan Card",
    documentImage:
      "https://static.dexform.com/media/docs/6915/sample-job-offer-letter_1.png",
  },
  {
    id: "3",
    staffId: 1,
    documentName: "Gst Letter",
    documentImage:
      "https://static.dexform.com/media/docs/6915/sample-job-offer-letter_1.png",
  },
  {
    id: "4",
    staffId: 1,
    documentName: "Agreement",
    documentImage:
      "https://static.dexform.com/media/docs/6915/sample-job-offer-letter_1.png",
  },
];

export const PageData = [
  {
    description:
      "Streamline Your Projects with Sugs Lloyd – Efficiency at Its Best!",
  },

  {
    id: 1,
    text: "Manage & Track Projects Anytime, Anywhere!",
  },
  {
    id: 2,
    text: "Stay Updated – Receive Tasks & Progress Instantly!",
  },
  {
    id: 3,
    text: "Share Work Details with Real-Time Location & Visuals!",
  },
  {
    id: 4,
    text: "Keep a Sharp Eye on Your Stock Levels with Ease!",
  },
];
