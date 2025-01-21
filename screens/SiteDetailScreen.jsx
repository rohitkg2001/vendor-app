import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { SCREEN_WIDTH, typography, spacing, styles } from "../styles";
import MyHeader from "../components/header/MyHeader";
import ContainerComponent from "../components/ContainerComponent";
import { H5, P, Span } from "../components/text";
import { useTranslation } from "react-i18next";

const SiteDetailScreen = ({ route }) => {
  const { site } = route.params;
  const { t } = useTranslation();
  const [Site, setSite] = useState({
    site_name: "",
    state: "",
    district: "",
    location: "",
    contact_no: "",
    project_serial_code: "",
    project_capacity: "",
    ca_number: "",
    sanction_load: "",
    meter_number: "",
    load_enhancement_status: "",
    site_survey_status: "",
    net_meter_sr_no: "",
    solar_meter_sr_no: "",
    material_inspection_date: "",
    spp_installation_date: "",
    commissioning_date: "",
    remarks: "",
    ic_vendor_name: "",
    site_engineer: "",
  });

  return (
    <ContainerComponent>
      <View style={[{ width: SCREEN_WIDTH - 16 }]}>
        <MyHeader isBack title={t("Site Details")} hasIcon />
        <ScrollView stickyHeaderIndices={[1]}>
          <View>
            <View style={[styles.row]}>
              <H5 style={[typography.font16, { textAlign: "left" }]}>
                Site Name
              </H5>
              <P
                style={[typography.font16, spacing.pv1, { textAlign: "right" }]}
              >
                {site.site_name}
              </P>
            </View>

            <View style={[styles.row, spacing.pv2]}>
              <H5 style={[typography.font16, { textAlign: "left" }]}>State</H5>
              <P style={[typography.font16, { textAlign: "right" }]}>
                {site.state}
              </P>
            </View>
            <View style={[styles.row, spacing.pv2]}>
              <H5 style={[typography.font16, { textAlign: "left" }]}>
                District
              </H5>
              <P style={[typography.font16, { textAlign: "right" }]}>
                {site.district}
              </P>
            </View>
            <View style={[styles.row, spacing.pv2]}>
              <H5 style={[typography.font16, { textAlign: "left" }]}>
                Location
              </H5>
              <P style={[typography.font16, { textAlign: "right" }]}>
                {site.location}
              </P>
            </View>
            <View style={[styles.row, spacing.pv2]}>
              <H5 style={[typography.font16, { textAlign: "left" }]}>
                Contact No
              </H5>
              <P style={[typography.font16, { textAlign: "right" }]}>
                {site.contact_no}
              </P>
            </View>
            <View style={[styles.row, spacing.pv2]}>
              <H5 style={[typography.font16, { textAlign: "left" }]}>
                Project Serial Code
              </H5>
              <P style={[typography.font16, { textAlign: "right" }]}>
                {site.project_serial_code}
              </P>
            </View>
            <View style={[styles.row, spacing.pv2]}>
              <H5 style={[typography.font16, { textAlign: "left" }]}>
                Project Capacity
              </H5>
              <P style={[typography.font16, { textAlign: "right" }]}>
                {site.project_capacity}
              </P>
            </View>
            <View style={[styles.row, spacing.pv2]}>
              <H5 style={[typography.font16, { textAlign: "left" }]}>
                Ca Number
              </H5>
              <P style={[typography.font16, { textAlign: "right" }]}>
                {site.ca_number}
              </P>
            </View>
            <View style={[styles.row, spacing.pv2]}>
              <H5 style={[typography.font16, { textAlign: "left" }]}>
                Sanction Load
              </H5>
              <P style={[typography.font16, { textAlign: "right" }]}>
                {site.sanction_load}
              </P>
            </View>
            <View style={[styles.row, spacing.pv2]}>
              <H5 style={[typography.font16, { textAlign: "left" }]}>
                Meter Number
              </H5>
              <P style={[typography.font16, { textAlign: "right" }]}>
                {site.meter_number}
              </P>
            </View>
            <View style={[styles.row, spacing.pv2]}>
              <H5 style={[typography.font16, { textAlign: "left" }]}>
                Load Enhancement Status
              </H5>
              <P style={[typography.font16, { textAlign: "right" }]}>
                {site.load_enhancement_status}
              </P>
            </View>
            <View style={[styles.row, spacing.pv2]}>
              <H5 style={[typography.font16, { textAlign: "left" }]}>
                Site Survey Status
              </H5>
              <P style={[typography.font16, { textAlign: "right" }]}>
                {site.site_survey_status}
              </P>
            </View>
            <View style={[styles.row, spacing.pv2]}>
              <H5 style={[typography.font16, { textAlign: "left" }]}>
                Net Meter Sr No
              </H5>
              <P style={[typography.font16, { textAlign: "right" }]}>
                {site.net_meter_sr_no}
              </P>
            </View>
            <View style={[styles.row, spacing.pv2]}>
              <H5 style={[typography.font16, { textAlign: "left" }]}>
                Solar Meter Sr No
              </H5>
              ;
              <P style={[typography.font16, { textAlign: "right" }]}>
                {site.solar_meter_sr_no}
              </P>
            </View>
            <View style={[styles.row, spacing.pv2]}>
              <H5 style={[typography.font16, { textAlign: "left" }]}>
                Material Inspection Date
              </H5>

              <P style={[typography.font16, { textAlign: "right" }]}>
                {site.material_inspection_date}
              </P>
            </View>
            <View style={[styles.row, spacing.pv2]}>
              <H5 style={[typography.font16, { textAlign: "left" }]}>
                Spp Installation Date
              </H5>

              <P style={[typography.font16, { textAlign: "right" }]}>
                {site.spp_installation_date}
              </P>
            </View>
            <View style={[styles.row, spacing.pv2]}>
              <H5 style={[typography.font16, { textAlign: "left" }]}>
                Commissioning Date
              </H5>

              <P style={[typography.font16, { textAlign: "right" }]}>
                {site.commissioning_date}
              </P>
            </View>
            <View style={[styles.row, spacing.pv2]}>
              <H5 style={[typography.font16, { textAlign: "left" }]}>
                Remarks
              </H5>

              <P style={[typography.font16, { textAlign: "right" }]}>
                {site.remarks}
              </P>
            </View>
            <View style={[styles.row, spacing.pv2]}>
              <H5 style={[typography.font16, { textAlign: "left" }]}>
                I & C Vendor Name
              </H5>

              <P style={[typography.font16, { textAlign: "right" }]}>
                {site.ic_vendor_name}
              </P>
            </View>
            <View style={[styles.row, spacing.pv2]}>
              <H5 style={[typography.font16, { textAlign: "left" }]}>
                Site Engineer
              </H5>

              <P style={[typography.font16, { textAlign: "right" }]}>
                {site.site_engineer}
              </P>
            </View>
            <View style={[styles.row, spacing.pv2]}>
              <H5 style={[typography.font16, { textAlign: "left" }]}>
                Site Engineer
              </H5>

              <P style={[typography.font16, { textAlign: "right" }]}>
                {site.site_engineer}
              </P>
            </View>
          </View>
        </ScrollView>
      </View>
    </ContainerComponent>
  );
};

export default SiteDetailScreen;
