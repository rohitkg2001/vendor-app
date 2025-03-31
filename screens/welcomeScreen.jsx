import { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, ScrollView, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import {
    DANGER_COLOR, ICON_SMALL, layouts, LIGHT, PRIMARY_COLOR, SCREEN_WIDTH, spacing, styles, typography,
} from "../styles";
import { H1, H5, H6, P } from "../components/text";
import { useDispatch, useSelector } from "react-redux";
import CardFullWidth from "../components/card/CardFullWidth";
import { getInstalledPoles, getStreetLightTasks } from "../redux/actions/taskActions";
import { getAllItems } from "../redux/actions/inventoryActions";

export default function WelcomeScreen({ navigation }) {
    const { id } = useSelector((state) => state.vendor);
    const { pendingStreetLightCounts, surveyedStreetLightCounts, installedStreetLightCounts } = useSelector((state) => state.tasks);
    const [doneInstallation, setDoneInstallation] = useState(0);
    const [taskCount, setTaskCount] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStreetLightTasks(id));
        dispatch(getAllItems(id))
    }, [dispatch, id]);

    useEffect(() => {
        setTaskCount(pendingStreetLightCounts);
    }, [
        pendingStreetLightCounts,
        installedStreetLightCounts,
        surveyedStreetLightCounts,
    ]);

    const openPendingTasks = async () => {
        try {
            await dispatch(getInstalledPoles(id));
            navigation.navigate("streetLightPendingTask");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ContainerComponent>
            <MyHeader isBack title="Welcome" hasIcon />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[spacing.mh1]}
            >
                <CardFullWidth backgroundColor={LIGHT} style={[spacing.mb4]}>
                    <H5
                        style={[
                            typography.font16,
                            typography.textBold,
                            spacing.mb2,
                            typography.fontLato,
                        ]}
                    >
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
                    <P style={[typography.font12, spacing.mt2, typography.fontLato]}>
                        0% Completed
                    </P>
                </CardFullWidth>

                <View
                    style={[
                        styles.row,
                        spacing.mt5,
                        { flexWrap: "wrap", alignItems: "center" },
                    ]}
                >
                    <TouchableOpacity
                        style={[
                            spacing.br2,
                            spacing.p4,
                            spacing.m4,
                            {
                                width: SCREEN_WIDTH / 1.12,
                                height: SCREEN_WIDTH / 2.5,
                                backgroundColor: "#85c1e9",
                                justifyContent: "center",
                                alignItems: "center",
                            },
                        ]}
                        onPress={openPendingTasks}
                    >
                        <Image
                            source={require("../assets/solar.png")}
                            style={{
                                width: 80,
                                height: 80,
                            }}
                        />
                        <View
                            style={[
                                layouts.circle12,
                                spacing.bw2,
                                {
                                    borderColor: DANGER_COLOR,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    position: "absolute",
                                    bottom: 80,
                                    left: SCREEN_WIDTH / 2,
                                },
                            ]}
                        >
                            <H1 style={typography.textDanger}>{taskCount}</H1>
                        </View>
                        <P
                            style={[
                                typography.font16,
                                typography.textBold,
                                typography.fontLato,
                            ]}
                        >
                            Start Light Installation
                        </P>
                    </TouchableOpacity>

                    <View
                        style={[
                            styles.row,
                            spacing.mb4,
                            { justifyContent: "space-between", gap: 10 },
                        ]}
                    >
                        <TouchableOpacity
                            style={[
                                spacing.br2,
                                spacing.pv4,
                                spacing.mh2,
                                {
                                    width: SCREEN_WIDTH / 2.4,

                                    alignItems: "center",
                                    backgroundColor: "#68c690",
                                },
                            ]}
                        >
                            <Icon name="checkmark-circle-sharp" size={40} />
                            <P style={[typography.font14, spacing.mt3]}>Completed</P>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                spacing.br2,
                                spacing.pv4,
                                spacing.mh2,
                                {
                                    width: SCREEN_WIDTH / 2.4,
                                    alignItems: "center",
                                    backgroundColor: "#ec7063",
                                },
                            ]}
                        >
                            <Icon name="close-circle-sharp" size={40} />
                            <P style={[typography.font16, spacing.mt3]}>Rejected</P>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={[styles.row, { justifyContent: "space-between", gap: 10 }]}
                    >
                        <TouchableOpacity
                            //  onPress={() => navigation.navigate("sitelocationscreen")}
                            style={[
                                spacing.br2,
                                spacing.pv4,
                                spacing.mh2,
                                styles.bgSuccess,
                                {
                                    width: SCREEN_WIDTH / 2.4,
                                    alignItems: "center",
                                    backgroundColor: "#f5c9a2",
                                },
                            ]}
                        >
                            <Text style={{ fontSize: 40, fontWeight: "bold" }}>₹</Text>
                            <P style={[typography.font14, typography.fontLato]}>
                                Total Earning
                            </P>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate("inventoryScreen")}
                            style={[
                                spacing.br2,
                                spacing.pv4,
                                spacing.mh2,
                                {
                                    width: SCREEN_WIDTH / 2.4,
                                    alignItems: "center",
                                    backgroundColor: "#5fd0ba",
                                },
                            ]}
                        >
                            <Icon name="reader-sharp" size={40} />
                            <P style={[typography.font16, typography.fontLato, spacing.mt3]}>
                                Inventory
                            </P>
                        </TouchableOpacity>
                    </View>
                </View>

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
                            {"Progress Report"}
                        </H6>
                    </View>
                    <View style={[spacing.bbw05, spacing.mv1]} />

                    <View style={[styles.row, spacing.pv3, { borderBottomWidth: 1 }]}>
                        {["Progress", "Installation"].map((header) => (
                            <View style={{ alignItems: "center" }} key={header}>
                                <H6 style={[typography.font14, typography.fontLato]}>
                                    {header}
                                </H6>
                            </View>
                        ))}
                    </View>

                    {[
                        { label: "Pending", installation: pendingStreetLightCounts },
                        { label: "In approval", installation: surveyedStreetLightCounts },
                        { label: "Approved", installation: installedStreetLightCounts },
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
                                    {row.label}
                                </P>
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
