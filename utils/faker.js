import {
  DANGER_COLOR,
  INFO_COLOR,
  SUCCESS_COLOR,
  WARNING_COLOR,
} from "../styles/constant";


export const staff = {
  id: 1,
  first_name: "Rakesh",
  last_name: "Sharma",
  user_type: "staff",
  is_admin: 0,
  role_id: 0,
  email: "rakesh.sharma@gmail.com",
  password: "12345678",
  image: "https://randomuser.me/api/portraits/men/1.jpg",
  status: "active",
  job_title: "Technical Assistant",
  salary: "20000",
  salary_term: "Monthly",
  Date_of_hire: "2024-08-27",
  disable_login: 0,
  note: [],
  address: "123 gali, jhajjar, Haryana",
  alternative_address: "",
  phone: "9909230912",
  alternative_phone: "",
  dob: "",
  gender: "male",
  sticky_note: [],
  skype: "",
  language: "",
  last_online: "2024-10-03 05:41:49",
  file: "file-pdf",
  size: "",
  uploaded_by: "rakesh sharma",
  created_date: "",
};

export const sites = [
  {
    id: "1",
    vendorId: 1,
    siteName: "P S SHIKSHA NAGAR BANMANKHI",
    dist: "Purnia",
    location: "BANMANKHI",
  },
  {
    id: "2",
    vendorId: 1,
    siteName: "P S MIRCHAIBARI UTTAR",
    dist: "Purnia",
    location: "BANMANKHI",
  },
  {
    id: "3",
    vendorId: 1,
    siteName: "P S MIRCHAIBARI UTTAR",
    dist: "Purnia",
    location: "BANMANKHI",
  },
  {
    id: "4",
    vendorId: 1,
    siteName: "P S MIRCHAIBARI UTTAR",
    dist: "Purnia",
    location: "BANMANKHI",
  },
];

export const projects = [
  {
    id: 1,
    sites: [1, 2],
    vendorId: 1,
    projectName: "BREDA",
    duration: "2 days",
    status: 0
  },
  {
    id: 2,
    sites: [3],
    vendorId: 1,
    projectName: "Indian Railway",
    duration: "5 days",
    status: 2
  },
  {
    id: 3,
    vendorId: 1,
    sites: [4],
    projectName: "Delhi Government",
    duration: "3 days",
    status: 2
  },
];



export const tasks = [
  {
    id: 1,
    projectId: 1,
    title: "Task 1",
    description: "This is task 1",
    start_date: "15-11-2024",
    end_date: "16-11-2024",
    assigned_by: "Sumit Ranjan",
    assigned_to: 1,
    approved_by: null,
    status: 0
  },
];

export const categories = [
  {
    id: "1",
    label: "Installation",
    icon: "layers-outline",
    count: 5,
  },
  {
    id: "2",
    label: "Fixing Slip",
    icon: "grid-outline",
    count: 3,
  },
  {
    id: "3",
    label: "RMS Status",
    icon: "cart-outline",
    count: 2,
  },
  {
    id: "4",
    label: "Final Inspection",
    icon: "document-text-outline",
    count: 1,
  },
  {
    id: "5",
    label: "Report",
    icon: "pie-chart-outline",
    count: 4,
  },
];



export const projecttask = [
  {
    id: 1,
    projectName: "Project 01A",
    siteName: " SBI Bank , Rampur School , Lakhisarai",

  },
  {
    id: 2,
    projectName: "Project 02B",
    siteName: "Block Office, Shershah Road ,Madhepura",

  },
  {
    id: 3,
    projectName: "Project 03C",
    siteName: "Purnea Mahila College , Sipahi Tola , Purnea",

  },
];
export const tasksData = [
  {
    id: "1",
    taskName: "Solar Panel Installlation at railway station.",
    installation: "Install the panel on top of the platform of 5kw of power.",
  },
];

