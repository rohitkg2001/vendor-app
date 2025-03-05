// import { View, Text, TouchableOpacity } from "react-native";
// import { styles, spacing, typography } from "../styles";

// const Tabs = ({ tabs, onTabPress, activeTab }) => {
//   const handleTabPress = (tab) => {
//     if (onTabPress) {
//       onTabPress(tab);
//     }
//   };

//   return (
//     <View
//       style={[
//         styles.row,
//         spacing.p1,
//         {
//           alignItems: "center",
//         },
//       ]}
//     >
//       {tabs.map((tab, index) => (
//         <TouchableOpacity
//           key={index}
//           style={[
//             spacing.pv2,
//             spacing.ph2,
//             spacing.br3,
//             {
//               backgroundColor: activeTab === tab ? "#76885B" : "#C8E6C9",
//             },
//           ]}
//           onPress={() => handleTabPress(tab)}
//         >
//           <Text
//             style={[
//               typography.font10,
//               typography.fontLato,
//               {
//                 color: activeTab === tab ? "#fff" : "#333",
//                 fontWeight: activeTab === tab ? "bold" : "normal",
//               },
//             ]}
//           >
//             {tab}
//           </Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// export default Tabs;

import { View, Text, TouchableOpacity } from "react-native";
import { styles, spacing, typography } from "../styles";

const Tabs = ({ tabs, onTabPress, activeTab }) => {
  const handleTabPress = (tab) => {
    if (onTabPress) {
      onTabPress(tab);
    }
  };

  return (
    <View
      style={[
        styles.row,
        spacing.p1,
        {
          alignItems: "center",
        },
      ]}
    >
      {tabs.map((tab, index) => {
        const tabLabel = tab.split(" ")[0];
        return (
          <TouchableOpacity
            key={index}
            style={[
              spacing.pv2,
              spacing.ph1,
              spacing.br3,
              {
                backgroundColor: activeTab === tabLabel ? "#76885B" : "#C8E6C9",
              },
            ]}
            onPress={() => handleTabPress(tabLabel)}
          >
            <Text
              style={[
                typography.font10,
                typography.fontLato,
                {
                  color: activeTab === tabLabel ? "#fff" : "#333",
                  fontWeight: activeTab === tabLabel ? "bold" : "normal",
                },
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Tabs;
