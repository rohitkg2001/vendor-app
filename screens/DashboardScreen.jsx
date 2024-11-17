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
import { staff, tasks, categories } from "../utils/faker";
import { useSelector } from "react-redux";
import { greet } from "../redux/actions/vendorActions";

export default function DashboardScreen() {
  const navigation = useNavigation();
  const today = useState(moment().format("DD MMM YYYY"));
  const [greeting, setGreeting] = useState("Good morning")
  const { first_name } = useSelector(state => state);

  useEffect(() => {
    setGreeting(greet())
  }, [])




  const firstFourTasks = tasks.slice(0, 4);
  const lastTwoTasks = tasks.slice(4, 6);

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
            <View style={[styles.row, spacing.mr5, { alignItems: "center" }]}>
              <Icon name="calendar-clear" size={34} color={PRIMARY_COLOR} />
              <H5 style={[typography.textBold, { marginRight: 130 }]}>
                Project Overview
              </H5>
            </View>
            <View style={[spacing.bbw05, spacing.mv1]} />
            <View
              style={[
                styles.row,
                { justifyContent: "space-between", paddingVertical: 10 },
              ]}
            >
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => navigation.navigate('NoRecord')}
              // TODO: change the path on project overview
              >
                <P style={typography.textBold}>Open</P>
                <P></P>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => navigation.navigate('NoRecord')}
              // TODO: change the path on project overview
              >
                <P style={typography.textBold}>Completed</P>
                <P>0</P>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => navigation.navigate('NoRecord')}
              // TODO: change the path on project overview
              >
                <P style={typography.textBold}>Hold</P>
                <P>0</P>
              </TouchableOpacity>
            </View>
          </CardFullWidth>
        </View>

        <MyFlatList
          data={firstFourTasks}
          renderItem={({ item, index }) => {
            const isRightColumn = index % 2 !== 0;
            const marginTop = isRightColumn ? 20 : 0;
            return (
              <StatCard
                key={item.id}
                backgroundColor={item.backgroundColor}
                tasks={item.count}
                status={item.status}
                onPress={() => navigation.navigate(item.page)}
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
