import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";

import { PRIMARY_COLOR, spacing, styles, SCREEN_WIDTH } from "../../styles";

function UploadDocument() {
  const [file, setFile] = useState(null);
  const [fileUploadProgress, setFileUploadProgress] = useState(0);

  const pickDocument = async () => {
    const file = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });
    if (!file.canceled) {
      setFile(file.assets[0]);
    }
  };
  return (
    <View
      onPress={pickDocument}
      style={{
        width: SCREEN_WIDTH - 20,
        height: SCREEN_WIDTH - 200,
        backgroundColor: "lightblue",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 10,
        borderStyle: "dashed",
        borderWidth: 1,
        borderColor: "black",
      }}
    >
      <TouchableOpacity onPress={pickDocument}>
        <Text>Upload Document</Text>
      </TouchableOpacity>
      {file && (
        <View style={[styles.filePreview, spacing.mt2]}>
          <Text>{file.name}</Text>
          <TouchableOpacity onPress={() => setFile(null)}>
            <Text style={{ color: "red" }}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}
      {fileUploadProgress > 0 && fileUploadProgress < 100 && (
        <View style={[styles.progressBar, spacing.mv2]}>
          <View
            style={{
              width: `${fileUploadProgress}%`,
              backgroundColor: PRIMARY_COLOR,
              height: 5,
            }}
          />
        </View>
      )}
    </View>
  );
}

export default UploadDocument;
