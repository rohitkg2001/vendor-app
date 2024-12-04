import { View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Card } from "react-native-paper";
import Button from "../buttons/Button";
import { H6, P } from "../text";
import { spacing, typography, SCREEN_WIDTH, LIGHT } from "../../styles";
import { useTranslation } from "react-i18next";

export default function ClickableCard({
  item,
  handleViewDetails,
  showArrow,
  isProject = false,
  isSite = false,
  isEarning = false,
  isCureentProject = false,
}) {
  const { t } = useTranslation();
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
              <P style={{ fontSize: 14 }}>Price: {item.rate}</P>
            </>
          )}
          {isSite && (
            <>
              <H6 style={[typography.textBold]}>{item.site_name || item.id}</H6>
              <P style={{ fontSize: 14 }}>
                {item.location},{item.dist}
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
              <P style={{ fontSize: 14 }}>Price: {item.rate}</P>
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
      </View>
    </Card>
  );
}
