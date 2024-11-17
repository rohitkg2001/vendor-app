import { useState, useEffect } from "react";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { cardtasks } from "../utils/faker";
import DateSelector from "../components/DateSelector";
import ProjectCard from "../components/card/ProjectCard";
import { SCREEN_WIDTH, spacing } from "../styles";
import MyFlatList from "../components/utility/MyFlatList";

export default function ProjectTimelineScreen() {
  const [dates, setDates] = useState([
    { "currentDate": "31", "currentDay": "Thu" },
    { "currentDate": "30", "currentDay": "Wed" },
    { "currentDate": "29", "currentDay": "Tue" },
    { "currentDate": "28", "currentDay": "Mon" },
    { "currentDate": "27", "currentDay": "Sun" }]);
  const [activeDate, setActiveState] = useState(moment().format('DD'));

  const onSelectDate = (date) => {
    setActiveState(date)
  };

  function getDaysArrayByMonth() {
    let daysInMonth = moment().daysInMonth();
    let arrDays = [];

    while (daysInMonth) {
      let currentDate = moment().date(daysInMonth).format('DD');
      let currentDay = moment().date(daysInMonth).format('ddd');
      arrDays.push({ currentDate, currentDay });
      daysInMonth--;
    }

    return arrDays;
  }

  useEffect(() => {
    setDates(getDaysArrayByMonth().reverse())
    console.log(activeDate)
  }, [])
  return (
    <ContainerComponent>
      <MyHeader title="Project Timeline" />
      <DateSelector
        dates={dates}
        activeDate={activeDate}
        onSelectDate={onSelectDate}
      />
      <MyFlatList
        data={cardtasks}
        renderItem={({ item }) => <ProjectCard task={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[spacing.mh2, { width: SCREEN_WIDTH - 16 }]}
        showsVerticalScrollIndicator={false}
      />
    </ContainerComponent>
  );
};


