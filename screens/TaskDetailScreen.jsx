import { View, Image } from "react-native";
import MyHeader from "../components/header/MyHeader";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing, styles, typography } from "../styles";
import { H5, P } from "../components/text";
import moment from "moment";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ImageDisplay from "../components/ImageDisplay";

export default function TaskDetailScreen({ navigation }) {
  const { task } = useSelector(state => state.tasks?.currentTask)

  return (
    <ContainerComponent>
      <MyHeader title={"Task details"} isBack={true} hasIcon={true} />
      <View style={{ width: SCREEN_WIDTH - 16 }}>
        <View style={[styles.row]}>
          <H5
            style={[
              typography.font14,
              typography.textBold,
              typography.fontLato,
              { textAlign: "left" },
            ]}
          >
            Site Name
          </H5>
          <P
            style={[
              typography.font14,
              typography.fontLato,
              spacing.pv1,
              { textAlign: "right" },
            ]}
          >
            {task.site.site_name}
          </P>
        </View>
        <View style={[styles.row]}>
          <H5
            style={[
              typography.font14,
              typography.textBold,
              typography.fontLato,
              { textAlign: "left" },
            ]}
          >
            Location
          </H5>
          <P
            style={[
              typography.font14,
              typography.fontLato,
              spacing.pv1,
              { textAlign: "right" },
            ]}
          >
            {task.site.location}
          </P>
        </View>
        <View style={[styles.row]}>
          <H5
            style={[
              typography.font14,
              typography.textBold,
              typography.fontLato,
              { textAlign: "left" },
            ]}
          >
            Breda Sl No
          </H5>
          <P
            style={[
              typography.font14,
              typography.fontLato,
              spacing.pv1,
              { textAlign: "right" },
            ]}
          >
            {task.site.breda_sl_no}
          </P>
        </View>
        <View style={[styles.row]}>
          <H5
            style={[
              typography.font14,
              typography.textBold,
              typography.fontLato,
              { textAlign: "left" },
            ]}
          >
            Activity
          </H5>
          <P
            style={[
              typography.font14,
              typography.fontLato,
              spacing.pv1,
              { textAlign: "right" },
            ]}
          >
            {task.activity}
          </P>
        </View>
        <View style={[styles.row]}>
          <H5
            style={[
              typography.font14,
              typography.textBold,
              typography.fontLato,
              { textAlign: "left" },
            ]}
          >
            Start Date
          </H5>
          <P
            style={[
              typography.font14,
              typography.fontLato,
              spacing.pv1,
              { textAlign: "right" },
            ]}
          >
            {moment(task.start_date).format("DD-MM-YYYY")}
          </P>
        </View>
        <View style={[styles.row]}>
          <H5
            style={[
              typography.font14,
              typography.textBold,
              typography.fontLato,
              { textAlign: "left" },
            ]}
          >
            End Date
          </H5>
          <P
            style={[
              typography.font14,
              typography.fontLato,
              spacing.pv1,
              { textAlign: "right" },
            ]}
          >
            {/* {task.end_date} */}
            {moment(task.end_date).format("DD-MM-YYYY")}
          </P>
        </View>
        <View style={[styles.row]}>
          <H5
            style={[
              typography.font14,
              typography.textBold,
              typography.fontLato,
              { textAlign: "left" },
            ]}
          >
            Status
          </H5>
          <P
            style={[
              typography.font14,
              typography.fontLato,
              spacing.pv1,
              { textAlign: "right" },
            ]}
          >
            {task.status}
          </P>
        </View>
        <View style={[styles.row]}>
          <H5
            style={[
              typography.font14,
              typography.textBold,
              typography.fontLato,
              { textAlign: "left" },
            ]}
          >
            Latitude
          </H5>
          <P
            style={[
              typography.font14,
              typography.fontLato,
              spacing.pv1,
              { textAlign: "right" },
            ]}
          >
            {task.site.survey_latitude}
          </P>
        </View>
        <View style={[styles.row]}>
          <H5
            style={[
              typography.font14,
              typography.textBold,
              typography.fontLato,
              { textAlign: "left" },
            ]}
          >
            Longitude
          </H5>
          <P
            style={[
              typography.font14,
              typography.fontLato,
              spacing.pv1,
              { textAlign: "right" },
            ]}
          >
            {task.site.survey_longitude}
          </P>
        </View>
        <View style={[styles.row]}>
          <H5
            style={[
              typography.font14,
              typography.textBold,
              typography.fontLato,
              { textAlign: "left" },
            ]}
          >
            Submission
          </H5>
          <P
            style={[
              typography.font14,
              typography.fontLato,
              spacing.pv1,
              { textAlign: "right" },
            ]}
          >
            {moment(task.site.updated_at).format("DD-MMM-YYYY HH:mm A")}
          </P>
        </View>
        {
          Array.isArray(task.image) && task.image.length > 0 &&
          <ImageDisplay source={task.image} />
        }
      </View>
    </ContainerComponent>
  );
}
