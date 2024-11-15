import React from "react";
import { View } from "react-native";
import MyHeader from "../components/header/MyHeader";
import MyImageBackground from "../components/MyImageBackground";
import ContainerComponent from "../components/ContainerComponent";
import { H4 } from "../components/text";

const NoRecord = () => {
  return (
    <ContainerComponent>
      <View>
        <MyHeader title="Project Overview " isBack={true} hasIcon={true} />

        <MyImageBackground imageSource={require("../assets/norecode.png")}>
          <View>
            <H4>No records found</H4>
          </View>
        </MyImageBackground>
      </View>
    </ContainerComponent>
  );
};

export default NoRecord;
