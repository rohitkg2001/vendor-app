import React, { useState } from "react";
import { View, Image, TouchableOpacity, ImageBackground } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { P, H6, H4 } from "../components/text";
import { spacing, typography, LIGHT } from "../styles";

const ProfileChangeScreen = ({ route, navigation }) => {
  const { vendorImage, vendorName, contactNo, email, address } = route.params;

  const [profileImage, setProfileImage] = useState(
    vendorImage || "https://via.placeholder.com/150"
  );

  return (
    <View style={{ flex: 1 }}>
      {/* <View style={[spacing.p5, { backgroundColor: "#000", paddingTop: 50 }]}>
        <H4
          style={[
            typography.font18,
            typography.fontLato,
            typography.textBold,
            { color: LIGHT },
          ]}
        >
          Profile
        </H4>
      </View> */}
      {/* <ImageBackground
        source={require("../assets/renable.jpeg")}
        style={{
          width: "100%",
          height: 170,
          justifyContent: "center",
          alignItems: "center",
        }}
        resizeMode="cover"
      ></ImageBackground>
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

        <TouchableOpacity
          onPress={() => navigation.navigate("attendancePunch")}
          style={[
            spacing.p2,
            spacing.br5,
            {
              position: "absolute",
              bottom: 10,
              right: 20,
              backgroundColor: "#76885B",
            },
          ]}
        >
          <Ionicons name="camera-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View> */}

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
        <TouchableOpacity
          onPress={() => navigation.navigate("attendancePunch")}
          style={{
            position: "absolute",
            bottom: 10,
            right: 20,
            backgroundColor: "#1ABC9C",
            padding: 10,
            borderRadius: 25,
            // shadowColor: "#000",
            // shadowOffset: { width: 0, height: 3 },
            // shadowOpacity: 0.3,
            // shadowRadius: 5,
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
  );
};

export default ProfileChangeScreen;
