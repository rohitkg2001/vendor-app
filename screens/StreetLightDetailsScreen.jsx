import { View } from "react-native";
import moment from "moment";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import StreetLightImages from "../components/StreetLightImages";
import { spacing, styles, typography } from "../styles";
import { P, H5 } from "../components/text";
import { useEffect } from "react";

const StreetLightDetailsScreen = ({ route }) => {
  const { item } = route.params;

  useEffect(() => {
    console.log(item);
  }, []);

  // Check if the data is installed
  const isInstalled = item.isInstalled;

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
              Submission Date
            </P>
            <P style={[typography.font12]}>
              {moment(item.submission_date).format("DD/MM/YYYY HH:mm A")}
            </P>
            <P style={[typography.font12]}>{item.beneficiary_contact}</P>
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

        {/* Conditionally render these fields if the item is installed */}
        {isInstalled && (
          <>
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
                  Battery Qr
                </P>
                <P style={[typography.font12]}>{item.battery_qr}</P>
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
                  Luminary Qr
                </P>
                <P style={[typography.font12]}>{item.luminary_qr}</P>
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
                  Sim Number
                </P>
                <P style={[typography.font12]}>{item.sim_number}</P>
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
                  Panel Qr
                </P>
                <P style={[typography.font12]}>{item.panel_qr}</P>
              </View>
            </View>
          </>
        )}

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
