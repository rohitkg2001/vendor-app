import { useState } from "react";
import { View, ScrollView } from "react-native";
import { SCREEN_WIDTH, typography } from "../styles";
import MyHeader from "../components/header/MyHeader";
import ContainerComponent from "../components/ContainerComponent";
import { H5 } from "../components/text";
import { viewDetailsReducer, SET_VIEW_TYPE } from "../redux/reducers/viewDetailsReducer";

const ViewDetailScreen = ({ route }) => {
  const { site, formType } = route.params;
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const renderDetailRow = (label, value) => (
    <View style={{ flexDirection: "row", paddingVertical: 8 }}>
      <H5 style={[typography.textBold]}>{label}</H5>
      <H5 style={[typography.font16, { textAlign: "right", flex: 1 }]}>
        {value}
      </H5>
    </View>
  );

  const renderSiteDetails = () => (
    <>
      {renderDetailRow("Site Name", site.siteName)}
      {renderDetailRow("State", site.state)}
      {renderDetailRow("District", site.dist)}
      {renderDetailRow("Location", site.location)}
      {renderDetailRow("Project Serial Code", site.projectSerialCode)}
      {renderDetailRow("Project Capacity", site.ProjectCapacity)}
      {renderDetailRow("CA Number", site.cANumber)}
      {renderDetailRow("I&C Vendor Name", site.iCVendorName)}
      {renderDetailRow("Contact No", site.ContactNo)}
    </>
  );

  const renderProjectDetails = () => (
    <>
      {renderDetailRow("Project Name", site.projectName)}
      {renderDetailRow("Duration", site.duration)}
      {renderDetailRow("Status", site.status)}
      {renderDetailRow("Project Serial", site.projectSerial)}
      {renderDetailRow("Site Name", site.siteName)}
      {renderDetailRow("Sanction Load", site.sanctionLoad)}
      {renderDetailRow("Project Capacity", site.projectCapacity)}
      {renderDetailRow("CA Number", site.caNumber)}
      {renderDetailRow("Survey Status", site.surveyStatus)}
      {renderDetailRow("Contact No", site.contactNo)}
      {renderDetailRow("Solar Meter Serial", site.solarMeterSerial)}
      {renderDetailRow("Vendor Name", site.vendorName)}
    </>
  );

  const renderVendorDetails = () => (
    <>
      {renderDetailRow("Vendor Name", site.name)}
      {renderDetailRow("Mail ID", site.mailId)}
      {renderDetailRow("Contact No", site.contactNumber)}
      {renderDetailRow("Location", site.location)}
      {renderDetailRow("GST Number", site.gstNumber)}
      {renderDetailRow("Status", site.status)}
    </>
  );

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
            {formType === "vendor"
              ? renderVendorDetails()
              : site.projectName
                ? renderProjectDetails()
                : renderSiteDetails()}
          </View>
        </ScrollView>
      </View>
    </ContainerComponent>
  );
};

export default ViewDetailScreen;
