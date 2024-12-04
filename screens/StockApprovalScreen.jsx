import React from "react";
import Button from "../components/buttons/Button";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { H2, H4, H5 } from "../components/text";
import { typography, spacing, SCREEN_WIDTH, styles } from "../styles";
import { useTranslation } from "react-i18next";
import MyFlatList from "../components/utility/MyFlatList";

const StockApprovalScreen = ({ route }) => {
  const { item } = route.params;
  const { t } = useTranslation();

  return (
    <ContainerComponent>
      <MyHeader title={t("Approval")} isBack={true} hasIcon={true} />

      <H4 style={[typography.font14]}>
        {t("Name")}: {item.name}
      </H4>
      <H5 style={[typography.font14]}>
        {t("Quantity")}: {item.quantity}
      </H5>

      <Button
        style={[
          styles.btn,
          styles.bgPrimary,
          spacing.br5,
          spacing.mt5,
          { width: SCREEN_WIDTH - 16, justifyContent: "center" },
        ]}
      >
        <H2 style={[styles.btnText, typography.font20, typography.textLight]}>
          Approve
        </H2>
      </Button>
    </ContainerComponent>
  );
};

export default StockApprovalScreen;
