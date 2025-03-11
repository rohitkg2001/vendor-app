import React, { useState } from "react";
<<<<<<< HEAD
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";

const ProfileChangeScreen = ({ route, navigation }) => {
  const { vendorImage, vendorName, contactNo } = route.params;
=======
import { View, Image, TouchableOpacity, ImageBackground } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { P, H6, H4 } from "../components/text";
import { spacing, typography, LIGHT } from "../styles";

const ProfileChangeScreen = ({ route, navigation }) => {
  const { vendorImage, vendorName, contactNo, email, address } = route.params;
>>>>>>> 143ff8f3e310b5ec255e192e24dcc38e99bfe3e5

  const [profileImage, setProfileImage] = useState(
    vendorImage || "https://via.placeholder.com/150"
  );

  return (
<<<<<<< HEAD
    <ContainerComponent style={{ flex: 1, padding: 0, margin: 0 }}>
      <MyHeader title={"Profile"} isBack={true} hasIcon={true} />

      <View style={{ alignItems: "center", marginBottom: 20, width: "100%" }}>
        <Image
          source={{ uri: profileImage }}
          style={{ width: 120, height: 120, borderRadius: 60 }}
        />
        {/* <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 0,
            right: 110,
            backgroundColor: "#76885B",
            borderRadius: 20,
            padding: 5,
          }}
        >
          <Icon name="photo-camera" size={20} color="#fff" />
        </TouchableOpacity> */}
=======
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/renable.jpeg")}
        style={{
          width: "100%",
          height: 170,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
        resizeMode="cover"
      >
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            // backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        />
      </ImageBackground>

      <View
        style={[
          spacing.p5,
          spacing.br3,
          spacing.mh3,
          {
            alignItems: "center",
            backgroundColor: "#2C3E50",
            marginTop: -20,
          },
        ]}
      >
        <Image
          source={{ uri: profileImage }}
          style={{
            width: 110,
            height: 110,
            borderRadius: 55,
            borderWidth: 2,
            borderColor: "#27AE60",
          }}
        />

        <H6
          style={[
            typography.font18,
            typography.fontLato,
            typography.textBold,
            spacing.mt2,
            { color: "#ECF0F1" },
          ]}
        >
          {vendorName}
        </H6>
        <P style={[typography.font14, { color: "#BDC3C7" }]}>{email}</P>

        {/* Camera Button */}
>>>>>>> 143ff8f3e310b5ec255e192e24dcc38e99bfe3e5
        <TouchableOpacity
          onPress={() => navigation.navigate("attendancePunch")}
          style={{
            position: "absolute",
<<<<<<< HEAD
            bottom: 0,
            right: 110,
            backgroundColor: "#76885B",
            borderRadius: 20,
            padding: 5,
          }}
        >
          <Icon name="photo-camera" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 20, paddingHorizontal: 0, width: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            marginLeft: 20,
          }}
        >
          <Icon name="person" size={24} color="#555" />
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 14, color: "#888" }}>Name</Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {vendorName}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            marginLeft: 20,
          }}
        >
          <Icon name="phone" size={24} color="#555" />
          <View style={{ marginLeft: 15 }}>
            <Text style={{ fontSize: 14, color: "#888" }}>Contact</Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {contactNo}
            </Text>
          </View>
        </View>
      </View>
    </ContainerComponent>
=======
            bottom: 10,
            right: 20,
            backgroundColor: "#1ABC9C",
            padding: 10,
            borderRadius: 25,
          }}
        >
          <Ionicons name="camera-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View
        style={[
          spacing.mt4,
          spacing.br2,
          spacing.mh3,
          spacing.pv2,
          {
            backgroundColor: LIGHT,
            // elevation: 3,
          },
        ]}
      >
        {[
          { name: "person-outline", label: vendorName },
          { name: "call-outline", label: contactNo },
          { name: "home-outline", label: address },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              spacing.pv3,
              spacing.ph5,
              {
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: index !== 4 ? 1 : 0,
                borderBottomColor: "#ddd",
              },
            ]}
          >
            <Ionicons name={item.name} size={24} color="#555" />
            <H6
              style={[typography.font16, spacing.ml3, typography.fontLato, {}]}
            >
              {item.label}
            </H6>
          </TouchableOpacity>
        ))}
      </View>
    </View>
>>>>>>> 143ff8f3e310b5ec255e192e24dcc38e99bfe3e5
  );
};

export default ProfileChangeScreen;
