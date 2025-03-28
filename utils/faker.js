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

export const Task = [
  {
    id: 1,
    task_name: "Solar Lighting Installation for Homes",
    activity: "Installation",
    location: "Bihar, Bhagalpur",
    start_date: "2024-10-12",
    end_date: "2024-29-12",
    priority: "High",
  },
  {
    id: 2,
    task_name: "Community Solar Street Lights Project",
    activity: "RMS",
    location: "Delhi, Gurugram",
    start_date: "2024-11-12",
    end_date: "2024-27-12",
    priority: "Medium",
  },
];

export const menuItems = [
  //{ label: "my_projects", icon: "grid-outline", page: "projectsScreen", id: 0 },
  { label: "My Sites", icon: "home-outline", page: "siteScreen" },
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

export const notifications = [
  {
    id: "1",
    title: "You updated your profile picture",
    description: "You just updated your profile picture.",
    icon: "account",
    time: "Just Now",
  },
  {
    id: "2",
    title: "Password Changed",
    description: "You’ve completed changing the password.",
    icon: "lock-reset",
    time: "2 oct,22:22 Pm",
  },
  {
    id: "3",
    title: "Subham Applied for Leave",
    description: "Please accept my leave request.",
    icon: "account-circle",
    time: "23 sept",
  },
  {
    id: "4",
    title: "System Update",
    description: "Please update to the newest app for a better experience.",
    icon: "cellphone-information",
    time: "25 sept,21:22 Pm",
  },
];

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

// faker.js

export { blocks, panchayats, wards };
const blocks = {
  Patna: [
    { label: "Patna Sadar", value: "Patna Sadar" },
    { label: "Danapur", value: "Danapur" },
    { label: "Phulwari Sharif", value: "Phulwari Sharif" },
    { label: "Paliganj", value: "Paliganj" },
    { label: "Masaurhi", value: "Masaurhi" },
  ],
  district2: [
    { label: "Gaya Sadar", value: "block1" },
    { label: "Bodh Gaya", value: "block2" },
    { label: "Belaganj", value: "block3" },
    { label: "Khizersarai", value: "block4" },
    { label: "Sherghati", value: "block5" },
  ],
};

const panchayats = {
  Patna: [
    { label: "Fatehpur", value: "Fathehpur" },
    { label: "Mahauli", value: "panchayat2" },
    { label: "Marchi", value: "panchayat3" },
    { label: "Punadih", value: "panchayat4" },
  ],
  district2: [
    { label: "Gaya Sadar", value: "panchayat1" },
    { label: "Bodh Gaya", value: "panchayat2" },
    { label: "Sherghati", value: "panchayat3" },
    { label: "Tekari", value: "panchayat4" },
    { label: "Manpur", value: "panchayat5" },
    { label: "Rafiganj", value: "panchayat6" },
    { label: "Dumaria", value: "panchayat7" },
    { label: "Belaganj", value: "panchayat8" },
  ],
};

const wards = {
  Patna: [
    { label: "Ward 1", value: "Ward 1" },
    { label: "Ward 2", value: "ward2" },
    { label: "Ward 3", value: "ward3" },
    { label: "Ward 4", value: "ward4" },
    { label: "Ward 5", value: "ward5" },
  ],
  district2: [
    { label: "Ward 1", value: "ward1" },
    { label: "Ward 2", value: "ward2" },
    { label: "Ward 3", value: "ward3" },
    { label: "Ward 4", value: "ward4" },
    { label: "Ward 5", value: "ward5" },
  ],
};

export const fakeStreetLights = [
  {
    id: 1,
    state: "Bihar",
    district: "Patna",
    block: "Patna sadar",
    panchayat: "Fathepur",
    wards: [1, 2, 3, 4],
    start_date: "20-02-2025",
    end_date: "30-03-2025",
  },
  {
    id: 1,
    state: "Bihar",
    district: "Patna",
    block: "Danapur",
    panchayat: "Patna Sachivalaya",
    wards: [8, 9, 4],
    start_date: "20-02-2025",
    end_date: "30-03-2025",
  },
];

export const inventoryData = [
  {
    id: 1,
    model: "SL01",
    item: "Luminary",
    manufacturer: "Ecosis",

    rate: 500,
    quantity: 1500,
    total_value: 1500000,
  },
  {
    id: 2,

    model: "SL2",
    item: "Solar Module",
    manufacturer: "Alpex",
    rate: 600,
    quantity: 1500,
    total_value: 500000,
  },
  {
    id: 3,

    model: "SL3",
    item: "Battery",
    manufacturer: "Ecosis",
    make: "ESL",

    rate: 700,
    quantity: 1500,
    total_value: 750000,
  },
  {
    id: 4,

    model: "SL4",
    item: "Structure",
    manufacturer: "Ecosis",
    rate: 400,
    quantity: 1500,
    total_value: 600000,
  },
];
