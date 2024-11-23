import Button from "../components/buttons/Button";
import { styles } from "../styles/components.styles";
import { H2, H4, H6, P } from "../components/text";
import { typography, SCREEN_WIDTH, spacing, PRIMARY_COLOR } from "../styles";
import ImageSource from '../assets/welcomeImage.png'
import MyImageBackground from "./MyImageBackground";

export default function LanguageSelector({ onSelectLanguage }) {
  return (
    <MyImageBackground imageSource={ImageSource}>
      <H4 style={[typography.textDark, typography.textBold, spacing.mh2]}>
        Almost there! Now manage your projects easily with Sugs Lloyd
      </H4>
      <P>

      </P>
      <H6 style={[typography.font20, spacing.mv4, spacing.mh2]}>
        Please select your preferred language:
      </H6>
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
