import { View } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import StreetLightImages from "../components/StreetLightImages";
import { spacing, styles, typography } from "../styles";
import { P, H5 } from "../components/text";

const StreetLightDetailsScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <ContainerComponent>
      <MyHeader
        title={`${item.district}, ${item.state}`}
        isBack={true}
        hasIcon={true}
      />

      <View
        style={[
          spacing.p2,
          {
            width: "100%",
          },
        ]}
      >
        <View
          style={[
            spacing.br2,
            spacing.p2,
            {
              backgroundColor: "#5D92F4",
            },
          ]}
        >
          <H5
            style={[
              typography.font14,
              typography.fontLato,
              { color: "#FFFFFF" },
            ]}
          >
            {item.complete_pole_number}
          </H5>

          <P
            style={[
              typography.font14,
              typography.fontLato,
              spacing.mb2,
              { color: "#FFFFFF" },
            ]}
          >
            {item.panchayat}, {item.block}, {item.ward} - {item.state}
          </P>
        </View>

        <View style={[styles.row, spacing.pv2]}>
          <View>
            <P
              style={[
                typography.font12,
                typography.fontLato,
                {
                  textTransform: "uppercase",
                },
              ]}
            >
              Start Date
            </P>
            <P style={[typography.font12]}>{item.start_date}</P>
          </View>
          <View>
            <P
              style={[
                typography.font12,
                typography.fontLato,
                {
                  textTransform: "uppercase",
                },
              ]}
            >
              End Date
            </P>
            <P style={[typography.font12]}>{item.end_date}</P>
          </View>
        </View>

        <View
          style={[
            styles.row,
            spacing.pv2,
            {
              borderTopWidth: 1,
              borderColor: "#ddd",
            },
          ]}
        >
          <View>
            <P
              style={[
                typography.font12,
                typography.fontLato,
                typography.textBold,
                {
                  textTransform: "uppercase",
                },
              ]}
            >
              Project Manager
            </P>
            <P style={[typography.font12]}>{item.project_manager_name}</P>
          </View>
          <View>
            <P
              style={[
                typography.font12,
                typography.fontLato,
                typography.textBold,
                {
                  textTransform: "uppercase",
                },
              ]}
            >
              Site Engineer
            </P>
            <P style={[typography.font12]}>{item.site_engineer_name}</P>
          </View>
        </View>

        <View style={[styles.row, spacing.pv2]}>
          <View>
            <P
              style={[
                typography.font12,
                typography.fontLato,
                {
                  textTransform: "uppercase",
                },
              ]}
            >
              Beneficiary
            </P>
            <P style={[typography.font12]}>{item.beneficiary}</P>
          </View>
          <View>
            <P
              style={[
                typography.font12,
                typography.fontLato,
                {
                  textTransform: "uppercase",
                },
              ]}
            >
              Remarks
            </P>
            <P style={[typography.font12]}>{item.remarks}</P>
          </View>
        </View>

        <View style={[styles.row, spacing.bbw05]}>
          <View>
            <P
              style={[
                typography.font12,
                typography.fontLato,
                {
                  textTransform: "uppercase",
                },
              ]}
            >
              Longitude
            </P>
            <P style={[typography.font12]}>{item.installed_location?.lng}</P>
          </View>
          <View>
            <P
              style={[
                typography.font12,
                typography.fontLato,

                {
                  textTransform: "uppercase",
                },
              ]}
            >
              Latitude
            </P>
            <P style={[typography.font12]}>{item.installed_location?.lat}</P>
          </View>
        </View>

        {Array.isArray(item.survey_image) && item.survey_image.length > 0 && (
          <View style={{ marginTop: 12 }}>
            <StreetLightImages source={item.survey_image} />
          </View>
        )}
      </View>
    </ContainerComponent>
  );
};

export default StreetLightDetailsScreen;
