import React from "react";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import NoRecord from "./NoRecord";

import { useTranslation } from "react-i18next";

const StreetLightPendingTask = ({ route }) => {
  const { t } = useTranslation();

  return (
    <ContainerComponent>
      <MyHeader title={t("Total Installation")} isBack={true} hasIcon={true} />
      <NoRecord msg={t("No data Found")} />
    </ContainerComponent>
  );
};

export default StreetLightPendingTask;
