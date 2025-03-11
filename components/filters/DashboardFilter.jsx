import { useState } from "react";
import { View, Modal, TouchableOpacity } from "react-native";
import { H4, H5 } from "../text";
import {
  ICON_SMALL,
  LIGHT,
  SCREEN_WIDTH,
  spacing,
  styles,
  typography,
} from "../../styles";
import Button from "../buttons/Button";
import Icon from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

export default function DashboardFilter({ updateDateFilter }) {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [today, setToday] = useState(moment().format("DD MMM YYYY"));
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false); // Start date picker visibility
  const [showEndDatePicker, setShowEndDatePicker] = useState(false); // End date picker visibility

  const handleDateChange = (event, date, type) => {
    if (event.type === "set") {
      if (type === "start") {
        setCustomStartDate(date);
        setShowStartDatePicker(false); // Close the start date picker once a date is selected
        setShowEndDatePicker(true);
      } else if (type === "end") {
        setCustomEndDate(date);
        setShowEndDatePicker(false); // Close the end date picker once a date is selected
      }
    }
  };

  // const handleFilterSelect = (filterType) => {
  //   setShowModal(false); // Close the modal when an option is selected

  //   if (filterType === "Custom" && customStartDate && customEndDate) {
  //     // Only apply Custom filter when both dates are selected

  //     updateDateFilter({
  //       type: "Custom",
  //       startDate: customStartDate,
  //       endDate: customEndDate,
  //     });
  //   } else if (filterType === "Today") {
  //     updateDateFilter({
  //       type: "Today",
  //       startDate: null,
  //       endDate: null,
  //     });
  //   } else if (filterType === "This Month") {
  //     updateDateFilter({
  //       type: "This Month",
  //       startDate: moment().startOf("month").toDate(),
  //       endDate: moment().endOf("month").toDate(),
  //     });
  //   }
  // };

  const handleFilterSelect = (filterType) => {
    setShowModal(false);

    if (filterType === "Custom") {
      setShowStartDatePicker(true); // Open Start Date Picker immediately
    } else if (filterType === "Today") {
      updateDateFilter({ type: "Today", startDate: null, endDate: null });
    } else if (filterType === "This Month") {
      updateDateFilter({
        type: "This Month",
        startDate: moment().startOf("month").toDate(),
        endDate: moment().endOf("month").toDate(),
      });
    }
  };

  return (
    <View>
      <View
        style={[
          styles.row,
          spacing.mh1,
          { alignItems: "center", width: SCREEN_WIDTH - 16 },
        ]}
      >
        <H4>{t("today")}</H4>
        <Button
          style={[styles.btn, styles.bgPrimary, spacing.ph3]}
          onPress={() => setShowModal(true)} // Open modal when clicked
        >
          <Icon name="calendar-outline" size={ICON_SMALL} color={LIGHT} />
          <H5 style={[spacing.ml1, typography.fontLato, { color: LIGHT }]}>
            {today}
          </H5>
        </Button>
      </View>

      {/* Modal for the date options */}
      <Modal
        transparent={true}
        visible={showModal}
        animationType="slide" // Slide effect when opening the modal
        onRequestClose={() => setShowModal(false)} // Close modal when the back button is pressed
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => handleFilterSelect("Today")}>
              <View style={styles.optionButton}>
                <H5>{t("today")}</H5>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilterSelect("This Month")}>
              <View style={styles.optionButton}>
                <H5>{t("this_month")}</H5>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilterSelect("Custom")}>
              <View style={styles.optionButton}>
                <H5>{t("custom")}</H5>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Show Start Date Picker when Custom is selected */}
      {showStartDatePicker && (
        <DateTimePicker
          value={customStartDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => handleDateChange(event, date, "start")}
        />
      )}

      {/* Show End Date Picker when Custom is selected */}
      {showEndDatePicker && (
        <DateTimePicker
          value={customEndDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => handleDateChange(event, date, "end")}
        />
      )}

      {/* Custom Date Range UI */}
      {customStartDate && customEndDate && (
        <View>
          <TouchableOpacity
            onPress={() => setShowStartDatePicker(true)} // Open start date picker
          >
            <H5 style={{ marginBottom: 10 }}>
              Start Date: {moment(customStartDate).format("DD MMM YYYY")}
            </H5>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowEndDatePicker(true)} // Open end date picker
          >
            <H5 style={{ marginBottom: 10 }}>
              End Date: {moment(customEndDate).format("DD MMM YYYY")}
            </H5>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
