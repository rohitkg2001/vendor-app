// import React, { useEffect } from "react";
// import { View, TouchableOpacity } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// import { P, Span } from "../text";
// import { PRIMARY_COLOR, spacing, styles, typography } from "../../styles";

// const ClickableCard2 = ({
//   // navigation,
//   title,
//   subtitle,
//   submissionDate,
//   endDate,
//   onSubmit,
//   isSurvey,
//   isPositiveButtonVisible = false,
//   positiveAction,
//   positiveText = "Submit",
//   item,
// }) => {
//   const navigation = useNavigation();
//   useEffect(() => {
//     console.log(item);
//   }, []);
//   return (
//     <View style={[styles.card, spacing.mv2, spacing.p2]}>
//       <Span style={[typography.font14, typography.bold]}>{title}</Span>
//       <P style={[typography.font12, typography.fontLato]}>{subtitle}</P>

//       {/* Display Complete Pole Number */}
//       <P
//         style={[
//           typography.font12,
//           typography.fontLato,
//           spacing.mt1,
//           spacing.p1,
//           spacing.br1,
//           {
//             backgroundColor: "#ebf4fb",
//           },
//         ]}
//       >
//         Pole Number: {item.complete_pole_number}
//       </P>

//       <View style={[spacing.mt2, styles.row, { justifyContent: "flex-end" }]}>
//         {isSurvey && (
//           <TouchableOpacity
//             style={{
//               width: 80,
//               padding: 8,
//               borderRadius: 8,
//               backgroundColor: PRIMARY_COLOR,
//               marginRight: 10,
//             }}
//             onPress={onSubmit}
//           >
//             <Span style={{ fontSize: 16, color: "white", textAlign: "center" }}>
//               Submit
//             </Span>
//           </TouchableOpacity>
//         )}

//         <TouchableOpacity
//           style={{
//             width: 80,
//             padding: 8,
//             borderRadius: 8,
//             backgroundColor: PRIMARY_COLOR,
//           }}
//           onPress={() => navigation.navigate("streetlightDetails", { item })}
//         >
//           <Span style={{ fontSize: 16, color: "white", textAlign: "center" }}>
//             View
//           </Span>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default ClickableCard2;

import React, { useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { submitStreetlightTasks } from "../../redux/actions/taskActions";

import { P, Span } from "../text";
import { PRIMARY_COLOR, spacing, styles, typography } from "../../styles";

const ClickableCard2 = ({
  title,
  subtitle,
  isPositiveButtonVisible = false,
  item,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(item);
  }, []);

  const handleSubmit = async () => {
    console.log("submitting");
    const data = {
      task_id: item.id,
      complete_pole_number: [item.complete_pole_number].join("/"),
      luminary_qr: item.luminarySerialNumber,
      sim_number: item.simNumber,
      battery_qr: item.batterySerialNumber,
      panel_qr: item.panelSerialNumber,
      isInstallationDone: true,
      beneficiary: item.beneficiaryName,
      contact: item.contactNumber,
      remarks: item.locationRemarks,
    };

    console.log("working fine");
    await dispatch(submitStreetlightTasks(data));
  };

  return (
    <View style={[styles.card, spacing.mv2, spacing.p2]}>
      <Span style={[typography.font14, typography.bold]}>{title}</Span>
      <P style={[typography.font12, typography.fontLato]}>{subtitle}</P>

      <P
        style={[
          typography.font12,
          typography.fontLato,
          spacing.mt1,
          spacing.p1,
          spacing.br1,
          { backgroundColor: "#ebf4fb" },
        ]}
      >
        Pole Number: {item.complete_pole_number}
      </P>

      <View style={[spacing.mt2, styles.row, { justifyContent: "flex-end" }]}>
        {isPositiveButtonVisible && (
          <TouchableOpacity
            style={{
              width: 80,
              padding: 8,
              borderRadius: 8,
              backgroundColor: PRIMARY_COLOR,
              marginRight: 10,
            }}
            onPress={handleSubmit}
          >
            <Span style={{ fontSize: 16, color: "white", textAlign: "center" }}>
              Submit
            </Span>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={{
            width: 80,
            padding: 8,
            borderRadius: 8,
            backgroundColor: PRIMARY_COLOR,
          }}
          onPress={() => navigation.navigate("streetlightDetails", { item })}
        >
          <Span style={{ fontSize: 16, color: "white", textAlign: "center" }}>
            View
          </Span>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ClickableCard2;
