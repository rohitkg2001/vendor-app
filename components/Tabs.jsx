import { View, Text, TouchableOpacity } from "react-native";
import { styles, spacing, typography } from "../styles";

const Tabs = ({ tabs, onTabPress, activeTab, tabStyles = {} }) => {
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
        const isActive = activeTab.split(" ")[0] === tabLabel;

        return (
          <TouchableOpacity
            key={index}
            style={[
              spacing.pv2,
              spacing.ph1,
              spacing.br3,
              {
                backgroundColor: isActive
                  ? tabStyles.activeBackgroundColor || "#76885B"
                  : tabStyles.inactiveBackgroundColor || "#C8E6C9",
              },
            ]}
            onPress={() => handleTabPress(tabLabel)}
          >
            <Text
              style={[
                typography.font10,
                typography.fontLato,
                {
                  color: isActive
                    ? tabStyles.activeTextColor || "#fff"
                    : tabStyles.inactiveTextColor || "#333",
                  fontWeight: isActive ? "bold" : "normal",
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
