import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { TabView } from "react-native-tab-view";
import MyTabHeader from "./MyTabHeader";

export default function MyTabView({ renderScene, tabs, style }) {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  return (
    <TabView
      navigationState={{ index, routes: tabs }}
      renderTabBar={MyTabHeader} // Custom Tab Header
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      style={style} // Add custom styling passed via props
    />
  );
}
