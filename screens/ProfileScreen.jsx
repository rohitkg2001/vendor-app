import { View, TouchableOpacity, Image } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { documentData, vendor } from "../utils/faker";
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
import { useTranslation } from "react-i18next";

const ProfileItem = ({ iconName, label }) => {
  const { t } = useTranslation();

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
  return (
    <ContainerComponent>
      <MyHeader title={t("profile_title")} isBack={true} hasIcon={true} />

      <CardFullWidth backgroundColor={PRIMARY_COLOR}>
        <View style={[styles.row, { alignItems: "center", marginTop: -10 }]}>
          <Avatar
            avatar={vendor.image}
            name={`${vendor.first_name} ${vendor.last_name}`}
            online={false}
          />

          <View style={spacing.mh1}>
            <H6 style={[typography.font14, { color: LIGHT }]}>
              {vendor.first_name} {vendor.last_name}
            </H6>
            <H6 style={[typography.font14, { color: LIGHT }]}>
              {vendor.email}
            </H6>
            <H6 style={[typography.font14, { color: LIGHT }]}>
              {vendor.phone}
            </H6>
            <H6 style={[typography.font14, { color: LIGHT }]}>
              {vendor.address}
            </H6>
          </View>
        </View>
      </CardFullWidth>

      <MyFlatList
        data={documentData}
        renderItem={({ item }, index) => (
          <ProfileItem
            key={index}
            iconName={item.documentImage}
            label={item.documentName}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </ContainerComponent>
  );
};

export default ProfileScreen;
