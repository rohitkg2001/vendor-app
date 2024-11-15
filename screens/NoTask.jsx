import React from "react";
import { View } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import MyImageBackground from "../components/MyImageBackground";
import { H4 } from "../components/text";

const NoTask = () => {
  return (
    <ContainerComponent>
      <View>
        <MyHeader title="Task Management " isBack={true} hasIcon={true} />

        <MyImageBackground imageSource={require("../assets/norecode.png")}>
          <View>
            <H4>No tasks available</H4>
          </View>
        </MyImageBackground>
      </View>
    </ContainerComponent>
  );
};

export default NoTask;
