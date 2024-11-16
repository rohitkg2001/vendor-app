import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import MyHeader from "../components/header/MyHeader";
import { H6, H2, P } from "../components/text";
import { styles } from "../styles/components.styles";
import ContainerComponent from "../components/ContainerComponent";

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
            At Dashandots Technology, we deeply value your privacy and are
            committed to safeguarding the personal information you share with
            us. We collect essential personal information, including but not
            limited to your name, email address, and contact details, to ensure
            the efficient delivery of our services, enhance user experience, and
            better understand your needs. We assure you that we do not sell,
            rent, or trade your personal information to any third parties
            without your explicit consent, unless mandated by legal
            requirements. Your data may only be shared with trusted partners or
            service providers who assist us in operating our app or conducting
            our business, and even then, only under strict confidentiality
            agreements. To ensure the security of your personal information, we
            have implemented robust security measures designed to protect
            against unauthorized access, misuse, or disclosure. These measures
            are continually updated to adapt to evolving security threats and
            industry standards.
          </P>
        </ScrollView>
      </View>
    </ContainerComponent>
  );
};
export default PrivacyPolicy;
