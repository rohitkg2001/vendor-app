import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import MyHeader from "../components/header/MyHeader";
import { P } from "../components/text";
import { styles } from "../styles/components.styles";
import ContainerComponent from "../components/ContainerComponent";
import { PRIVACY_POLICY } from "../utils/faker";

const PrivacyPolicy = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
    console.log("Checkbox state changed:", !isChecked);
  };

  return (
    <ContainerComponent>
      <View style={styles.container}>
        <MyHeader
          title="Privacy Policy"
          isBack={true}
          hasIcon={true}
          icon={""}
        />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <P style={{ marginHorizontal: 2, textAlign: "justify" }}>
            {
              PRIVACY_POLICY
            }
          </P>
        </ScrollView>
      </View>
    </ContainerComponent>
  );
};
export default PrivacyPolicy;
