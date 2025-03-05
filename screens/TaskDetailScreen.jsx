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
  LIGHT,
} from "../styles";
import { H5, H6, P, Span } from "../components/text";

export default function TaskDetailScreen({ navigation }) {
  const { task } = useSelector((state) => state.tasks?.currentTask);

  return (
    <ContainerComponent>
      {/* <MyHeader title={"Task details"} isBack={true} hasIcon={true} /> */}
      <MyHeader title={`${task.site.site_name}`} isBack={true} hasIcon={true} />

      <View style={{ width: SCREEN_WIDTH - 16 }}>
        <View
          style={[
            styles.row,
            spacing.br2,
            spacing.p2,
            spacing.p2,

            {
              flexWrap: "wrap",
              backgroundColor: "#5D92F4",
              top: 4,
            },
          ]}
        >
          <H5
            style={[
              typography.font16,
              typography.fontLatoBold,
              { flexShrink: 1, color: "#fff" },
            ]}
          >
            {task.site.breda_sl_no},
          </H5>

          <P
            style={[
              typography.font14,
              typography.fontLato,
              spacing.ml2,
              {
                flex: 2,
                flexShrink: 1,
                color: LIGHT,
              },
            ]}
            numberOfLines={task.site.site_name.length > 20 ? 2 : 1}
          >
            {task.site.site_name}
          </P>

          {/* Location */}
          <P
            style={[
              typography.font12,
              typography.fontLato,
              {
                textAlign: "right",
                flex: 1,
                color: LIGHT,
                marginTop: task.site.site_name.length > 20 ? 4 : 0,
              },
            ]}
          >
            {task.site.location}
          </P>
        </View>

        <View style={[spacing.mt2, styles.row, spacing.mv2, spacing.p2]}>
          <View style={{ alignItems: "center", flex: 1 }}>
            <Span
              style={[
                typography.font10,
                typography.fontLato,
                {
                  textTransform: "uppercase",
                },
              ]}
            >
              Start Date
            </Span>
            <P
              style={[
                typography.font14,
                typography.fontLato,
                { color: "#1E40AF" },
              ]}
            >
              {moment(task.start_date).format("DD-MM-YYYY")}
            </P>
          </View>

          {/* Divider Line */}
          <View
            style={[
              spacing.mh5,
              {
                height: "100%",
                width: 1.5,
                backgroundColor: "#D1D5DB",
              },
            ]}
          />

          <View style={{ alignItems: "center", flex: 1 }}>
            <Span
              style={[
                typography.font10,
                typography.fontLato,
                {
                  textTransform: "uppercase",
                  color: "#6B7280",
                },
              ]}
            >
              End Date
            </Span>
            <P
              style={[
                typography.font14,
                typography.fontLato,
                { color: "#DC2626" },
              ]}
            >
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

        <View
          style={[
            styles.row,
            spacing.pv2,
            spacing.mb2,
            {
              borderBottomWidth: 1,
              borderBottomColor: "#D1D5DB",
            },
          ]}
        >
          <H5
            style={[
              typography.font14,
              typography.textBold,
              typography.fontLato,
              { textAlign: "left", flex: 1 },
            ]}
          >
            Submission
          </H5>
          <P
            style={[
              typography.font14,
              typography.fontLato,
              spacing.pv1,
              { textAlign: "right", flex: 1 },
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
