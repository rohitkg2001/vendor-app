import { useState } from "react";
import { View, ScrollView } from "react-native";
import MyHeader from "../components/header/MyHeader";
import { P } from "../components/text";
import { styles } from "../styles/components.styles";
import ContainerComponent from "../components/ContainerComponent";
import { PRIVACY_POLICY } from "../utils/faker";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const [isChecked, setIsChecked] = useState(false);
  const { t } = useTranslation()

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <ContainerComponent>
      <View style={styles.container}>
        <MyHeader
          title={t('privacy_policy_title')}
          isBack={true}
          hasIcon={true}
          icon={""}
        />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <P style={{ marginHorizontal: 2, textAlign: "justify" }}>
            {PRIVACY_POLICY}
          </P>
        </ScrollView>
      </View>
    </ContainerComponent>
  );
};
export default PrivacyPolicy;
