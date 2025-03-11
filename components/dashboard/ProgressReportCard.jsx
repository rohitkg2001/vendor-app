// Updated ProgressReportCard.js
import { useEffect, useState } from "react";
import { View } from "react-native";
import { H6, P } from "../../components/text";
import Icon from "react-native-vector-icons/Ionicons";
import CardFullWidth from "../card/CardFullWidth";
import { useTranslation } from "react-i18next";
import {
  LIGHT,
  PRIMARY_COLOR,
  spacing,
  styles,
  typography,
  ICON_SMALL,
  PRIMARY_COLOR_TRANSPARENT,
} from "../../styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllInstallationCount,
  getAllTasks,
} from "../../redux/actions/taskActions";

export default function ProgressReportCard() {
  const { t } = useTranslation();

  const { id } = useSelector((state) => state.vendor);
  const { tasks } = useSelector((state) => state.tasks);
  const [installation, setInstallation] = useState(0);
  const [rmsStatus, setRmsStatus] = useState(0);
  const [taskCounts, setTaskCounts] = useState({
    Pending: 0,
    "In approval": 0,
    Approved: 0,
  });

  const dispatch = useDispatch();

  const getCounts = async () => {
    const installationCount = await getAllInstallationCount(id, "installation");
    setInstallation(installationCount);
    const RMSCount = await getAllInstallationCount(id, "rms");
    setRmsStatus(RMSCount);
  };

  useEffect(() => {
    dispatch(getAllTasks(id));
  }, [dispatch, id]);

  useEffect(() => {
    getCounts();
  }, []);

  useEffect(() => {
    const counts = {
      Pending: tasks.filter((task) => task.status === "Pending").length,
      "In approval": tasks.filter((task) => task.status === "In Progress")
        .length,
      Approved: tasks.filter((task) => task.status === "Completed").length,
    };
    setTaskCounts(counts);
  }, [tasks]);

  return (
    <CardFullWidth backgroundColor={LIGHT}>
      <View style={[styles.row, { alignItems: "center" }]}>
        <Icon name="filter" size={ICON_SMALL} color={PRIMARY_COLOR} />
        <H6
          style={[
            typography.fontLato,
            typography.textBold,
            { marginRight: 170 },
          ]}
        >
          {t("Progress Report")}
        </H6>
      </View>
      <View style={[spacing.bbw05, spacing.mv1]} />

      <View
        style={[
          styles.row,
          spacing.pv3,
          { borderBottomWidth: 1, backgroundColor: PRIMARY_COLOR_TRANSPARENT },
        ]}
      >
        {["Progress", "Installation", "RMS"].map((header) => (
          <View style={{ alignItems: "center" }} key={header}>
            <H6 style={[typography.font14, typography.fontLato]}>
              {t(header)}
            </H6>
          </View>
        ))}
      </View>

      {["Pending", "In approval", "Approved"].map((status, index) => (
        <View
          key={status}
          style={[
            styles.row,
            spacing.pv3,
            { borderBottomWidth: index < 2 ? 1 : 0 },
          ]}
        >
          <View style={{ alignItems: "center" }}>
            <P style={[typography.font14, typography.fontLato]}>{t(status)}</P>
          </View>
          <View style={{ alignItems: "center" }}>
            <H6 style={spacing.ml2}>
              <H6 style={typography.textDanger}>{taskCounts[status]}</H6>/
              <H6>{installation}</H6>
            </H6>
          </View>
          <View style={{ alignItems: "center" }}>
            <H6 style={spacing.ml2}>
              <H6 style={typography.textDanger}>{rmsStatus}</H6>/
              <H6>{rmsStatus}</H6>
            </H6>
          </View>
        </View>
      ))}
    </CardFullWidth>
  );
}
