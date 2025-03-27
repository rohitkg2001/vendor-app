import { View, TouchableOpacity } from "react-native";
import { H4 } from "../text";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "../../styles/components.styles";
import { useNavigation } from "@react-navigation/native";
import { ICON_SMALL } from "../../styles/constant";
import { typography } from "../../styles";
import CustomMenu from "./CustomMenu";

export default function MyHeader({
  isBack,
  title,
  hasIcon,
  icon,
  hasBadge,
  badgeCount,
  onIconPress,
  menuItems,
}) {
  const navigation = useNavigation();

  return (
    <View style={styles.headerStyle}>
      {isBack && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginRight: 10 }}
        >
          <Icon name="arrow-back" size={ICON_SMALL} color="#000" />
        </TouchableOpacity>
      )}
      <H4 style={[typography.font18, typography.fontLato, typography.textBold]}>
        {title}
      </H4>
      {/* {hasIcon && (
        <TouchableOpacity
          onPress={onIconPress}
          style={{ height: 54, width: 54 }}
        >
          <Icon
            name={icon}
            size={ICON_MEDIUM}
            style={{ position: "absolute", top: 10, left: 14 }}
          />
          {hasBadge && (
            <Badge style={{ position: "absolute", top: 7, right: 7 }}>
              {badgeCount}
            </Badge>
          )}
        </TouchableOpacity>
      )} */}

      {hasIcon && <CustomMenu icon={icon} menuItems={menuItems} />}
    </View>
  );
}
