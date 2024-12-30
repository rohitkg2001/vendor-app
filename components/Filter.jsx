import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import BottomSheet from "./bottomSheet/Bottomsheet";

import {
  SCREEN_WIDTH,
  spacing,
  styles,
  typography,
  DANGER_COLOR,
  ICON_LARGE,
} from "../styles";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "./buttons/Button";
import { H2, H1, Span, H4 } from "./text";
import states from "../utils/states.json";
import { useSelector } from "react-redux";

export default function Filter({ onClose, onApply, filterType }) {
  const [filterState, setFilterState] = useState(0);
  const [selectedState, setSelectedState] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [rangeStartDate, setRangeStartDate] = useState(Date.now());
  const [rangeEndDate, setRangeEndDate] = useState(Date.now());
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);

  const [showInstallation, setShowInstallation] = useState(false);
  const [showRMS, setShowRMS] = useState(false);

  const { projects } = useSelector((state) => state.project);

  const handleFromDateChange = (event, date) => {
    if (date) setFromDate(date);
    setShowFromDatePicker(false);
  };

  const handleToDateChange = (event, date) => {
    if (date) setToDate(date);
    setShowToDatePicker(false);
  };

  const onClear = () => {
    setFilterState(0);
    setSelectedState("");
    setSelectedProject("");
    setRangeStartDate(Date.now());
    setRangeEndDate(Date.now());
    setSelectedRating("");
    setSelectedStatus("");
    onClose();
  };

  const applyFilter = () => {
    onApply(
      selectedState,
      selectedProject,
      selectedRating,
      selectedStatus,
      rangeStartDate,
      rangeEndDate
    );
  };

  return (
    <BottomSheet>
      <View
        style={[
          styles.row,
          spacing.mh1,
          spacing.bbw05,
          spacing.p4,
          { height: "16%" },
        ]}
      >
        <H1 style={[typography.font16, typography.textBold]}>Apply Filter</H1>
        <TouchableOpacity onPress={onClose} style={{ marginLeft: -18 }}>
          <Icon name="close-outline" color={DANGER_COLOR} size={ICON_LARGE} />
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.row,
          spacing.mt5,
          spacing.ml2,
          spacing.bbw05,
          { height: "62%" },
        ]}
      >
        <View
          style={[spacing.brw1, spacing.brc, { height: "100%", width: "40%" }]}
        >
          {/* Conditionally render State filter */}
          {filterType !== "site" && (
            <TouchableOpacity
              style={[
                spacing.bbw05,
                spacing.p3,
                spacing.mh1,
                { backgroundColor: filterState === 0 ? "#D1E7DD" : "#FFFFFF" },
              ]}
              onPress={() => setFilterState(0)}
            >
              <Span style={typography.font16}>State</Span>
            </TouchableOpacity>
          )}

          {/* Conditionally render Project filter */}
          {filterType !== "site" && (
            <TouchableOpacity
              style={[
                spacing.bbw05,
                spacing.p3,
                spacing.mh1,
                { backgroundColor: filterState === 1 ? "#D1E7DD" : "#FFFFFF" },
              ]}
              onPress={() => setFilterState(1)}
            >
              <Span style={typography.font16}>Project</Span>
            </TouchableOpacity>
          )}

          {/* Always render Date filter */}
          <TouchableOpacity
            style={[
              spacing.bbw05,
              spacing.p3,
              spacing.mh1,
              { backgroundColor: filterState === 2 ? "#D1E7DD" : "#FFFFFF" },
            ]}
            onPress={() => setFilterState(2)}
          >
            <Span style={typography.font16}>Date</Span>
          </TouchableOpacity>

          {/* Filters exclusive to "site" */}
          {filterType === "site" && (
            <>
              <TouchableOpacity
                style={[
                  spacing.bbw05,
                  spacing.p3,
                  spacing.mh1,
                  {
                    backgroundColor: filterState === 3 ? "#D1E7DD" : "#FFFFFF",
                  },
                ]}
                onPress={() => setFilterState(3)}
              >
                <Span style={typography.font16}>Rating</Span>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  spacing.bbw05,
                  spacing.p3,
                  spacing.mh1,
                  {
                    backgroundColor: filterState === 4 ? "#D1E7DD" : "#FFFFFF",
                  },
                ]}
                onPress={() => {
                  setFilterState(4);
                  setShowInstallation(!showInstallation);
                  setShowRMS(!showRMS);
                }}
              >
                <Span style={typography.font16}>Status</Span>
              </TouchableOpacity>
            </>
          )}
        </View>

        <ScrollView>
          {filterState === 0 &&
            filterType !== "site" &&
            states.states.map((state, index) => (
              <TouchableOpacity
                key={index}
                style={[spacing.bbw05, spacing.p3, spacing.mh1]}
                onPress={() => setSelectedState(state.name)}
              >
                <Text>{state.name}</Text>
              </TouchableOpacity>
            ))}

          {filterState === 1 &&
            filterType !== "site" &&
            projects.map((project, index) => (
              <TouchableOpacity
                key={index}
                style={[spacing.bbw05, spacing.p3, spacing.mh1]}
                onPress={() => setSelectedProject(project.project_name)}
              >
                <Text>{project.project_name}</Text>
              </TouchableOpacity>
            ))}

          {filterState === 2 && (
            <>
              <H4>From</H4>
              {showFromDatePicker && (
                <DateTimePicker
                  value={fromDate}
                  mode="date"
                  display="default"
                  onChange={(event, date) => handleFromDateChange(date)}
                />
              )}
              <TouchableOpacity
                style={[
                  spacing.bbw05,
                  spacing.p3,
                  spacing.mh1,
                  { backgroundColor: fromDate ? "#E8F5E9" : "#F8F8F8" },
                ]}
                onPress={() => setShowFromDatePicker(!showFromDatePicker)}
              >
                <Span style={typography.font16}>
                  {fromDate
                    ? `${fromDate.toLocaleDateString()}`
                    : "Select From Date"}
                </Span>
              </TouchableOpacity>

              {/* To Date */}
              <H4>To</H4>
              {showToDatePicker && (
                <DateTimePicker
                  value={toDate}
                  mode="date"
                  display="default"
                  onChange={(event, date) => handleToDateChange(date)}
                />
              )}
              <TouchableOpacity
                style={[
                  spacing.bbw05,
                  spacing.p3,
                  spacing.mh1,
                  { backgroundColor: toDate ? "#E3F2FD" : "#F8F8F8" },
                ]}
                onPress={() => setShowToDatePicker(!showToDatePicker)}
              >
                <Span style={typography.font16}>
                  {toDate ? `${toDate.toLocaleDateString()}` : "Select To Date"}
                </Span>
              </TouchableOpacity>
            </>
          )}

          {filterState === 3 && (
            <>
              <>
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <View
                    style={[
                      styles.row,
                      {
                        justifyContent: "center",
                        marginBottom: 16,
                      },
                    ]}
                  >
                    {["5kW", "10kW", "20kW"].map((option, index) => (
                      <Text
                        key={index}
                        style={[spacing.mh3, typography.font20]}
                      >
                        {option}
                      </Text>
                    ))}
                  </View>

                  <View style={[styles.row]}>
                    {["5kW", "10kW", "20kW"].map((_, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => setSelectedRating(index + 1)}
                        style={[
                          spacing.mh5,
                          {
                            height: 24,
                            width: 24,
                            borderRadius: 12,
                            borderWidth: 2,
                            justifyContent: "center",
                            alignItems: "center",
                          },
                        ]}
                      >
                        {selectedRating === index + 1 && (
                          <View
                            style={{
                              height: 12,
                              width: 12,
                              borderRadius: 6,
                              backgroundColor: "#76885B",
                            }}
                          />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </>
            </>
          )}

          {filterState === 4 && showInstallation && (
            <>
              <H4>Installation</H4>
              {["Pending", "Completed"].map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[spacing.bbw05, spacing.p3]}
                >
                  <Text>{status}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}
          {filterState === 4 && showRMS && (
            <>
              <H4>RMS Status</H4>
              {["Pending", "Completed"].map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[spacing.bbw05, spacing.p3]}
                >
                  <Text>{status}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}
        </ScrollView>
      </View>

      <View
        style={[
          spacing.mh1,
          spacing.ph4,
          styles.row,
          { height: "22%", width: SCREEN_WIDTH },
        ]}
      >
        <Button
          style={[
            styles.btn,
            styles.bgDanger,
            { justifyContent: "center", width: "40%" },
          ]}
          onPress={onClear}
        >
          <H2 style={[styles.btnText, typography.textLight, styles.textLarge]}>
            Clear
          </H2>
        </Button>
        <Button
          style={[
            styles.btn,
            styles.bgPrimary,
            { justifyContent: "center", width: "40%" },
          ]}
          onPress={applyFilter}
        >
          <H2 style={[styles.btnText, typography.textLight, styles.textLarge]}>
            Apply
          </H2>
        </Button>
      </View>
    </BottomSheet>
  );
}
