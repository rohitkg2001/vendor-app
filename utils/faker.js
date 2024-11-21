import {
  DANGER_COLOR,
  INFO_COLOR,
  SUCCESS_COLOR,
  WARNING_COLOR,
} from "../styles/constant";

export const vendor = {
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

export const projects = [
  {
    id: 1,
    sites: [1, 2],
    vendorId: 1,
    projectName: "BREDA",
    duration: "2 days",
    start_date: "11 Nov 2024",
    end_date: "11 Dec 2024",
    project_serial_no: 1,
    sanctioned_load: "5Kva",
    alloted_project_capacity: "5",
    ca_number: "10140011567",
    load_enhancement_status: "",
    site_survey_status: true,
    meter_number: "",
    status: 0,
  },
  {
    id: 2,
    sites: [3],
    vendorId: 1,
    projectName: "Indian Railway",
    duration: "5 days",
    start_date: "11 Nov 2024",
    end_date: "15 Nov 2024",
    project_serial_no: 2,
    status: 1,
  },
  {
    id: 3,
    vendorId: 1,
    sites: [4],
    projectName: "Delhi Government",
    duration: "3 days",
    project_serial_no: 3,
    status: 2,
  },
];

export const sites = [
  {
    id: "1",
    vendorId: 1,
    siteName: "P S SHIKSHA NAGAR BANMANKHI",
    dist: "Purnia",
    location: "BANMANKHI",
    contact_number: "8298252994",
    geo_location: {
      lat: 25.889458,
      lng: 87.190071,
    },
    net_meter_no: 1234,
    solar_meter_no: 2345,
    material_dispatch_date: "12 Nov 2024",
    material_inspection_date: "13 Nov 2024",
    spp_installation_date: "13 Nov 2024",
    commissioning_date: "14 Nov 2024",
    tasks: [1],
    inventory: [1, 2],
  },
  {
    id: "2",
    vendorId: 1,
    tasks: [],
    inventory: [],
    siteName: "P S MIRCHAIBARI UTTAR",
    dist: "Purnia",
    location: "BANMANKHI",
  },
  {
    id: "3",
    tasks: [],
    inventory: [],
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

export const tasks = [
  {
    id: 1,
    projectId: 1,
    title: "Solar Panel Installation at railway station.",
    description: "Install the panel on top of the platform of 5kw of power.",
    start_date: "15 Nov 2024",
    end_date: "16 Nov 2024",
    assigned_by: "Md Zulfikar",
    assigned_to: 1,
    rms_installation_date: "16 Nov 2024",
    rms_installed_by: "Md Zulfikar",
    approved_by: "Md Zulfikar",
    payment_status: false,
    remarks: "",
    status: 0,
  },
];

export const inventory = [
  {
    id: 1,
    projectId: "",
    siteId: "",
    product_name: "Solar LED Street Light",
    description: "Eco-friendly solar-powered street light with motion sensor.",
    unit: "pcs",
    initial_quantity: "1000",
    qty_stock: "1000",
    dispatch_date: "",
    delivery_date: "",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfaVettxgHxUSbCpPamGNdUB8g_9t_qYFhgQ&s",
  },
  {
    id: 2,
    projectId: "",
    siteId: "",
    product_name: "Smart Street Light System",
    description: "Automated street light system with IoT connectivity.",
    unit: "pcs",
    initial_quantity: "1000",
    qty_stock: "200",
    dispatch_date: "",
    delivery_date: "",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_L6YoAFI4q74AoE5ijHorzYQF4ZgI7rvwhg&s",
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
];

export const menuItems = [
  { label: "My Projects", icon: "grid-outline", page: "projectsScreen", id: 0 },
  { label: "My Tasks", page: "taskScreen", icon: "grid-outline", id: 1 },
  {
    label: "Site Inventory",
    icon: "cart-outline",
    page: "inventoryScreen",
    id: 2,
  },
  { label: "Reports", page: "", icon: "pie-chart-outline", id: 3 },
  {
    label: "Settings",
    page: "",
    icon: "cog-outline",
    page: "internalSetting",
    id: 4,
  },
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

export const PRIVACY_POLICY =
  "At Dashandots Technology, we deeply value your privacy and are committed to safeguarding the personal information you share with us.We collect essential personal information, including but not limited to your name, email address, and contact details, to ensure the efficient delivery of our services, enhance user experience, and better understand your needs.We assure you that we do not sell,";

// statuscode=0->open,
//statuscode = 1 -> completed,
//statuscode = 2 -> hold

export const documentData = [
  {
    id: "1",
    staffId: 1,
    documentName: "Offer Letter",
    documentImage:
      "https://static.dexform.com/media/docs/6915/sample-job-offer-letter_1.png",
  },
  {
    id: "2",
    staffId: 1,
    documentName: "Appointment Letter",
    documentImage:
      "https://static.dexform.com/media/docs/6915/sample-job-offer-letter_1.png",
  },
  {
    id: "3",
    staffId: 1,
    documentName: "Bond Agreement",
    documentImage:
      "https://static.dexform.com/media/docs/6915/sample-job-offer-letter_1.png",
  },
  {
    id: "4",
    staffId: 1,
    documentName: "Appraisal Letter",
    documentImage:
      "https://static.dexform.com/media/docs/6915/sample-job-offer-letter_1.png",
  },
];
