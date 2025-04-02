import { View } from "react-native";
import moment from "moment";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import StreetLightImages from "../components/StreetLightImages";
import { spacing, styles, typography } from "../styles";
import { P, H5 } from "../components/text";

// Reusable Field Component to display label-value pairs
const InfoField = ({ label, value }) => (
  <View>
    <P
      style={[
        typography.font12,
        typography.fontLato,
        { textTransform: "uppercase" },
      ]}
    >
      {label}
    </P>
    <P style={[typography.font12]}>{value}</P>
  </View>
);

const InstalledField = ({ label, value }) => (
  <View>
    <P
      style={[
        typography.font12,
        typography.fontLato,
        typography.textBold,
        { textTransform: "uppercase" },
      ]}
    >
      {label}
    </P>
    <P style={[typography.font12]}>{value}</P>
  </View>
);

const StreetLightDetailsScreen = ({ route }) => {
  const { item } = route.params;
  const isInstalled = item.isInstalled;

  return (
    <ContainerComponent>
      <MyHeader
        title={`${item.district}, ${item.state}`}
        isBack={true}
        hasIcon={true}
      />

      <View style={[spacing.p2, { width: "100%" }]}>
        {/* Pole Number */}
        <View style={[spacing.br2, spacing.p2, { backgroundColor: "#5D92F4" }]}>
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

        {/* Submission Date and Beneficiary Contact */}
        <View style={[styles.row, spacing.pv2]}>
          <InfoField
            label="Submission Date"
            value={moment(item.submission_date).format("DD/MM/YYYY HH:mm A")}
          />
          <InfoField
            label="Beneficiary Contact"
            value={item.beneficiary_contact}
          />
        </View>

        {/* Project Manager and Site Engineer */}
        <View
          style={[
            styles.row,
            spacing.pv2,
            { borderTopWidth: 1, borderColor: "#ddd" },
          ]}
        >
          <InfoField
            label="Project Manager"
            value={item.project_manager_name}
          />
          <InfoField label="Site Engineer" value={item.site_engineer_name} />
        </View>

        {/* Conditionally Render Installed Fields */}
        {isInstalled && (
          <>
            <View
              style={[
                styles.row,
                spacing.pv2,
                { borderTopWidth: 1, borderColor: "#ddd" },
              ]}
            >
              <InstalledField label="Battery Qr" value={item.battery_qr} />
              <InstalledField label="Luminary Qr" value={item.luminary_qr} />
            </View>

            <View
              style={[
                styles.row,
                spacing.pv2,
                { borderTopWidth: 1, borderColor: "#ddd" },
              ]}
            >
              <InstalledField label="Sim Number" value={item.sim_number} />
              <InstalledField label="Panel Qr" value={item.panel_qr} />
            </View>
          </>
        )}

        {/* Beneficiary and Remarks */}
        <View style={[styles.row, spacing.pv2]}>
          <InfoField label="Beneficiary" value={item.beneficiary} />
          <InfoField label="Remarks" value={item.remarks} />
        </View>

        {/* Longitude and Latitude */}
        <View style={[styles.row, spacing.bbw05]}>
          <InfoField label="Longitude" value={item.installed_location?.lng} />
          <InfoField label="Latitude" value={item.installed_location?.lat} />
        </View>

        {/* Survey Images */}
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
