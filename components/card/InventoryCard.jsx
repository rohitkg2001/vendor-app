import { View, TouchableOpacity } from "react-native";
import { H5, P } from "../../components/text";
import { styles, spacing, SCREEN_WIDTH, typography } from "../../styles";
import { useTranslation } from "react-i18next";
import { Card } from "react-native-paper";

export default function InventoryCard({ item, onPress }) {
  const { t } = useTranslation();

  // Calculate total value
  const totalValue = item.rate * item.quantity;

  const formatDate = (dateString) => {
    if (!dateString) return ""; // Agar date na ho to empty string return kare
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Card
      style={[
        spacing.mv1,
        spacing.mh2,
        spacing.p2,
        spacing.br2,
        {
          width: SCREEN_WIDTH - 32,
          backgroundColor: "#e8f8f5",
          borderWidth: 1,
          borderColor: "#ccc",
        },
      ]}
    >
      <TouchableOpacity onPress={onPress}>
        {/* Item Name */}
        <View
          style={[
            styles.row,
            spacing.mb1,
            { justifyContent: "space-between", alignItems: "center" },
          ]}
        >
          <H5 style={[typography.font16, typography.fontLato]}>{item.item}</H5>
          <P
            style={[typography.font12, typography.fontLato, { color: "gray" }]}
          >
            {formatDate(item.dispatch_date)}
          </P>
        </View>

        {/* Manufacturer & Model in one row */}
        <View
          style={[styles.row, spacing.mb1, { justifyContent: "space-between" }]}
        >
          {/* Manufacturer */}
          <View style={{ alignItems: "center" }}>
            <P
              style={[
                typography.font12,
                typography.fontLato,
                { color: "#666" },
              ]}
            >
              {t("Manufacturer")}
            </P>
            <P
              style={[
                typography.font12,
                typography.textBold,
                typography.fontLato,
              ]}
            >
              {item.manufacturer}
            </P>
          </View>

          {/* Model */}
          <View style={{ alignItems: "center" }}>
            <P
              style={[
                typography.font12,
                typography.fontLato,
                { color: "#666" },
              ]}
            >
              {t("Model")}
            </P>
            <P
              style={[
                typography.font12,
                typography.textBold,
                typography.fontLato,
              ]}
            >
              {item.model}
            </P>
          </View>
        </View>

        {/* Rate, Quantity, and Total Value in one row */}
        <View
          style={[styles.row, spacing.mb1, { justifyContent: "space-between" }]}
        >
          <View style={{ alignItems: "center" }}>
            <P style={[typography.font12, typography.fontLato]}>{t("Rate")}</P>
            <P
              style={[
                typography.font14,
                typography.textBold,
                typography.fontLato,
                { color: "#e74c3c" },
              ]}
            >
              ₹{item.rate}
            </P>
          </View>

          <View style={{ alignItems: "center" }}>
            <P style={[typography.font12, typography.fontLato]}>
              {t("Quantity")}
            </P>
            <P
              style={[
                typography.font14,
                typography.textBold,
                typography.fontLato,
              ]}
            >
              {item.quantity}
            </P>
          </View>

          <View style={{ alignItems: "center" }}>
            <P style={[typography.font12, typography.fontLato]}>
              {t("Total Value")}
            </P>
            <P
              style={[
                typography.font14,
                typography.textBold,
                typography.fontLato,
                { color: "#27ae60" },
              ]}
            >
              ₹{totalValue}
            </P>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
}
