import React from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { Text, Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { holidays } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { H5, P } from "../components/text";
import { styles } from "../styles/components.styles";
import { SCREEN_WIDTH, spacing, typography } from "../styles";

export default function HolidayListScreen() {
  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <View style={[spacing.mh1, { width: SCREEN_WIDTH - 16 }]}>
        <View style={[{ flexDirection: "row", alignItems: "center" }]}>
          <View style={styles.iconWrapper}>
            <Icon name="calendar" size={24} color="#fff" />
          </View>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
        <View
          style={[
            styles.titleAndDayContainer,
            { marginLeft: "auto", alignItems: "flex-end" },
          ]}
        >
          <H5 style={typography.textDark}>{item.title}</H5>
          <P style={typography.textDark}>{item.day}</P>
        </View>
      </View>
      <Divider />
    </TouchableOpacity>
  );

  return (
    <ContainerComponent>
      <MyHeader title="Holidays" isBack={true} hasIcon={true} />
      <View style={styles.listContainer}>
        <FlatList
          data={holidays}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ContainerComponent>
  );
}
