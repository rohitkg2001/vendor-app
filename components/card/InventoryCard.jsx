import { View, TouchableOpacity } from "react-native";
import { H5, P } from "../../components/text";
import { styles, spacing, SCREEN_WIDTH, LIGHT, typography } from "../../styles";
import { useTranslation } from "react-i18next";
import { Card } from "react-native-paper";

export default function InventoryCard({ item, onPress }) {
  const { t } = useTranslation();

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
        <View style={[styles.row, spacing.mb1]}>
          <H5 style={[typography.font16, typography.fontLato]}>{item.item}</H5>
          <View style={{ alignItems: "flex-end" }}>
            <P
              style={[
                typography.font12,
                typography.fontLato,
                { color: "#666" },
              ]}
            >
              {t("Item Code")}
            </P>
            <P
              style={[
                typography.font12,
                typography.textBold,
                typography.fontLato,
              ]}
            >
              {item.item_code}
            </P>
          </View>
        </View>

        <View style={[spacing.mb1]}>
          <P
            style={[typography.font12, typography.fontLato, { color: "#666" }]}
          >
            {t("Manufacturer")}
          </P>
          <P style={[typography.font12, typography.fontLato]}>
            {item.manufacturer}
          </P>
        </View>

        <View style={[styles.row, spacing.mb1]}>
          <View style={{ flex: 1 }}>
            <P style={[typography.font12, typography.fontLato]}>{t("Make")}</P>
            <P style={[typography.font14, typography.fontLato]}>{item.make}</P>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
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
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <P style={[typography.font12, typography.fontLato]}>{t("HSN")}</P>
            <P
              style={[
                typography.font14,
                typography.textBold,
                typography.fontLato,
              ]}
            >
              {item.hsn}
            </P>
          </View>
        </View>

        <View style={[styles.row, spacing.mb1]}>
          <View>
            <P style={[typography.font12, typography.fontLato]}>
              {t("Total Value")}
            </P>
            <P
              style={[
                typography.font14,
                typography.fontLato,
                { color: "#27ae60" },
              ]}
            >
              ₹{item.total_value}
            </P>
          </View>
          <View>
            <P style={[typography.font12, typography.fontLato]}>{t("Rate")}</P>
            <P
              style={[
                typography.font14,
                typography.fontLato,
                { color: "#e74c3c" },
              ]}
            >
              ₹{item.rate}
            </P>
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <P style={[typography.font12, typography.fontLato]}>
              {t("Serial Number")}
            </P>
            <P style={[typography.font14, typography.fontLato]}>
              {item.serial_number}
            </P>
          </View>
          <View>
            <P style={[typography.font12, typography.fontLato]}>{t("Model")}</P>
            <P style={[typography.font14, typography.fontLato]}>{item.model}</P>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
}
