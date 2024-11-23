import Button from "../components/buttons/Button";
import { styles } from "../styles/components.styles";
import { H2, H4, H5, H6, P, Span } from "../components/text";
import { typography, SCREEN_WIDTH, spacing, PRIMARY_COLOR } from "../styles";
import ImageSource from '../assets/welcomeImage.png'
import MyImageBackground from "./MyImageBackground";
import Icon from 'react-native-vector-icons/Ionicons'
import { ICON_SMALL } from "../styles/constant";
import { View } from "react-native";

export default function LanguageSelector({ onSelectLanguage }) {
  return (
    <MyImageBackground imageSource={ImageSource}>
      <H4 style={[typography.textDark, typography.textBold, spacing.mh2]}>
        Almost there! Now manage your projects easily with Sugs Lloyd
      </H4>
      <View style={[styles.row, spacing.mh2, spacing.mv1, spacing.mt5, { justifyContent: 'flex-start', alignItems: "center" }]}>
        <Icon name="checkmark-circle" size={ICON_SMALL} color={PRIMARY_COLOR} />
        <P style={{ lineHeight: 30 }}>Manage and track your tasks easily</P>
      </View>
      <View style={[styles.row, spacing.mh2, spacing.mv1, { justifyContent: 'flex-start', alignItems: "center" }]}>
        <Icon name="checkmark-circle" size={ICON_SMALL} color={PRIMARY_COLOR} />
        <P style={{ lineHeight: 30 }}>Manage and track your tasks easily</P>
      </View>
      <View style={[styles.row, spacing.mh2, spacing.mv1, { justifyContent: 'flex-start', alignItems: "center" }]}>
        <Icon name="checkmark-circle" size={ICON_SMALL} color={PRIMARY_COLOR} />
        <P style={{ lineHeight: 30 }}>Manage and track your tasks easily</P>
      </View>
      <View style={[styles.row, spacing.mh2, spacing.mv1, spacing.mb5, { justifyContent: 'flex-start', alignItems: "center" }]}>
        <Icon name="checkmark-circle" size={ICON_SMALL} color={PRIMARY_COLOR} />
        <P style={{ lineHeight: 30 }}>Manage and track your tasks easily</P>
      </View>
      <Span style={[typography.font16, spacing.mt5, spacing.mh2]}>
        Please select your preferred language:
      </Span>
      <Button
        style={[
          styles.btn,
          styles.bgPrimary,
          spacing.m1,
          spacing.br5,
          { width: SCREEN_WIDTH - 16, justifyContent: 'center' },
        ]}
        onPress={() => onSelectLanguage("en")}
      >
        <H2 style={[styles.btnText, typography.font20, typography.textLight]}>
          English
        </H2>
      </Button>

      <Button
        style={[
          styles.btn,
          styles.bgLight,
          spacing.m1,
          spacing.bw2,
          spacing.br5,
          { width: SCREEN_WIDTH - 16, justifyContent: 'center', borderColor: PRIMARY_COLOR }
        ]}
        onPress={() => onSelectLanguage("hi")}
      >
        <H2 style={[styles.btnText, typography.font20, typography.textPrimary]}>
          हिंदी
        </H2>
      </Button>
    </MyImageBackground>
  );
};
