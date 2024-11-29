import ContainerComponent from "../components/ContainerComponent";
import { useState } from "react";
import { View, ScrollView } from "react-native";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import ClickableCard from "../components/card/Clickablecard";
import { sites } from "../utils/faker";
import MyFlatList from "../components/utility/MyFlatList";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../components/buttons/Button";
import Filter from "../components/Filter";
import { LIGHT, SCREEN_WIDTH, spacing, styles, ICON_MEDIUM } from "../styles";
import { useTranslation } from "react-i18next";

export default function SiteScreen({ navigation }) {
  const [showBottomSheet, setShowBottomSheet] = useState(false)
  const handleViewDetails = (item) => {
    navigation.navigate("viewDetailScreen", {
      site: item,
      formType: "site",
    });
  };
  const { t } = useTranslation();

  return (
    <ContainerComponent>
      <MyHeader isBack title={t("total_sites")} hasIcon />
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
                onPress={() => setShowBottomSheet(!showBottomSheet)}
              >
                <Icon name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
              </Button>
            </View>
          </ScrollView>
        )}
      />
       {
        showBottomSheet && <Filter />
      }
    </ContainerComponent>
  );
}
