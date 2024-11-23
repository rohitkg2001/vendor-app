import { View } from "react-native";
import Button from "../components/buttons/Button";
import { styles } from "../styles/components.styles";
import { H2, H3 } from "../components/text";
import { typography, SCREEN_WIDTH, spacing } from "../styles";
import ContainerComponent from "./ContainerComponent";

const LanguageSelector = ({ onSelectLanguage }) => {
  return (
    <ContainerComponent>
      <View style={[spacing.m5, { width: SCREEN_WIDTH - 16 }]}>
        <H3 style={[typography.font20, spacing.mt4]}>
          Please select your preferred language:
        </H3>

        <Button
          style={[
            styles.btn,
            styles.bgPrimary,
            spacing.m1,
            spacing.br5,
            { justifyContent: "center" },
          ]}
          onPress={() => onSelectLanguage("en")}
        >
          <H2 style={[styles.btnText, styles.textLarge, typography.textLight]}>
            English
          </H2>
        </Button>

        <Button
          style={[
            styles.btn,
            styles.bgPrimary,
            spacing.m1,
            spacing.br5,
            { justifyContent: "center" },
          ]}
          onPress={() => onSelectLanguage("hi")}
        >
          <H2 style={[styles.btnText, styles.textLarge, typography.textLight]}>
            हिंदी
          </H2>
        </Button>
      </View>
    </ContainerComponent>
  );
};

export default LanguageSelector;
