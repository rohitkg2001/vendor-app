// import react native
import { FlatList } from "react-native";
import React from "react";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import NoRecord from "./NoRecord";
import { useTranslation } from "react-i18next";

export default function ReportScreen() {
  const { t } = useTranslation();

  const data = [];

  return (
    <ContainerComponent>
      <MyHeader title="Reports" isBack={true} hasIcon={true} />

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => <NoRecord msg={t("no_report")} />}
      />
    </ContainerComponent>
  );
}
