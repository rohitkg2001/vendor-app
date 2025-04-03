import { View, Text } from "react-native";
import { TabBar } from "react-native-tab-view";

export default function MyTabHeader(props) {
  return (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "white" }} // White indicator under selected tab
      style={{ backgroundColor: "black", height: 40 }} // Tab header styling
      scrollEnabled // Allow tab scrolling if there are too many
      tabStyle={{ width: "auto", height: 100 }} // Custom tab height and width
      labelStyle={{
        fontSize: 14,
        fontWeight: "bold",
        color: "white", // Tab label color
      }}
      badge={() => (
        <View>
          <Text>0</Text>
        </View>
      )}
    />
  );
}
