// import { View, Image, ScrollView, TouchableOpacity, Text } from "react-native";
// import React, { useEffect, useState } from "react";
// import ImageViewing from "react-native-image-viewing";
// import { P } from "./text";

// // import styles
// import { typography, spacing } from "../styles";

// export default function StreetLightImages({ source }) {
//   const [images, setImages] = useState([]);
//   const [isVisible, setIsVisible] = useState(false);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);

//   // useEffect(() => {
//   //   console.log("Received source:", source);
//   //   if (Array.isArray(source)) {
//   //     const newImages = source
//   //       .map((item) => {
//   //         if (typeof item === "string") {
//   //           return { uri: item };
//   //         } else if (item?.uri) {
//   //           return item;
//   //         }
//   //         return null;
//   //       })
//   //       .filter(Boolean);

//   //     console.log("Formatted Images:", newImages);
//   //     setImages(newImages);
//   //   }
//   // }, [source]);

//   const setAndFilterImages = (source) => {
//     const newImages = [];

//     Array.isArray(source) &&
//       source.forEach((item) => {
//         newImages.push({ uri: item.survey_image });
//         // newImages.push({ uri: item.survey_image });
//       });

//     setImages(newImages);
//   };

//   useEffect(() => {
//     setAndFilterImages(source);
//   }, [source]);

//   return (
//     <View style={[spacing.mt4]}>
//       {images.length > 0 && (
//         <View>
//           <P
//             style={[
//               typography.font16,
//               typography.fontLato,
//               typography.textBold,
//             ]}
//           >
//             Survey Images
//           </P>

//           <View style={[spacing.m1, spacing.p1, spacing.br2]}>
//             <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   gap: 10,
//                   padding: 5,
//                 }}
//               >
//                 {source.map((image, index) => (
//                   <TouchableOpacity
//                     key={index}
//                     onPress={() => {
//                       setSelectedImageIndex(index);
//                       setIsVisible(true);
//                     }}
//                   >
//                     <Image
//                       source={image}
//                       style={{
//                         height: 140,
//                         width: 140,
//                         borderRadius: 8,
//                         resizeMode: "cover",
//                         borderWidth: 2,
//                         borderColor: "#90afc4",
//                       }}
//                     />
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             </ScrollView>
//           </View>

//           <ImageViewing
//             images={images}
//             imageIndex={selectedImageIndex}
//             visible={isVisible}
//             onRequestClose={() => setIsVisible(false)}
//           />
//         </View>
//       )}
//     </View>
//   );
// }

import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import ImageViewing from "react-native-image-viewing";
import { P } from "./text";

// import styles
import { typography, spacing } from "../styles";

export default function StreetLightImages({ source }) {
  const [images, setImages] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Function to filter and set images (excluding PDFs)
  const setAndFilterImages = (source) => {
    if (Array.isArray(source)) {
      const newImages = source
        .filter((item) => typeof item === "string" && !item.endsWith(".pdf")) // Exclude PDFs
        .map((item) => ({ uri: item })); // Convert to object format

      setImages(newImages);
    }
  };

  useEffect(() => {
    setAndFilterImages(source);
  }, [source]);

  return (
    <View style={[spacing.mt4]}>
      {images.length > 0 && (
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
                {images.map((image, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSelectedImageIndex(index);
                      setIsVisible(true);
                    }}
                  >
                    <Image
                      source={{ uri: image.uri }} // Ensure correct source format
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
