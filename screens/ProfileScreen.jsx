import React, { useState } from "react";
import { View } from "react-native";
import PersonalInfo from "../components/PersonalInfo";
import DocumentsList from "../components/DocumentsList";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { vendor } from "../utils/faker";
import { LIGHT, PRIMARY_COLOR, styles } from "../styles";
import TabNavigation from "../components/TabNavigation";
import CardFullWidth from "../components/card/CardFullWidth";
import Avatar from "../components/Avatar";

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState("Personal");

  const renderContent = () => {
    if (activeTab === "Personal") {
      return <PersonalInfo data={vendor} />;
    } else if (activeTab === "Document") {
      return <DocumentsList documentData={vendor} />;
    }
    return null;
  };

  return (
    <ContainerComponent>
      <MyHeader title="My Profile" isBack={true} hasIcon={true} />
      <CardFullWidth backgroundColor={PRIMARY_COLOR}>
        <View style={styles.row}>
          <Avatar
            avatar={vendor.image}
            name={`${vendor.first_name} ${vendor.last_name}`}
            online={false}
          />
        </View>
      </CardFullWidth>
      <TabNavigation
        tabs={["Personal", "Document"]} 
        currentTab={activeTab}
        setCurrentTab={setActiveTab}
      />
      {renderContent()}
    </ContainerComponent>
  );
};

export default ProfileScreen;
