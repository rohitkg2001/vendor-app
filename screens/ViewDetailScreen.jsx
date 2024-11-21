import React, { useReducer, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { SCREEN_WIDTH, typography } from "../styles";
import MyHeader from "../components/header/MyHeader";
import ContainerComponent from "../components/ContainerComponent";
import { H5 } from "../components/text";
import { viewDetailsReducer, SET_VIEW_TYPE } from "../redux/reducers/viewDetailsReducer";

const ViewDetailScreen = ({ route }) => {
  const { site, formType } = route.params;

  const [state, dispatch] = useReducer(viewDetailsReducer, {
    details: null,
  });

  useEffect(() => {
    dispatch({
      type: SET_VIEW_TYPE,
      payload: { formType, site },
    });
  }, [formType, site]);

  return (
    <ContainerComponent>
      <View style={{ width: SCREEN_WIDTH - 16 }}>
        <MyHeader
          title={
            formType === "vendor"
              ? "Vendor Details"
              : site.projectName
              ? "Project Details"
              : "Site Details"
          }
          isBack={true}
          hasIcon={true}
        />
        <ScrollView contentContainerStyle>
          <View>
            {/* Render the details from the reducer state */}
            {state.details}
          </View>
        </ScrollView>
      </View>
    </ContainerComponent>
  );
};

export default ViewDetailScreen;
