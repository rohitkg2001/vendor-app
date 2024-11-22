import ContainerComponent from "../components/ContainerComponent";
import { View, ScrollView } from "react-native";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import ClickableCard from "../components/card/Clickablecard";
import { sites } from "../utils/faker";
import MyFlatList from "../components/utility/MyFlatList";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../components/buttons/Button";
import { LIGHT, SCREEN_WIDTH, spacing, styles } from "../styles";

export default function SiteScreen({ navigation }) {
  

  const handleViewDetails = (item) => {
    navigation.navigate("viewDetailScreen", {
      site: item,
      formType: "site",
    });
  };

  return (
    <ContainerComponent>
      <MyHeader isBack title="Total Sites" hasIcon />

      <MyFlatList
        data={sites}
        renderItem={({ item }) => (
          <ClickableCard
            key={item.id}
            item={item}
            handleViewDetails={handleViewDetails}
            isSite={true}
          />
        )}
        ListHeaderComponent={() => (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[spacing.mh2]}
          >
            <View style={[spacing.mv4, styles.row, { alignItems: "center" }]}>
              <SearchBar
                placeholder="Search"
                style={{ width: SCREEN_WIDTH - 70 }}
              />
              <Button
                style={[
                  styles.btn,
                  styles.bgPrimary,
                  spacing.mh1,
                  { width: 50 },
                ]}
              >
                <Icon name="options-outline" size={28} color={LIGHT} />
              </Button>
            </View>
          </ScrollView>
        )}
      />
    </ContainerComponent>
  );
}
