// import All components
import MenuItem from "../components/MenuItem";
import { internal } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import Button from "../components/buttons/Button";
import {
  PRIMARY_COLOR,
  SCREEN_WIDTH,
  spacing,
  styles,
  typography,
} from "../styles";
import { H2, Span } from "../components/text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../i18n";
import { useEffect, useState } from "react";

export default function SettingsScreen({ navigation }) {
  const [language, setLanguage] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchLanguage = async () => {
      const storedLanguage = await AsyncStorage.getItem("appLanguage");
      setLanguage(storedLanguage || "en");
    };

    fetchLanguage();
  }, []);

  const selectLanguage = async (lang) => {
    await AsyncStorage.setItem("appLanguage", lang);
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  const getButtonStyle = (lang) => {
    return language === lang
      ? [
          styles.btn,
          styles.bgPrimary,
          spacing.m1,
          spacing.br5,
          { width: SCREEN_WIDTH - 16, justifyContent: "center" },
        ]
      : [
          styles.btn,
          styles.bgLight,
          spacing.m1,
          spacing.bw2,
          spacing.br5,
          {
            width: SCREEN_WIDTH - 16,
            justifyContent: "center",
            borderColor: PRIMARY_COLOR,
          },
        ];
  };

  return (
    <ContainerComponent justifyContent="space-between">
      <MyHeader title={t("setting")} isBack={true} hasIcon={true} />
      <View style={{ flex: 1 }}>
        <View
          style={[
            spacing.mv5,
            spacing.mh2,
            spacing.bbw05,
            { paddingBottom: 20 },
          ]}
        >
          <Span
            style={[
              typography.font16,
              spacing.mt5,
              spacing.mh2,
              typography.fontLato,
            ]}
          >
            Select Preferred Language
          </Span>

          {/* English Button */}
          <Button
            style={getButtonStyle("en")}
            onPress={() => selectLanguage("en")}
          >
            <H2
              style={[
                styles.btnText,
                typography.font16,
                typography.fontLato,
                typography.textLight,
                language === "en"
                  ? typography.textLight
                  : typography.textPrimary,
              ]}
            >
              English
            </H2>
          </Button>

          {/* Hindi Button */}
          <Button
            style={getButtonStyle("hi")}
            onPress={() => selectLanguage("hi")}
          >
            <H2
              style={[
                styles.btnText,
                typography.font16,
                typography.fontLato,
                typography.textPrimary,
                language === "hi"
                  ? typography.textLight
                  : typography.textPrimary,
              ]}
            >
              हिंदी
            </H2>
          </Button>
        </View>
        <View style={spacing.mv5}>
          {internal.map((item, index) => (
            <MenuItem
              key={index}
              label={t(item.label)}
              icon={item.icon}
              onPress={() => navigation.navigate(item.page)}
            />
          ))}
        </View>
      </View>
    </ContainerComponent>
  );
}
