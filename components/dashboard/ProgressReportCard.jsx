import { useEffect, useState } from "react";
import { View } from "react-native";
import { H5, P, H4 } from "../../components/text";
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
    console.log(name);
  }, []);

  useEffect(() => {
    getCounts();
  }, [installation]);

  return (
    <CardFullWidth backgroundColor={LIGHT}>
      <View style={[styles.row, { alignItems: "center" }]}>
        <Icon name="filter" size={ICON_LARGE} color={PRIMARY_COLOR} />
        <H4 style={[typography.textBold, { marginRight: 110 }]}>
          {t("Progress Report")}
        </H4>
      </View>
      <View style={[spacing.bbw05, spacing.mv1]} />

      <View style={[styles.row, spacing.pv3, { borderBottomWidth: 1 }]}>
        {["Progress", "Installation", "RMS"].map((header) => (
          <View style={{ alignItems: "center" }} key={header}>
            <H5 style={[typography.textBold]}>{t(header)}</H5>
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
            <P style={typography.textBold}>{t(row.label)}</P>
          </View>
          <View style={{ alignItems: "center" }}>
            <H5 style={spacing.ml2}>
              {doneInstallation}/
              <H5 style={typography.textDanger}>{row.installation}</H5>
            </H5>
          </View>
          <View style={{ alignItems: "center" }}>
            <H5 style={spacing.ml2}>
              {donRMS}/<H5 style={typography.textDanger}>{row.rms}</H5>
            </H5>
          </View>
        </View>
      ))}
    </CardFullWidth>
  );
}
