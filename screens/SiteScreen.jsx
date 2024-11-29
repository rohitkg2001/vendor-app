import ContainerComponent from "../components/ContainerComponent";
import { View, ScrollView } from "react-native";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import ClickableCard from "../components/card/Clickablecard";
import { sites } from "../utils/faker";
import MyFlatList from "../components/utility/MyFlatList";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../components/buttons/Button";
<<<<<<< HEAD
import { LIGHT, SCREEN_WIDTH, spacing, styles } from "../styles";

export default function SiteScreen({ navigation }) {
  

=======
import { LIGHT, SCREEN_WIDTH, spacing, styles, ICON_MEDIUM } from "../styles";
import { useTranslation } from "react-i18next";

export default function SiteScreen({ navigation }) {
>>>>>>> a85e4be1654a673a6c01d9c3c97de764acfbdfdc
  const handleViewDetails = (item) => {
    navigation.navigate("viewDetailScreen", {
      site: item,
      formType: "site",
    });
  };
  const { t } = useTranslation();

  return (
    <ContainerComponent>
<<<<<<< HEAD
      <MyHeader isBack title="Total Sites" hasIcon />

=======
      <MyHeader isBack title={t("total_sites")} hasIcon />
>>>>>>> a85e4be1654a673a6c01d9c3c97de764acfbdfdc
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
<<<<<<< HEAD
                <Icon name="options-outline" size={28} color={LIGHT} />
=======
                <Icon name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
>>>>>>> a85e4be1654a673a6c01d9c3c97de764acfbdfdc
              </Button>
            </View>
          </ScrollView>
        )}
      />
    </ContainerComponent>
  );
}
