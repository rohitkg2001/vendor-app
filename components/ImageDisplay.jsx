// import all react native
import {
  View,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import ImageViewing from "react-native-image-viewing";
// import styles
import { styles, typography, spacing } from "../styles";
import { P } from "./text";

export default function ImageDisplay({ source }) {
  const [images, setImages] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [activeTab, setActiveTab] = useState("Images");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

  return (
    <View style={[spacing.mt4]}>
      <P
        style={[
          typography.font16,
          typography.fontLato,
          typography.textBold,

          {
            textAlign: "center",
            bottom: 18,
          },
        ]}
      >
        Survey Files
      </P>
      {(images.length > 0 || documents.length > 0) && (
        <View>
          <View
            style={[
              styles.row,
              spacing.pv1,
              spacing.br2,
              spacing.mb2,
              {
                backgroundColor: "#f0f0f0",
              },
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
                  {
                    color: activeTab === "Images" ? "white" : "black",
                  },
                ]}
              >
                Images
              </P>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab("Documents")}
              style={[
                spacing.pv2,
                spacing.br2,
                spacing.mh1,
                {
                  flex: 1,
                  alignItems: "center",
                  backgroundColor:
                    activeTab === "Documents" ? "#ff6347" : "white",
                },
              ]}
            >
              <P
                style={[
                  typography.font14,
                  typography.fontLato,
                  typography.textBold,
                  {
                    color: activeTab === "Documents" ? "white" : "black",
                  },
                ]}
              >
                Documents
              </P>
            </TouchableOpacity>
          </View>

          {activeTab === "Images" && images.length > 0 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={[
                  styles.row,
                  {
                    gap: 4,
                  },
                ]}
              >
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
                      style={[
                        spacing.p2,
                        spacing.bw05,
                        spacing.br1,
                        {
                          alignItems: "center",
                          justifyContent: "center",
                          width: 140,
                          height: 140,
                        },
                      ]}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          )}

          {/* Document Section */}
          {activeTab === "Documents" && documents.length > 0 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={[
                  styles.row,
                  {
                    gap: 4,
                  },
                ]}
              >
                {documents.map((pdf, index) => (
                  <TouchableOpacity
                    key={`pdf-${index}`}
                    onPress={() => {
                      Linking.openURL(pdf);
                    }}
                    style={[
                      spacing.p2,
                      spacing.bw05,
                      spacing.br2,
                      {
                        alignItems: "center",
                        justifyContent: "center",
                        borderColor: "#ff6347",
                        width: 140,
                        height: 140,
                      },
                    ]}
                  >
                    <Image
                      source={{
                        uri: "https://img.icons8.com/ios-filled/50/ff6347/pdf.png",
                      }}
                      style={{ width: 50, height: 50 }}
                    />
                    <P
                      style={[
                        typography.font14,
                        typography.fontLato,
                        {
                          textAlign: "center",
                          color: "#ff6347",
                        },
                      ]}
                    >
                      Download PDF
                    </P>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          )}

          {/* Image Viewer */}
          <ImageViewing
            images={images}
            imageIndex={selectedImageIndex}
            visible={isVisible}
            onRequestClose={() => setIsVisible(false)}
          />
        </View>
      )}
    </View>
  );
}
