import { useState } from "react";
import { View, ScrollView } from "react-native";
import { SCREEN_WIDTH, typography , spacing } from "../styles";
import MyHeader from "../components/header/MyHeader";
import ContainerComponent from "../components/ContainerComponent";
import { H5 } from "../components/text";
import { useTranslation } from "react-i18next";

const ViewDetailScreen = ({ route }) => {
  const { site, formType } = route.params;
  const [ isMenuVisible, setIsMenuVisible ] = useState( false );
    const [activeTab, setActiveTab] = useState("Sites");
  const { t } = useTranslation();

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
      {renderDetailRow("Site Name", site.site_name)}
      {renderDetailRow("State", site.state)}
      {renderDetailRow("District", site.dist)}
      {renderDetailRow("Location", site.location)}
      {renderDetailRow("Contact No", site.contact_no)}
      {renderDetailRow("Project Serial Code", site.project_serial_code)}
      {renderDetailRow("Project Capacity", site.project_capacity)}
      {renderDetailRow("CA Number", site.ca_number)}
      {renderDetailRow("Sanction Load", site.sanction_load)}
      {renderDetailRow("Meter Number", site.meter_number)}
      {renderDetailRow("Load Enhancement Status", site.load_enhancement_status)}
      {renderDetailRow("Site Survey Status", site.site_survey_status)}
      {renderDetailRow("Net Meter Sr No", site.net_meter_sr_no)}
      {renderDetailRow("Solar Meter Sr NO", site.solar_meter_sr_no)}
      {renderDetailRow("Material Inspection Date", site.material_dispatch_date)}
      {renderDetailRow("SPP INSTALLATION DATE", site.material_inspection_date)}
      {renderDetailRow("COMMISSIONING DATE", site.commissioning_date)}
      {renderDetailRow("Remarks", site.remarks)}
      {renderDetailRow("I & C Vendor Name", site.ic_vendor_name)}
    </>
  );

  const renderProjectDetails = () => (
    <>
      {renderDetailRow("Project Name", site.project_name)}
      {renderDetailRow("Work Order Number", site.work_order_number)}
      {renderDetailRow("Start Date", site.start_date)}

      <View style={{ flex: 1, paddingVertical: 40, marginLeft: 20 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[spacing.pv4, spacing.ph4]}
        >
          {["Sites", "Inventory", "Tasks"].map((tab) => (
            <View key={tab} style={[spacing.mh4]}>
              <H5
                onPress={() => setActiveTab(tab)}
                style={[
                  typography.textBold,
                  {
                    color: activeTab === tab ? "#000000" : "#888888",
                  },
                ]}
              >
                {tab.toUpperCase()}
              </H5>

              {activeTab === tab && (
                <View
                  style={{
                    height: 4,
                    backgroundColor: "#76885B",
                    width: "80%",
                    marginTop: 4,
                  }}
                />
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
  
  const renderVendorDetails = () => (
    <>
      {renderDetailRow("Vendor Name", site.name)}
      {renderDetailRow("Mail ID", site.email)}
      {renderDetailRow("Contact Number", site.contact_no)}
      {renderDetailRow("Aadhar Number", site.aadhar_number)}
      {renderDetailRow("Account Name", site.account_name)}
      {renderDetailRow("Ifsc", site.ifsc)}
      {renderDetailRow("Bank Name", site.bank_name)}
      {renderDetailRow("Gst Number", site.gst_number)}
      {renderDetailRow("Pan Number", site.pan_number)}
      {renderDetailRow("Status", site.status)}
    </>
  );

  return (
    <ContainerComponent>
      <View style={[{ width: SCREEN_WIDTH - 16 }]}>
        <MyHeader
          title={
            formType === "vendor"
              ? t("vendor_details")
              : formType === "project"
                ? t('project_overview')
                : t("site_details")
          }
          isBack={true}
          hasIcon={true}
          onIconPress={() => setIsMenuVisible(!isMenuVisible)}
        />
        <ScrollView contentContainerStyle>
          <View>
            {formType === "vendor"
              ? renderVendorDetails()
              : formType === "project"
                ? renderProjectDetails()
                : renderSiteDetails()}
          </View>
        </ScrollView>
      </View>
    </ContainerComponent>
  );
};
export default ViewDetailScreen;
