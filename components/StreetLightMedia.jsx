import React, { useEffect, useState } from "react";
import { View, Image, ScrollView, TouchableOpacity, Text } from "react-native";
import ImageViewing from "react-native-image-viewing";
import { typography, spacing, styles } from "../styles";
import { P } from "./text";

export default function StreetLightMedia({
  surveyImages = [],
  submissionImages = [],
}) {
  const [images, setImages] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("Images");

  useEffect(() => {
    const rawList =
      activeTab === "Images"
        ? surveyImages
        : activeTab === "Installed"
        ? submissionImages
        : [];

    const imageList = Array.isArray(rawList)
      ? rawList.filter(
          (item) => typeof item === "string" && !item.endsWith(".pdf")
        )
      : [];

    setImages(imageList.map((uri) => ({ uri })));
  }, [activeTab, surveyImages, submissionImages]);

  return (
    <View style={[spacing.mt4]}>
      <P
        style={[
          typography.font16,
          typography.fontLato,
          typography.textBold,
          { textAlign: "center", bottom: 18 },
        ]}
      >
        Streetlight Media
      </P>

      {/* Tabs */}
      <View
        style={[
          styles.row,
          spacing.pv1,
          spacing.br2,
          spacing.mb2,
          { backgroundColor: "#f0f0f0" },
        ]}
      >
        <TouchableOpacity
          onPress={() => setActiveTab("Images")}
          style={[
            spacing.pv2,
            spacing.mh1,
            spacing.br2,
            {
              flex: 1,
              alignItems: "center",
              backgroundColor: activeTab === "Images" ? "#90afc4" : "white",
            },
          ]}
        >
          <P
            style={[
              typography.font14,
              typography.fontLato,
              typography.textBold,
              { color: activeTab === "Images" ? "white" : "black" },
            ]}
          >
            Survey
          </P>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("Installed")}
          style={[
            spacing.pv2,
            spacing.mh1,
            spacing.br2,
            {
              flex: 1,
              alignItems: "center",
              backgroundColor: activeTab === "Installed" ? "#4caf50" : "white",
            },
          ]}
        >
          <P
            style={[
              typography.font14,
              typography.fontLato,
              typography.textBold,
              { color: activeTab === "Installed" ? "white" : "black" },
            ]}
          >
            Installed
          </P>
        </TouchableOpacity>
      </View>

      {/* Image Gallery View */}
      {images.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={[styles.row, { gap: 4 }]}>
            {images.map((image, index) => (
              <TouchableOpacity
                key={`image-${index}`}
                onPress={() => {
                  setSelectedImageIndex(index);
                  setIsVisible(true);
                }}
              >
                <Image
                  source={{ uri: image.uri }}
                  style={{
                    width: 140,
                    height: 140,
                    borderRadius: 8,
                    margin: 4,
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : (
        <P style={{ textAlign: "center", color: "#888", padding: 10 }}>
          No images available
        </P>
      )}

      {/* Image Viewer */}
      <ImageViewing
        images={images}
        imageIndex={selectedImageIndex}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  );
}
