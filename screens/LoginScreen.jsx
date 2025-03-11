import { useState } from "react"; //First import from react
import {
  KeyboardAvoidingView,
  View,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native"; //Second import from react native
// Then import from node modules
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";

// Import components
import MyImageBackground from "../components/MyImageBackground";
import { H1, H5, Span, H2, P } from "../components/text";
import MyTextInput from "../components/input/MyTextInput";
import Button from "../components/buttons/Button";
// import reducers(action,reducer)
import { login } from "../redux/actions/vendorActions";
import { alertMessage } from "../utils/faker";
// import styles
import { layouts, spacing, typography, ICON_LARGE, styles } from "../styles";

export default function LoginScreen({ navigation, route }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const nextScreen = route.params?.nextScreen || "homeScreen";

  const onSubmit = async () => {
    setError("");
    try {
      const result = await dispatch(login(username, password));
      if (result) {
        navigation.navigate(nextScreen);
      } else {
        setError(t("credentialError"));
      }
    } catch (error) {
      setError(t("catchError"));
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <MyImageBackground imageSource={require("../assets/Login.png")}>
      <ScrollView style={{ flex: 1 }}>
        <View style={[layouts.center, spacing.mv5]}>
          <H2 style={[spacing.mt2, typography.fontLato]}>{t("loginTitle")}</H2>
          <P style={[spacing.mb5, typography.fontLato]}>{t("loginSubtitle")}</P>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={spacing.mb5}
        >
          <MyTextInput
            title="Username"
            type="email"
            placeholder="abc@xyz.com"
            value={username}
            onChangeText={setUsername}
          />
          <View style={[{ position: "relative" }]}>
            <MyTextInput
              title="Password"
              type="password"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 12,
                top: 34,
              }}
              onPress={togglePasswordVisibility}
            >
              <Icon
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={ICON_LARGE}
              />
            </TouchableOpacity>
          </View>

          {error ? (
            <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
          ) : null}
          <TouchableOpacity
            onPress={() =>
              alertMessage({
                title: "Forgot Password",
                message:
                  "Forgot your password? Don’t worry—we’re here to help! Please contact your admin for assistance with resetting your password and getting back into your account quickly",
                positiveText: "OK",
              })
            }
          >
            <Span style={[styles.rightLink, typography.fontLato]}>{t("forgotPasswordText")}</Span>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <Button
          style={[styles.btn, styles.bgPrimary, { justifyContent: "center" }]}
          onPress={onSubmit}
        >
          <H2 style={[typography.textBold, typography.textUpper, typography.font20, typography.textLight, typography.fontLato]}>
            {t("loginBtnText")}
          </H2>
        </Button>
      </ScrollView>
    </MyImageBackground>
  );
}
