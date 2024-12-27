import React from "react";
import { View, ScrollView } from "react-native";
import { SCREEN_WIDTH, typography, spacing } from "../styles";
import MyHeader from "../components/header/MyHeader";
import ContainerComponent from "../components/ContainerComponent";
import { H5 } from "../components/text";
import { useTranslation } from "react-i18next";

const SiteDetailScreen = ({ route }) => {
  const { site } = route.params;
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
      {renderDetailRow("District", site.district)}
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
      {renderDetailRow(
        "Material Inspection Date",
        site.material_inspection_date
      )}
      {renderDetailRow("SPP INSTALLATION DATE", site.spp_installation_date)}
      {renderDetailRow("COMMISSIONING DATE", site.commissioning_date)}
      {renderDetailRow("Remarks", site.remarks)}
      {renderDetailRow("I & C Vendor Name", site.ic_vendor_name)}
      {renderDetailRow("Site Engineer", site.site_engineer)}
    </>
  );
  
  return (
    <ContainerComponent>
      <View style={[{ width: SCREEN_WIDTH - 16 }]}>
        <MyHeader title={t("site_details")} isBack={true} hasIcon={false} />
        <ScrollView contentContainerStyle={{ padding: spacing.p4 }}>
          <View>{renderSiteDetails()}</View>
        </ScrollView>
      </View>
    </ContainerComponent>
  );
};

export default SiteDetailScreen;
