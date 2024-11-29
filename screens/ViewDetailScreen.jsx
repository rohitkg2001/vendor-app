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
      {renderDetailRow("Contact No", site.contact_number)}
      {renderDetailRow("Project Serial Code", site.project_Serial_Code)}
      {renderDetailRow("Project Capacity", site.project_Capacity)}
      {renderDetailRow("CA Number", site.cANumber)}
      {renderDetailRow("Sanction Load", site.sanctionLoad)}
      {renderDetailRow("Meter Number", site.meterNumber)}
      {renderDetailRow("Load Enhancement Status", site.loadEnhancementStatus)}
      {renderDetailRow("Site Survey Status", site.siteSurveyStatus)}
      {renderDetailRow("Net Meter Sr No", site.net_meter_no)}
      {renderDetailRow("Solar Meter Sr NO", site.solar_meter_no)}
      {renderDetailRow("Material Inspection Date", site.material_dispatch_date)}
      {renderDetailRow("SPP INSTALLATION DATE", site.material_inspection_date)}
      {renderDetailRow("COMMISSIONING DATE", site.commissioning_date)}
      {renderDetailRow("Remarks", site.remarks)}
      {renderDetailRow("I & C Vendor Name", site.iCVendorName)}
    </>
  );

  const renderProjectDetails = () => (
    <>
      {renderDetailRow("Project Name", site.projectName)}
      {renderDetailRow("Work Order Number", site.workOrderNumber)}
      {renderDetailRow("Price", site.price)}
      {renderDetailRow("Start Date", site.startDate)}
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
