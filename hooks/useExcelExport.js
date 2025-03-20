// import { PermissionsAndroid } from "react-native";
// import XLSX from "xlsx";
// import RNFS from "react-native-fs";

// const useExcelExport = () => {
//   const exportDataToExcel = async () => {
//     // let sample_data_to_export = [
//     //   { id: "1", name: "First User" },
//     //   { id: "2", name: "Second User" },
//     // ];

//     let wb = XLSX.utils.book_new();
//     let ws = XLSX.utils.json_to_sheet(sample_data_to_export);
//     XLSX.utils.book_append_sheet(wb, ws, "Users");

//     const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });

//     try {
//       const filePath = RNFS.DownloadDirectoryPath + "/my_exported_file.xlsx";

//       await RNFS.writeFile(filePath, wbout, "ascii");

//       console.log("Excel file successfully saved at:", filePath);
//       return filePath;
//     } catch (error) {
//       console.error("Error saving the file:", error);
//       return null;
//     }
//   };

//   const handleExport = async () => {
//     try {
//       let permissionGranted = await PermissionsAndroid.check(
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
//       );

//       if (!permissionGranted) {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//           {
//             title: "Storage permission needed",
//             message: "We need access to your storage to save the Excel file.",
//             buttonNeutral: "Ask Me Later",
//             buttonNegative: "Cancel",
//             buttonPositive: "OK",
//           }
//         );

//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           console.log("Permission denied");
//           return;
//         }
//       }

//       return await exportDataToExcel();
//     } catch (error) {
//       console.error("Error while requesting permission:", error);
//     }
//   };

//   return { handleExport };
// };

// export default useExcelExport;

import { PermissionsAndroid } from "react-native";
import XLSX from "xlsx";
import RNFS from "react-native-fs";

const useExcelExport = () => {
  const exportDataToExcel = async (tasks) => {
    if (!tasks || tasks.length === 0) {
      console.error("No tasks selected for export.");
      return null;
    }

    // Convert task objects to JSON format for Excel
    let ws = XLSX.utils.json_to_sheet(
      tasks.map((task) => ({
        "Task ID": task.id,
        "Site Name": task.site?.site_name || "N/A",
        Location: task.site?.location || "N/A",
        Status: task.status,
        "Start Date": task.start_date,
        "End Date": task.end_date,
        Activity: task.activity,
        "BREDA SL No": task.site?.breda_sl_no || "N/A",
      }))
    );

    let wb = XLSX.utils.book_new();
    console.log(wb);
    XLSX.utils.book_append_sheet(wb, ws, "Tasks");

    const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });

    try {
      const filePath = `${RNFS.DownloadDirectoryPath}/tasks_export.xlsx`;
      await RNFS.writeFile(filePath, wbout, "ascii");
      console.log("Excel file successfully saved at:", filePath);
      return filePath;
    } catch (error) {
      console.error("Error saving the file:", error);
      return null;
    }
  };

  const handleExport = async (selectedTasks) => {
    try {
      let permissionGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );

      if (!permissionGranted) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage permission needed",
            message: "We need access to your storage to save the Excel file.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Permission denied");
          return;
        }
      }

      return await exportDataToExcel(selectedTasks);
    } catch (error) {
      console.error("Error while requesting permission:", error);
    }
  };

  return { handleExport };
};

export default useExcelExport;
