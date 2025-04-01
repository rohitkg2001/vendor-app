import { useCallback, useState } from 'react';
import ContainerComponent from '../components/ContainerComponent'
import MyHeader from "../components/header/MyHeader";
import SearchBar from '../components/input/SearchBar';
import MyTabView from '../components/customtab/MyTabView';
import { Text, View } from 'react-native';
import { SceneMap } from 'react-native-tab-view';

export default function InventoryMaterialScreen({ route, navigation }) {
  const { material } = route.params;
  const [searchText, setSearchText] = useState('');
  const handleSearchChange = useCallback((text) => {
    setSearchText(text);
  }, []);

  const inventoryTabs = [
    {
      key: 0,
      title: 'Total Received',
    },
    {
      key: 1,
      title: 'In Stock',

    },
    {
      key: 2,
      title: 'Consumed',
    },
  ];

  const renderScene = SceneMap({
    0: () => <View><Text>Total Received</Text></View>,
    1: () => <View><Text>In Stock</Text></View>,
    2: () => <View><Text>Consumed</Text></View>,
  })


  return (
    <ContainerComponent>
      <MyHeader
        title={`${material} Details`}
        isBack={true}
        hasIcon={true}
        icon="ellipsis-vertical"
        menuItems={[
          {
            title: "Export to Excel",
            onPress: () => console.log("Export to Excel"),
          },
        ]}
      />
      {/* <SearchBar
        value={searchText}
        onChangeText={handleSearchChange}
        style={{ marginHorizontal: 16 }} /> */}
      <MyTabView renderScene={renderScene} tabs={inventoryTabs} handleIndexChange={(index) => console.log(index)} />
    </ContainerComponent>
  )
}