import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SCREEN_WIDTH, ICON_SMALL, styles } from "../../styles";
import { useTranslation } from "react-i18next";

export default function SearchBar({ placeholder, value, onChangeText, style }) {
  const { t } = useTranslation();
  return (
    <View
      style={[
        styles.row,
        styles.border,
        styles.round,
        styles.ph5,
        styles.mv2,
        styles.bgPrimaryTransParent,
        {
          alignItems: "center",
          justifyContent: "flex-start",
          height: 48,
          width: SCREEN_WIDTH - 8,
          // marginHorizontal: -4,
          borderRadius: 12,
        },
        style,
      ]}
    >
      <Ionicons
        name="search-outline"
<<<<<<< HEAD
        size={24}
=======
        size={ICON_SMALL}
>>>>>>> a85e4be1654a673a6c01d9c3c97de764acfbdfdc
        color="#333"
        style={{ marginLeft: 4 }}
      />
      <TextInput
        placeholder={t("placeholder")}
        value={value}
        onChangeText={onChangeText}
        style={[
          { marginHorizontal: 4, height: 48, paddingLeft: 12, fontSize: 18 },
          style,
        ]}
      />
    </View>
  );
}
