import { useEffect, useState } from "react";
import ContainerComponent from "../components/ContainerComponent";
import { View, ScrollView } from "react-native";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import ClickableCard from "../components/card/Clickablecard";
import NoRecord from "./NoRecord";
import MyFlatList from "../components/utility/MyFlatList";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../components/buttons/Button";
import { LIGHT, SCREEN_WIDTH, spacing, styles, ICON_MEDIUM } from "../styles";
import { useTranslation } from "react-i18next";
import Filter from "../components/Filter";
import { useSelector } from "react-redux";

export default function SiteScreen({ navigation }) {
  const handleViewDetails = (item) => {
    navigation.navigate("viewDetailScreen", {
      site: item,
      formType: "site",
    });
  };

       const closeFilter = () => {
         setShowBottomSheet(!showBottomSheet);
       };
  const applyFilterFromRedux = ( ...args ) => { };
  
  const { t } = useTranslation();
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const { sites } = useSelector((state) => state.site);

  useEffect(() => {}, []);

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
        ListEmptyComponent={() => <NoRecord msg={t("no_site")} />}
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
      {showBottomSheet && (
        <Filter onClose={closeFilter} onApply={applyFilterFromRedux} />
      )}
    </ContainerComponent>
  );
}