export const orders = [
  {
    id: "1",
    name: "Solar LED Street Light",
    description: "Eco-friendly solar-powered street light with motion sensor.",
    quantity: 1,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfaVettxgHxUSbCpPamGNdUB8g_9t_qYFhgQ&s",
  },
  {
    id: "2",
    name: "Smart Street Light System",
    description: "Automated street light system with IoT connectivity.",
    quantity: 2,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_L6YoAFI4q74AoE5ijHorzYQF4ZgI7rvwhg&s",
  },
  {
    id: "3",
    name: "LED Floodlight for Streets",
    description: "High brightness LED floodlight for outdoor use.",
    quantity: 3,
    url: "https://m.media-amazon.com/images/I/81hIbQn03RL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: "4",
    name: "Solar Street Light with Camera",
    description: "Integrated street light with a security camera.",
    quantity: 1,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfaVettxgHxUSbCpPamGNdUB8g_9t_qYFhgQ&s",
  },
  {
    id: "5",
    name: "Street Light Pole",
    description: "Durable street light pole for various applications.",
    quantity: 5,
    url: "https://th.bing.com/th?id=OPAC.9GyQh8O0Qccugw474C474&w=592&h=550&o=5&dpr=1.1&pid=21.1",
  },
  {
    id: "6",
    name: "Motion Sensor Street Light",
    description:
      "Street light with a built-in motion sensor for energy savings.",
    quantity: 2,
    url: "  https://th.bing.com/th?id=OPAC.CS1gpu%2fn0Pggmw474C474&w=592&h=550&o=5&dpr=1.1&pid=21.1 ",
  },
];

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
  {
    id: 3,
    projectName: "Solar Panel Setup for Schools",
    totalEarnings: 4730.75,
    completionDate: "2023-08-20",
  },
  {
    id: 4,
    projectName: "Solar Energy Solutions for Farms",
    totalEarnings: 20500.0,
    completionDate: "2023-07-30",
  },
  {
    id: 5,
    projectName: "Solar Roof Panels for Businesses",
    totalEarnings: 13500.25,
    completionDate: "2023-06-12",
  },
];

export const menuItems = [
  { label: "Site Inventory", icon: "cart-outline", page: "requisitions" },
  { label: "Reports", page: "", icon: "pie-chart-outline" },
  { label: "My Projects", page: "", icon: "grid-outline" },
  { label: "My Tasks", page: "", icon: "grid-outline" },
  { label: "Settings", page: "", icon: "cog-outline", page: "internalSetting" },
];

export const internal = [
  {
    label: "Notification",
    page: "notificationScreen",
    icon: "notifications-outline",
  },
  { label: "Privacy", page: "privacyPolicy", icon: "shield-checkmark-outline" },
  { label: "Data Usage", page: "", icon: "folder-outline" },
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


export const requisitions = [
  {
    id: "PR - 10050019",
    location: "PL01 - Texas Houston Plant",
    date: "08/19/2024",
    amount: "₹ 24.40 ",
    checked: false,
  },
  {
    id: "PR - 10050018",
    location: "PL01 - Texas Houston Plant",
    date: "08/23/2024",
    amount: "₹ 254.40 ",
    checked: false,
  },
  {
    id: "PR - 10050017",
    location: "PL01 - Texas Houston Plant",
    date: "09/11/2024",
    amount: "₹ 100.00 ",
    checked: false,
  },
  {
    id: "PR - 10050016",
    location: "PL01 - Texas Houston Plant",
    date: "10/19/2024",
    amount: "₹ 100.00 ",
    checked: false,
  },
];
export const itemsData = [
  { id: "P001", name: "Product A", price: 120.5, quantity: 2, total: 241.0 },
  { id: "P002", name: "Product B", price: 80.25, quantity: 3, total: 240.75 },
  { id: "P003", name: "Product C", price: 50.0, quantity: 1, total: 50.0 },
  { id: "P004", name: "Product D", price: 150.75, quantity: 5, total: 753.75 },
  { id: "P005", name: "Product E", price: 99.99, quantity: 4, total: 399.96 },
];
export const amountDetailsData = [
  { label: "Subtotal", value: 1000 },
  { label: "Tax", value: 100 },
  { label: "Total", value: 1100 },
];
export const handleTaskProgress = (
  tasks,
  projectId,
  setTasks,
  setActiveStatus
) => {
  const updatedTasks = tasks.map((task) =>
    task.id === projectId ? { ...task, status: "inProgress" } : task
  );
  setTasks(updatedTasks);
  setActiveStatus("inProgress");
};

// statuscode=0->open,
//statuscode = 1 -> completed,
//statuscode = 2 -> hold

