import { useEffect, useState } from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";
import ContainerComponent from "../components/ContainerComponent";
import MyFlatList from "../components/utility/MyFlatList";
import { H3, H5, H6, P } from "../components/text";
import CardFullWidth from "../components/card/CardFullWidth";
import StatCard from "../components/card/Statcard";

import {
  layouts,
  LIGHT,
  PRIMARY_COLOR,
  PRIMARY_COLOR_TRANSPARENT,
  DARK,
  SCREEN_WIDTH,
  spacing,
  styles,
  typography,
} from "../styles";
import { staff, tasks, categories, projects } from "../utils/faker";
import { useSelector } from "react-redux";
import { greet } from "../redux/actions/vendorActions";
import { ongoingProjects, projectCounts, statCards } from "../redux/actions/projectActions";

export default function DashboardScreen() {
  const navigation = useNavigation();
  const today = useState(moment().format("DD MMM YYYY"));
  const [greeting, setGreeting] = useState("Good morning")
  const { first_name } = useSelector(state => state);

  useEffect(() => {
    setGreeting(greet())
  }, [])

  return (
    <ContainerComponent>
      <View
        style={[
          styles.row,
          spacing.mh2,
          { alignItems: "center", width: SCREEN_WIDTH - 16 },
        ]}
      >
        <View>
          <H3 style={typography.textBold}>{greeting}, {first_name} </H3>
          <P style={spacing.ml1}>{today}</P>
        </View>
        <Image
          source={{ uri: staff.image }}
          style={[layouts.circle12, spacing.mv3, layouts.center]}
        />
      </View>

      <ScrollView>
        <View
          style={[
            spacing.mt2,
            { width: SCREEN_WIDTH - 18, alignSelf: "center" },
            spacing.pv3,
          ]}
        >
          <CardFullWidth backgroundColor={LIGHT}>
            <View style={[styles.row, spacing.mr5, spacing.bbw05, spacing.mv1, spacing.pv1, { alignItems: "center" }]}>
              <Icon name="calendar-clear" size={34} color={PRIMARY_COLOR} />
              <H5 style={[typography.textBold, { marginRight: 130 }]}>
                Project Overview
              </H5>
            </View>

            <View
              style={[
                styles.row,
                { justifyContent: "space-between", paddingVertical: 10 },
              ]}
            >
              {
                projectCounts.map((item, index) =>
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() => navigation.navigate(item.page, { DATA: item.data })}
                  // TODO: change the path on project overview
                  >
                    <P style={typography.textBold}>{item.title}</P>
                    <P>{item.count || 0}</P>
                  </TouchableOpacity>
                )
              }
            </View>
          </CardFullWidth>
        </View>

        <MyFlatList
          data={statCards}
          renderItem={({ item, index }) => {
            const isRightColumn = index % 2 !== 0;
            const marginTop = isRightColumn ? 20 : 0;
            return (
              <StatCard
                key={item.id}
                backgroundColor={item.backgroundColor}
                tasks={item.count}
                status={item.title}
                onPress={() => navigation.navigate(item.page, { DATA: projects })}
                style={{ marginTop }}
              />
            );
          }}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />

        <View
          style={[
            spacing.mt2,
            { width: SCREEN_WIDTH - 18, alignSelf: "center" },
            spacing.pv3,
          ]}
        ></View>

        <View
          style={[
            spacing.mt2,
            { width: SCREEN_WIDTH - 18, alignSelf: "center" },
            spacing.pv3,
          ]}
        ></View>

        <View
          style={[
            spacing.mb5,
            {
              width: SCREEN_WIDTH - 10,
              alignSelf: "center",
              elevation: 5,
              backgroundColor: PRIMARY_COLOR_TRANSPARENT,
            },
          ]}
        >
          <View>
            <H3 style={[spacing.mb3, typography.textBold]}>Task Management</H3>
          </View>

          <View style={styles.attendanceContainer}>
            {categories.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.gridItem}
                onPress={() => navigation.navigate('NoTask')}
              >
                <Icon name={item.icon} size={20} color={DARK} />
                <P>{item.label}</P>
                <View
                  style={{
                    position: "absolute",
                    right: 28,
                    top: -12,
                    backgroundColor: "#76885B",
                    borderRadius: 20,
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                  }}
                >
                  <P style={{ color: "white", fontWeight: "bold" }}>
                    {item.count}
                  </P>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </ContainerComponent>
  );
}
