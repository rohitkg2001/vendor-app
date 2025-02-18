import { useEffect, useState } from "react";
import { View } from "react-native";
import { H5, H6, P, H4 } from "../../components/text";
import Icon from "react-native-vector-icons/Ionicons";
import CardFullWidth from "../card/CardFullWidth";
import { useTranslation } from "react-i18next";
import {
  LIGHT,
  PRIMARY_COLOR,
  spacing,
  styles,
  typography,
  ICON_LARGE,
  ICON_SMALL,
  PRIMARY_COLOR_TRANSPARENT,
} from "../../styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllInstallationCount,
  getAllTasks,
} from "../../redux/actions/taskActions";

export default function ProgressReportCard({ title, progressData }) {
  const { t } = useTranslation();

  const { id, name } = useSelector((state) => state.vendor);
  const [installation, setInstallation] = useState(0);
  const [rmsStatus, setRmsStatus] = useState(0);
  const [doneInstallation, setDoneInstallation] = useState(0);
  const [donRMS, setDoneRMS] = useState(0);

  const dispatch = useDispatch();

  const getCounts = async () => {
    const installationCount = await getAllInstallationCount(id, "installation");
    setInstallation(installationCount);
    const RMSCount = await getAllInstallationCount(id, "rms");
    setRmsStatus(RMSCount);
  };
  useEffect(() => {
    dispatch(getAllTasks(id));
  }, []);

  useEffect(() => {
    getCounts();
  }, [installation]);

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

      {[
        { label: "Pending", installation: installation, rms: rmsStatus },
        { label: "In approval", installation: 0, rms: rmsStatus },
        { label: "Approved", installation: 0, rms: rmsStatus },
      ].map((row, index) => (
        <View
          key={index}
          style={[
            styles.row,
            spacing.pv3,
            { borderBottomWidth: index < 2 ? 1 : 0 },
          ]}
        >
          <View style={{ alignItems: "center" }}>
            <P style={[typography.font14, typography.fontLato]}>
              {t(row.label)}
            </P>
          </View>
          <View style={{ alignItems: "center" }}>
            <H6 style={spacing.ml2}>
              {doneInstallation}/
              <H6 style={typography.textDanger}>{row.installation}</H6>
            </H6>
          </View>
          <View style={{ alignItems: "center" }}>
            <H6 style={spacing.ml2}>
              {donRMS}/<H6 style={typography.textDanger}>{row.rms}</H6>
            </H6>
          </View>
        </View>
      ))}
    </CardFullWidth>
  );
}
