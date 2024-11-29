import { useState } from "react";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard from "../components/card/Clickablecard";
import NoRecord from "./NoRecord";
<<<<<<< HEAD
=======
import { View, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../components/buttons/Button";
import { LIGHT, SCREEN_WIDTH, spacing, styles, ICON_MEDIUM } from "../styles";
import { useTranslation } from "react-i18next";
>>>>>>> a85e4be1654a673a6c01d9c3c97de764acfbdfdc

const TotalEarningScreen = () => {
  const [searchText, setSearchText] = useState("");
  const { t } = useTranslation();

  return (
    <ContainerComponent>
      <MyHeader title={t("total_earning")} hasIcon={true} isBack={true} />

      <MyFlatList
        data={[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ClickableCard
            key={index}
            item={item}
            isEarning={true}
            onPress={() => handleViewDetails(item)}
          />
        )}
<<<<<<< HEAD
        ListEmptyComponent={() => (
          <NoRecord msg="Oops! No Projects available. Create the new one." />
        )}
=======
        ListEmptyComponent={() => <NoRecord msg={t("no_task")} />}
>>>>>>> a85e4be1654a673a6c01d9c3c97de764acfbdfdc
        ListHeaderComponent={() => (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[spacing.mh2]}
          >
            <View style={[spacing.mv4, styles.row, { alignItems: "center" }]}>
              <SearchBar
                placeholder={t("placeholder")}
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
                <Icon name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
              </Button>
            </View>
          </ScrollView>
        )}
      />
    </ContainerComponent>
  );
};
export default TotalEarningScreen;
