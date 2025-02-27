// import all react native
import {
  View,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import ImageViewing from "react-native-image-viewing";
import { Ionicons } from "@expo/vector-icons";
// import styles
import { styles, typography, spacing } from "../styles";
import { P } from "./text";

export default function ImageDisplay({ source }) {
  const [images, setImages] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [activeTab, setActiveTab] = useState("Images");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleTabSelection = (tab) => {
    setActiveTab(tab);
  };

  const setAndFilterImages = (source) => {
    const newImages = [];
    const newDocuments = [];

    Array.isArray(source) &&
      source.forEach((item) => {
        const extension = item.split(".").pop().toLowerCase();
        if (extension === "pdf") {
          newDocuments.push(item);
        } else {
          newImages.push({ uri: item });
        }
      });

    setImages(newImages);
    setDocuments(newDocuments);
  };

  useEffect(() => {
    setAndFilterImages(source);
  }, [source]);

  const handleNextImage = () => {
    if (selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  return (
    <View style={[spacing.mt4, {}]}>
      <View
        style={[
          styles.row,
          spacing.bbw05,
          spacing.pb3,
          spacing.mb3,
          { justifyContent: "flex-start", alignItems: "center" },
        ]}
      >
        {["Images", "Documents"].map((tab, index) => (
          <TouchableOpacity
            key={tab}
            onPress={() => handleTabSelection(tab)}
            style={[
              spacing.p1,
              index !== 0 && { marginLeft: 16 },
              {
                borderBottomWidth: activeTab === tab ? 2 : 0,
                borderBottomColor:
                  activeTab === tab ? "#76885B" : "transparent",
              },
            ]}
          >
            <P
              style={[
                typography.font16,
                {
                  color: activeTab === tab ? "#76885B" : "#333",
                  fontWeight: activeTab === tab ? "bold" : "normal",
                },
              ]}
            >
              {tab}
            </P>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === "Images" && images.length > 0 && (
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
              {images.map((image, index) => (
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
                    }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {activeTab === "Documents" && documents.length > 0 && (
        <View style={{ marginTop: 15 }}>
          {documents.map((pdf, index) => (
            <Button
              key={index}
              style={[styles.btn, styles.bgPrimary, { width: "40%" }]}
              onPress={() => Linking.openURL(pdf)}
            >
              <P
                style={[
                  styles.btnText,
                  typography.font16,
                  typography.textLight,
                ]}
              >
                View PDF
              </P>
            </Button>
          ))}
        </View>
      )}

      <ImageViewing
        images={images}
        imageIndex={selectedImageIndex}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
        HeaderComponent={() => (
          <View style={{ position: "absolute", top: 20, left: 20 }}>
            <TouchableOpacity onPress={() => setIsVisible(false)}>
              <Ionicons name="arrow-back-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
        FooterComponent={() => (
          <View
            style={[
              styles.row,
              {
                bottom: 360,
              },
            ]}
          >
            <TouchableOpacity
              onPress={handlePrevImage}
              disabled={selectedImageIndex === 0}
              style={{
                opacity: selectedImageIndex === 0 ? 0.5 : 1,
              }}
            >
              <Ionicons name="chevron-back-circle" size={40} color="white" />
            </TouchableOpacity>

            {/* Right Arrow */}
            <TouchableOpacity
              onPress={handleNextImage}
              disabled={selectedImageIndex === images.length - 1}
              style={{
                opacity: selectedImageIndex === images.length - 1 ? 0.5 : 1,
              }}
            >
              <Ionicons name="chevron-forward-circle" size={40} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
