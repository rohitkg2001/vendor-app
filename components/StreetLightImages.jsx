import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Text,
} from "react-native";
import ImageViewing from "react-native-image-viewing";
import * as Location from "expo-location";
import { typography, spacing, styles } from "../styles";
import { P } from "./text";

export default function StreetLightFiles({ source }) {
  const [images, setImages] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("Images"); // Track active tab
  const [location, setLocation] = useState(null); // Store GPS location
  const [timestamp, setTimestamp] = useState(""); // Store real-time timestamp
  const [address, setAddress] = useState(""); // Store the geocoded address

  useEffect(() => {
    if (Array.isArray(source)) {
      const newImages = [];
      const newPdfs = [];

      source.forEach((item) => {
        if (typeof item === "string") {
          if (item.endsWith(".pdf")) {
            newPdfs.push(item);
          } else {
            newImages.push({ uri: item });
          }
        }
      });

      setImages(newImages);
      setPdfs(newPdfs);
    }

    // Update timestamp
    const updateTimestamp = () => {
      const now = new Date();
      setTimestamp(now.toLocaleString());
    };

    updateTimestamp();
    const interval = setInterval(updateTimestamp, 60000);

    return () => clearInterval(interval);
  }, [source]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);

        // Reverse Geocoding to get the address
        const geocode = await Location.reverseGeocodeAsync(loc.coords);
        if (geocode.length > 0) {
          const { city, district, region, postalCode } = geocode[0];
          setAddress(`${city}, ${district}, ${region} ${postalCode}`);
        }
      }
    })();

    const interval = setInterval(() => {
      setTimestamp(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={[spacing.mt4]}>
      {/* Heading */}
      <P
        style={[
          typography.font16,
          typography.fontLato,
          typography.textBold,
          { textAlign: "center", bottom: 18 },
        ]}
      >
        Survey Files
      </P>

      {/* Tabs Always Visible */}
      <View>
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
                { color: activeTab === "Documents" ? "white" : "black" },
              ]}
            >
              Documents
            </P>
          </TouchableOpacity>
        </View>

        {/* Images Section */}
        {activeTab === "Images" && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={[styles.row, { gap: 4 }]}>
              {images.length > 0 ? (
                images.map((image, index) => (
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
                ))
              ) : (
                <P
                  style={[
                    typography.font14,
                    typography.fontLato,
                    { textAlign: "center", color: "#888", padding: 10 },
                  ]}
                >
                  No images available
                </P>
              )}
            </View>
          </ScrollView>
        )}

        {/* Document Section */}
        {activeTab === "Documents" && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={[styles.row, { gap: 4 }]}>
              {pdfs.length > 0 ? (
                pdfs.map((pdf, index) => (
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
                        { textAlign: "center", color: "#ff6347" },
                      ]}
                    >
                      Download PDF
                    </P>
                  </TouchableOpacity>
                ))
              ) : (
                <P
                  style={[
                    typography.font14,
                    typography.fontLato,
                    spacing.p4,
                    {
                      textAlign: "center",
                      color: "#888",
                      left: 90,
                    },
                  ]}
                >
                  No documents available
                </P>
              )}
            </View>
          </ScrollView>
        )}

        {/* Image Viewer */}
        <ImageViewing
          images={images}
          imageIndex={selectedImageIndex}
          visible={isVisible}
          onRequestClose={() => setIsVisible(false)}
          FooterComponent={() => (
            <View
              style={{
                position: "absolute",
                bottom: 150,
                right: 10,
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                padding: 5,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 10,
                  textAlign: "right",
                }}
              >
                Powered by Dashandots Technology
              </Text>

              <Text
                style={{
                  color: "white",
                  fontSize: 10,
                  textAlign: "right",
                }}
              >
                📍 {address || `Lat: ${location?.latitude}, Long: ${location?.longitude}`}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 10,
                  textAlign: "right",
                }}
              >
                ⏰ {timestamp}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}


