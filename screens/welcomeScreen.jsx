import { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import {
  DANGER_COLOR,
  ICON_SMALL,
  layouts,
  LIGHT,
  PRIMARY_COLOR,
  SCREEN_WIDTH,
  spacing,
  styles,
  typography,
} from "../styles";
import { H1, H5, H6, P } from "../components/text";
import { useDispatch, useSelector } from "react-redux";
import CardFullWidth from "../components/card/CardFullWidth";
import {
  getAllInstallationCount,
  getAllTasks,
} from "../redux/actions/taskActions";

export default function WelcomeScreen({ navigation }) {
  const { siteInfo } = useSelector((state) => state.site);
  const { id, name } = useSelector((state) => state.vendor);
  const [installation, setInstallation] = useState(0);
  const [doneInstallation, setDoneInstallation] = useState(0);

  const [taskCount, setTaskCount] = useState(5);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(siteInfo);
  }, [siteInfo]);

  const getCounts = async () => {
    const installationCount = await getAllInstallationCount(id, "installation");
    setInstallation(installationCount);
  };
  useEffect(() => {
    dispatch(getAllTasks(id));
  }, []);

  useEffect(() => {
    getCounts();
  }, [installation]);

  return (
    <ContainerComponent>
      <MyHeader isBack title="Welcome" hasIcon />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[spacing.mh1]}
      >
        <P
          style={[
            typography.font16,
            typography.textBold,
            spacing.m3,
            styles.bgPrimaryTransParent,
            spacing.p2,
          ]}
        >
          Current Site: {siteInfo}
        </P>

        <CardFullWidth backgroundColor={LIGHT} style={[spacing.mb4]}>
          <H5 style={[typography.font16, typography.textBold, spacing.mb2]}>
            Progress Overview
          </H5>
          <P>Track daily task and monitor progress efficiently.</P>
          <View
            style={{
              height: 10,
              width: "100%",
              backgroundColor: "#ddd",
              borderRadius: 5,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: "100%",
                width: "0%",
                backgroundColor: PRIMARY_COLOR,
              }}
            />
          </View>
          <P style={[typography.font12, spacing.mt2]}>0% Completed</P>
        </CardFullWidth>

        <View
          style={[
            styles.row,
            spacing.mt5,
            { flexWrap: "wrap", alignItems: "center" },
          ]}
        >
          {/* <TouchableOpacity
            onPress={() => navigation.navigate("startInatallationScreen")}
            style={[
              spacing.br2,
              spacing.p4,
              spacing.m4,
              {
                width: SCREEN_WIDTH / 1.1,
                height: SCREEN_WIDTH / 2.5,
                alignItems: "center",
                backgroundColor: "#85c1e9",
              },
            ]}
          >
            <Image
              source={require("../assets/solar.png")}
              style={[
                spacing.mt3,
                {
                  width: "80%",
                  height: 80,
                  alignSelf: "center",
                },
              ]}
            />
            <P
              style={[
                typography.font16,
                spacing.mt1,
                typography.textBold,
                {
                  textAlign: "center",
                },
              ]}
            >
              Start Light Installation
            </P>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={[
              spacing.br2,
              spacing.p4,
              spacing.m4,
              {
                width: SCREEN_WIDTH / 1.12,
                height: SCREEN_WIDTH / 2.5,
                backgroundColor: "#85c1e9",
                justifyContent: 'center',
                alignItems: 'center'
              },
            ]}
            onPress={() => navigation.navigate("streetLightPendingTask")}
          >
            <Image
              source={require("../assets/solar.png")}
              style={{
                width: 80,
                height: 80,
              }}
            />
            <View style={[layouts.circle12, spacing.bw2, { borderColor: DANGER_COLOR, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 80, left: SCREEN_WIDTH/2 }]}>
              <H1 style={typography.textDanger}>
                {taskCount}
              </H1>
            </View>
            <P style={[typography.font16, typography.textBold]}>
              Start Light Installation
            </P>
          </TouchableOpacity>

          <View
            style={[styles.row, { justifyContent: "space-between", gap: 10 }]}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("sitelocationscreen")}
              style={[
                spacing.br2,
                spacing.pv4,
                spacing.mh2,
                styles.bgSuccess,
                {
                  width: SCREEN_WIDTH / 2.4,
                  alignItems: "center",
                  backgroundColor: "#f0b27a",
                },
              ]}
            >
              <Icon name="location-sharp" size={80} />
              <P style={[typography.font14, spacing.mt3]}>
                Pending Installation
              </P>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                spacing.br2,
                spacing.pv4,
                spacing.mh2,
                {
                  width: SCREEN_WIDTH / 2.4,
                  alignItems: "center",
                  backgroundColor: "#1abc9c",
                },
              ]}
            >
              <Icon name="reader-sharp" size={80} />
              <P style={[typography.font16, spacing.mt3]}>Pending Records</P>
            </TouchableOpacity>
          </View>
        </View>

        <CardFullWidth backgroundColor={LIGHT}>
          <View style={[styles.row, { alignItems: "center" }]}>
            <Icon name="filter" size={ICON_SMALL} color={PRIMARY_COLOR} />
            <H5 style={[typography.font16, { marginRight: 160 }]}>
              {"Progress Report"}
            </H5>
          </View>
          <View style={[spacing.bbw05, spacing.mv1]} />

          <View style={[styles.row, spacing.pv3, { borderBottomWidth: 1 }]}>
            {["Progress", "Installation"].map((header) => (
              <View style={{ alignItems: "center" }} key={header}>
                <H6 style={[typography.font14]}>{header}</H6>
              </View>
            ))}
          </View>

          {[
            { label: "Pending", installation: 0 },
            { label: "In approval", installation: 0 },
            { label: "Approved", installation: 0 },
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
                <P style={typography.font14}>{row.label}</P>
              </View>
              <View style={{ alignItems: "center" }}>
                <H6 style={spacing.ml2}>
                  {doneInstallation}/
                  <H6 style={typography.textDanger}>{row.installation}</H6>
                </H6>
              </View>
            </View>
          ))}
        </CardFullWidth>
      </ScrollView>
    </ContainerComponent>
  );
}
