
export const SET_VIEW_TYPE = "SET_VIEW_TYPE";

const initialState = {
  details: null,
}

export const viewDetailsReducer = (state, action) => {
  switch (action.type) {
    case SET_VIEW_TYPE:
      const { formType, site } = action.payload;
      let details;

      if (formType === "vendor") {
        details = renderVendorDetails(site);
      } else if (site.projectName) {
        details = renderProjectDetails(site);
      } else {
        details = renderSiteDetails(site);
      }

      return {
        ...state,
        details,
      };
    default:
      return state;
  }
};

const renderDetailRow = (label, value) => (
  <View style={{ flexDirection: "row", paddingVertical: 8 }}>
    <H5 style={[typography.textBold]}>{label}</H5>
    <H5 style={[typography.font16, { textAlign: "right", flex: 1 }]}>{value}</H5>
  </View>
);

const renderSiteDetails = (site) => (
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

const renderProjectDetails = (site) => (
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

const renderVendorDetails = (site) => (
  <>
    {renderDetailRow("Vendor Name", site.name)}
    {renderDetailRow("Mail ID", site.mailId)}
    {renderDetailRow("Contact No", site.contactNumber)}
    {renderDetailRow("Location", site.location)}
    {renderDetailRow("GST Number", site.gstNumber)}
    {renderDetailRow("Status", site.status)}
  </>
);
