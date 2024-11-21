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
import { vendor, projects } from "../utils/faker";
import { useSelector } from "react-redux";
import { greet } from "../redux/actions/vendorActions";
import { projectCounts, statCards } from "../redux/actions/projectActions";
import { tasksCounts } from "../redux/actions/taskActions";

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
        <Icon name='notifications-outline' size={32} color={DARK} />
        <Image
          source={{ uri: vendor.image }}
          style={[layouts.circle12, spacing.mv3, layouts.center]}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
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
                    onPress={() => navigation.navigate(item.page, { DATA: item.data, title: `${item.title} Projects` })}
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
          renderItem={({ item, index }) => <StatCard
            key={item.id}
            backgroundColor={item.backgroundColor}
            tasks={item.count}
            status={item.title}
            onPress={() => navigation.navigate(item.page, { DATA: projects, title: `${item.title}` })
            }
          />
          }
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
          style={[spacing.mb5, spacing.p3, spacing.br2, spacing.mh2, { elevation: 2, backgroundColor: PRIMARY_COLOR_TRANSPARENT, }]}
        >
          <H3 style={[spacing.mb3, typography.textBold]}>Task Management</H3>
          <View style={styles.attendanceContainer}>
            {tasksCounts.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[spacing.mv4, styles.gridItem, spacing.bw1, spacing.br2, spacing.p4]}
                onPress={() => navigation.navigate('taskScreen')}
              >
                <Icon name={item.icon} size={32} color={DARK} />
                <P>{item.label}</P>
                <View
                  style={[styles.bgPrimary, layouts.circle625, layouts.center, {
                    position: "absolute",
                    right: 20,
                    top: 2
                  }]}
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
