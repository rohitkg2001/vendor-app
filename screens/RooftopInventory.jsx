import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import MyHeader from "../components/header/MyHeader";
import ContainerComponent from "../components/ContainerComponent";
import NoRecord from "./NoRecord";

const RooftopInventory = () => {
  const { t } = useTranslation();

  return (
    <ContainerComponent>
      <MyHeader
        title={t("Inventory Details")} 
        isBack
        hasIcon
        icon="ellipsis-vertical"
      />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <NoRecord msg={t("no_task")} />{" "}
      </View>
    </ContainerComponent>
  );
};
export default RooftopInventory;