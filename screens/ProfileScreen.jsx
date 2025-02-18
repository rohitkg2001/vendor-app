import { View, Image } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import {
  LIGHT,
  PRIMARY_COLOR,
  styles,
  spacing,
  typography,
  SCREEN_WIDTH,
} from "../styles";
import CardFullWidth from "../components/card/CardFullWidth";
import Avatar from "../components/Avatar";
import { H6 } from "../components/text";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const ProfileItem = ({ iconName, label }) => {
  return (
    <View
      style={[
        styles.row,
        spacing.pv3,
        spacing.bbw05,
        { width: SCREEN_WIDTH - 20, justifyContent: "flex-start" },
      ]}
    >
      <Image source={{ uri: iconName }} height={100} width={180} />
      <H6 style={[typography.font16, { color: "black", flex: 1 }]}>{label}</H6>
    </View>
  );
};

const ProfileScreen = () => {
  const { t } = useTranslation();
  const { vendor } = useSelector((state) => state);

  return (
    <ContainerComponent>
      <MyHeader title={t("profile_title")} isBack={true} hasIcon={true} />

      <CardFullWidth backgroundColor={PRIMARY_COLOR}>
        <View style={[styles.row, { alignItems: "center", marginTop: -10 }]}>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: "black",
              alignItems: "center",
              justifyContent: "center",
              top: 8,
            }}
          >
            <Avatar
              avatar={vendor.image}
              name={`${vendor.firstName} ${vendor.lastName}`}
              online={false}
            />
          </View>

          <View style={spacing.mh2}>
            <H6
              style={[typography.font14, typography.fontLato, { color: LIGHT }]}
            >
              {vendor.firstName} {vendor.lastName}
            </H6>
            <H6
              style={[typography.font12, typography.fontLato, { color: LIGHT }]}
            >
              {vendor.email}
            </H6>
            <H6
              style={[typography.font14, typography.fontLato, { color: LIGHT }]}
            >
              {vendor.contactNo}
            </H6>
            <H6
              style={[typography.font14, typography.fontLato, { color: LIGHT }]}
            >
              {vendor.address}
            </H6>
          </View>
        </View>
      </CardFullWidth>

      <MyFlatList
        data={[]}
        renderItem={({ item }, index) => (
          <ProfileItem
            key={index}
            iconName={item.documentImage}
            label={item.documentName}
          />
        )}
        ListEmptyComponent={() => <NoRecord msg={t("no_document")} />}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={false}
      />
    </ContainerComponent>
  );
};

export default ProfileScreen;
