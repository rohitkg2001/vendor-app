import React from "react";
import { View, ScrollView } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { H5 } from "../components/text";
import { spacing, typography } from "../styles";
import { useTranslation } from "react-i18next";

const InventoryDetailsScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { selectedItem } = route.params;

  const renderDetailRow = (label, value) => (
    <View style={{ flexDirection: "row", paddingVertical: 8 }}>
      <H5 style={[typography.textBold]}>{label}</H5>
      <H5 style={[typography.font16, { textAlign: "right", flex: 1 }]}>
        {value || t("not_available")}
      </H5>
    </View>
  );

  return (
    <ContainerComponent>
      <MyHeader
        title={t("inventory_details")}
        isBack={true}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={[spacing.pv4, spacing.ph4]}>
        {selectedItem ? (
          <>
            {renderDetailRow(t("product_name"), selectedItem.product_name)}
            {renderDetailRow(t("quantity"), selectedItem.quantity)}
            {renderDetailRow(t("category"), selectedItem.category)}
            {renderDetailRow(t("description"), selectedItem.description)}
            {renderDetailRow(
              t("material_dispatch_date"),
              selectedItem.material_dispatch_date
            )}
          </>
        ) : (
          <H5 style={[typography.textBold, { textAlign: "center" }]}>
            {t("no_details_available")}
          </H5>
        )}
      </ScrollView>
    </ContainerComponent>
  );
};

export default InventoryDetailsScreen;