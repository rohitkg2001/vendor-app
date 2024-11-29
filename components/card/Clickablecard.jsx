import { View } from "react-native";
import { Card } from "react-native-paper";
import { H6, P } from "../text";
import { spacing, typography, SCREEN_WIDTH, LIGHT } from "../../styles";
import { useTranslation } from "react-i18next";

export default function ClickableCard({
  item,
  handleViewDetails,
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
                Project Name: {item.projectName}
              </H6>
              <P style={{ fontSize: 14 }}>
                Work Order Number: {item.workOrderNumber}
              </P>
              <P style={{ fontSize: 14 }}>Start Date: {item.startDate}</P>
              <P style={{ fontSize: 14 }}>Price: {item.price}</P>
            </>
          )}
          {isSite && (
            <>
              <H6 style={[typography.textBold]}>{item.siteName || item.id}</H6>
              <P style={{ fontSize: 14 }}>
                {item.location},{item.dist}
              </P>
              {/* FIXME: */}
            </>
          )}
          {isEarning && (
            <>
              <H6 style={[typography.textBold]}>{item.projectName}</H6>
              <H6 style={{ fontSize: 14 }}>
                {t("total_earning")}: {item.totalEarnings}
              </H6>
              <P style={{ fontSize: 14 }}>
                {t("completion_date")}: {item.completionDate}
              </P>
            </>
          )}
          {isCureentProject && (
            <>
              <H6 style={[typography.textBold]}>{item.projectName}</H6>
              <P style={{ fontSize: 14 }}>
                {t("site_title")}: {item.siteName}
              </P>
            </>
          )}
        </View>
      </View>
    </Card>
  );
}
