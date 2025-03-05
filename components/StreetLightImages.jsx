import { View, Image, ScrollView, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useState } from "react";
import ImageViewing from "react-native-image-viewing";
import { P } from "./text";

// import styles
import { typography, spacing } from "../styles";

export default function StreetLightImages({ source }) {
  return (
    <View style={[spacing.mt4]}>
      {source.length > 0 && (
        <View>
          <P
            style={[
              typography.font16,
              typography.fontLato,
              typography.textBold,
            ]}
          >
            Survey Images
          </P>

          <View style={[spacing.m1, spacing.p1, spacing.br2]}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  padding: 5,
                }}
              >
                {source.map((image, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSelectedImageIndex(index);
                      setIsVisible(true);
                    }}
                  >
                    <Image
                      source={image}
                      style={{
                        height: 140,
                        width: 140,
                        borderRadius: 8,
                        resizeMode: "cover",
                        borderWidth: 2,
                        borderColor: "#90afc4",
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <ImageViewing
            images={source}
            imageIndex={selectedImageIndex}
            visible={isVisible}
            onRequestClose={() => setIsVisible(false)}
          />
        </View>
      )}
    </View>
  );
}
