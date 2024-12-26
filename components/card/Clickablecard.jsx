import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Card } from "react-native-paper";
import Button from "../buttons/Button";
import { H5, H6, P } from "../text";
import { spacing, typography, SCREEN_WIDTH, LIGHT } from "../../styles";
import { useTranslation } from "react-i18next";

export default function ClickableCard({
  item,
  handleViewDetails,
  showArrow,
  showView,
  isProject = false,
  isSite = false,
  isEarning = false,
  isCureentProject = false,
  isTask = false,
}) {
  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Card
      style={[
        spacing.mv1,
        {
          width: SCREEN_WIDTH - 16,
          backgroundColor: LIGHT,
          marginHorizontal: 8,
        },
      ]}
      onPress={() => handleViewDetails(item)}
    >
      <View style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
        <View style={{ flex: 1 }}>
          {isProject && (
            <>
              <H6 style={[typography.textBold]}>
                Project Name: {item.project_name}
              </H6>
              <P style={{ fontSize: 14 }}>
                Work Order Number: {item.work_order_number}
              </P>
              <P style={{ fontSize: 14 }}>Start Date: {item.start_date}</P>
            </>
          )}
          {isSite && (
            <>
              <H6 style={[typography.textBold]}>{item.site_name || item.id}</H6>
              <P style={{ fontSize: 14 }}>
                {item.location},{item.district}
              </P>
              {/* FIXME: */}
            </>
          )}
          {isEarning && (
            <>
              <H6 style={[typography.textBold]}>{item.project_name}</H6>
              <H6 style={typography.font14}>
                {t("total_earning")}: {item.total_earnings}
              </H6>
              <P style={typography.font14}>
                {t("completion_date")}: {item.completion_date}
              </P>
            </>
          )}
          {isCureentProject && (
            <>
              <H6 style={[typography.textBold]}>
                Project Name: {item.project_name}
              </H6>
              <P style={{ fontSize: 14 }}>
                Work Order Number: {item.work_order_number}
              </P>
              <P style={{ fontSize: 14 }}>Start Date: {item.start_date}</P>
            </>
          )}
          {isTask && (
            <>
              <H6 style={[typography.textBold, typography.font20, spacing.pv1]}>
                {item.site.site_name}
              </H6>
              <H5 style={[typography.font20]}>{item.activity}</H5>
              <P style={[typography.font16]}>{item.site.location}</P>
              <P style={{ fontSize: 14 }}>{item.start_date}</P>
              <P style={{ fontSize: 14 }}>{item.end_date}</P>
              <P style={{ fontSize: 16, textAlign: "right", top: 15 }}>
                {item.status}
              </P>
              <P
                style={[
                  typography.font16,
                  {
                    textAlign: "right",
                    color:
                      item.priority === "High"
                        ? "green"
                        : item.priority === "Medium"
                        ? "orange"
                        : item.priority === "Low"
                        ? "green"
                        : "black",
                  },
                ]}
              >
                {item.priority}
              </P>
            </>
          )}
        </View>
        {showArrow && (
          <Button
            style={{
              position: "absolute",
              right: 16,
              top: 40,
            }}
          >
            <Ionicons name="chevron-forward-outline" size={32} color="gray" />
          </Button>
        )}

        {showView && (
          <Button
            disabled={item.status !== "Pending"}
            style={{
              position: "absolute",
              right: spacing.mr3.marginRight,
              top: 65,
              backgroundColor: isSubmitting ? "#A9A9A9" : "#76885B",
              borderRadius: 8,
            }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
              }}
              onPress={async () => {
                if (!isSubmitting) {
                  setIsSubmitting(true);
                  await handleViewDetails(item.id);
                  setIsSubmitting(false);
                }
              }}
            >
              <P style={{ fontSize: 16, color: "white", textAlign: "center" }}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </P>
            </TouchableOpacity>
          </Button>
        )}
      </View>
    </Card>
  );
}
