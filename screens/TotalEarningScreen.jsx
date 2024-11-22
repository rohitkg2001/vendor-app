import { useState } from "react";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard from "../components/card/Clickablecard";
import NoRecord from "./NoRecord";
import { View, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../components/buttons/Button";
import { LIGHT, SCREEN_WIDTH, spacing, styles } from "../styles";

const TotalEarningScreen = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <ContainerComponent>
      <MyHeader title="Total Earnings" hasIcon={true} isBack={true} />

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
        ListEmptyComponent={() => (
          <NoRecord msg="Oops! No Projects available. Create the new one." />
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
};
export default TotalEarningScreen;
