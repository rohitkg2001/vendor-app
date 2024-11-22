import { useEffect, useState } from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";
import ContainerComponent from "../components/ContainerComponent";
import MyFlatList from "../components/utility/MyFlatList";
import { H3, H4, H5, H6, P, Span } from "../components/text";
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
import SearchBar from "../components/input/SearchBar";
import Button from "../components/buttons/Button";

export default function DashboardScreen() {
  const navigation = useNavigation();
  const today = useState(moment().format("DD MMM YYYY"));
  const [dueTasks, setDueTasks] = useState(4)
  const [greeting, setGreeting] = useState("Good morning")
  const { first_name } = useSelector(state => state);

  useEffect(() => {
    setGreeting(greet())
  }, [])

  return (
    <ContainerComponent>
      <View
        style={[styles.row, spacing.m2, { alignItems: "center", width: SCREEN_WIDTH - 16 }]}
      >
        <View>
          <H4 style={typography.textBold}>{greeting}, {first_name} </H4>
          <P style={spacing.ml1}>You have {dueTasks} due Today</P>
        </View>
        <TouchableOpacity style={[layouts.circle12, layouts.center, spacing.bw05, spacing.br5, { position: 'relative' }]}>
          <Icon name='notifications-outline' size={28} color={DARK} />
          <View style={[styles.bgDanger, layouts.center,
          { position: 'absolute', top: 0, right: 0, height: 24, width: 24, borderRadius: 12 }]}>
            <Span style={[typography.textLight, typography.font16, { textAlign: 'center' }]}>6</Span>
          </View>
        </TouchableOpacity>
      </View>

<<<<<<< HEAD
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
              <Icon name="calendar-clear" size={32} color={PRIMARY_COLOR} />
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
=======
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[spacing.mh2]}>
        <View style={[spacing.mv4, styles.row, { alignItems: 'center' }]}>
          <SearchBar placeholder="Search" style={{ width: SCREEN_WIDTH - 80 }} />
          <Button style={[styles.btn, styles.bgPrimary, spacing.mh1, { width: 50 }]}>
            <Icon name="options-outline" size={28} color={LIGHT} />
          </Button>
>>>>>>> bddefdcbf7fd6488f87c3b8fea3f433401df4c32
        </View>

        <View style={[spacing.mv2, styles.row, { alignItems: 'center' }]}>
          <H4>Today</H4>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="calendar-outline" size={24} color={DARK} />
            <H5 style={spacing.ml1}>{today}</H5>
          </View>

        </View>

        {/* Project Overview Card */}
        <CardFullWidth backgroundColor={LIGHT}>
          <View style={[styles.row, spacing.bbw05, spacing.mv1, spacing.pv1, { alignItems: "center", justifyContent: 'flex-start' }]}>
            <Icon name="calendar-clear" size={34} color={PRIMARY_COLOR} />
            <H5 style={[typography.textBold, spacing.ml2]}>
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

        {/* Flatlist cards */}
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
          contentContainerStyle={spacing.mv4}
        />

        {/* Task management cards */}
        <View
          style={[spacing.mb5, spacing.p3, spacing.br2, { elevation: 2, backgroundColor: PRIMARY_COLOR_TRANSPARENT, }]}
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
