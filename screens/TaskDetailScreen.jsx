// import react native
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";
//import components
import MyHeader from "../components/header/MyHeader";
import Button from "../components/buttons/Button";
import ContainerComponent from "../components/ContainerComponent";
import ImageDisplay from "../components/ImageDisplay";

// import redux
import { useSelector } from "react-redux";

// import styles
import {
  SCREEN_WIDTH,
  spacing,
  styles,
  typography,
  ICON_LARGE,
} from "../styles";
import { H5, H6, P, Span } from "../components/text";

export default function TaskDetailScreen() {
  const { task } = useSelector((state) => state.tasks?.currentTask);

  return (
    <ContainerComponent>
      {/* <MyHeader title={"Task details"} isBack={true} hasIcon={true} /> */}
      <MyHeader title={`${task.site.site_name}`} isBack={true} hasIcon={true} />

      <View style={{ width: SCREEN_WIDTH - 16 }}>
        <View
          style={[
            styles.row,
            {
              flexWrap: "wrap",
              paddingVertical: spacing.pv1,
            },
          ]}
        >
          <H5
            style={[
              typography.font14,
              typography.fontLato,
              { textAlign: "left", flexShrink: 1 },
            ]}
          >
            {task.site.breda_sl_no},
          </H5>

          <P
            style={[
              typography.font14,
              typography.fontLato,
              {
                flex: 2,
                marginLeft: 8,
                flexShrink: 1,
              },
            ]}
            numberOfLines={task.site.site_name.length > 20 ? 2 : 1}
          >
            {task.site.site_name}
          </P>

          <P
            style={[
              typography.font12,
              typography.fontLato,
              {
                textAlign: "right",
                flex: 1,
                color: "#555",
                marginTop: task.site.site_name.length > 20 ? 4 : 0,
              },
            ]}
          >
            {task.site.location}
          </P>
        </View>

        <View style={[spacing.mt1, styles.row, spacing.mv2]}>
          <View>
            <Span
              style={[
                typography.font10,
                typography.fontLato,
                { textTransform: "uppercase", color: "gray" },
              ]}
            >
              Start date
            </Span>
            <P style={[typography.font12, typography.fontLato]}>
              {moment(task.start_date).format("DD-MM-YYYY")}
            </P>
          </View>
          <View>
            <Span
              style={[
                typography.font10,
                typography.fontLato,
                { textTransform: "uppercase", color: "gray" },
              ]}
            >
              End date
            </Span>
            <P style={[typography.font12, typography.fontLato]}>
              {moment(task.end_date).format("DD-MM-YYYY")}
            </P>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: spacing.pv2,
            width: "100%",
          }}
        >
          <H5
            style={[
              typography.font14,
              typography.textBold,
              typography.fontLato,
              {
                textTransform: "uppercase",
                paddingBottom: 4,
              },
            ]}
          >
            Proof of Work
          </H5>

          {task.status && (
            <H6
              style={[
                typography.font14,
                typography.fontLato,
                {
                  color: task.status === "Completed" ? "green" : "red", // Green for completed, yellow otherwise

                  textAlign: "left",
                },
              ]}
            >
              ({task.status})
            </H6>
          )}
        </View>

        <View style={[spacing.mt1, styles.row, spacing.mv2]}>
          <View>
            <Span
              style={[
                typography.font10,
                typography.fontLato,
                { color: "gray" },
              ]}
            >
              Survey lat
            </Span>
            <P style={[typography.font12, typography.fontLato]}>
              {task.site.survey_latitude}
            </P>
          </View>
          <View>
            <Span
              style={[
                typography.font10,
                typography.fontLato,
                { color: "gray" },
              ]}
            >
              Survey lon
            </Span>
            <P style={[typography.font12, typography.fontLato]}>
              {task.site.survey_longitude}
            </P>
          </View>
        </View>
        <View style={[spacing.mt1, styles.row, spacing.mv2]}>
          <View>
            <Span
              style={[
                typography.font10,
                typography.fontLato,
                { color: "gray" },
              ]}
            >
              Actual lat
            </Span>
            <P style={[typography.font12, typography.fontLato]}>
              {task.site.actual_latitude}
            </P>
          </View>
          <View>
            <Span
              style={[
                typography.font10,
                typography.fontLato,
                { color: "gray" },
              ]}
            >
              Actual lon
            </Span>
            <P style={[typography.font12, typography.fontLato]}>
              {task.site.actual_longitude}
            </P>
          </View>
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

        {/* Image Display */}
        {Array.isArray(task.image) && task.image.length > 0 && (
          <ImageDisplay source={task.image} />
        )}
      </View>
      <Button style={styles.addButton}>
        <Icon name="download-outline" size={ICON_LARGE} color="white" />
      </Button>
    </ContainerComponent>
  );
}
