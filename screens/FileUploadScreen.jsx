import { useState, useRef } from "react";
import { View, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView } from "react-native";
import { Card } from "react-native-paper";
import CameraComponent from "../components/CameraComponent";
import ContainerComponent from "../components/ContainerComponent";
import { H2, H4, P } from "../components/text";
import Button from "../components/buttons/Button";
import MyTextInput from "../components/input/MyTextInput";
import MyHeader from '../components/header/MyHeader'
import { SCREEN_WIDTH, typography, spacing, styles, layouts } from "../styles";

export default function FileUploadScreen() {
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");

  const cameraRef = useRef(null);

  const handleTakePicture = async () => {
    if (cameraRef.current && photos.length < 5) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotos([...photos, photo.uri]);
    }
  };

  const handleUpload = () => {
    if (photos.length > 0) {
      console.log("Done")
    }
  };

  const handleCancel = () => {
    setPhotos([]);
    setDescription("");
  };

  const removePhoto = (uri) => {
    setPhotos(photos.filter((photoUri) => photoUri !== uri));
  };

  return (
    <ContainerComponent>
      <MyHeader title="Submit Task" isBack={true} hasIcon={true} />
      <ScrollView style={[layouts.flex1]} showsVerticalScrollIndicator={false}>
        <Card style={[spacing.mv2, spacing.p2]}>
          <H4 style={[styles.titleText, spacing.m2, { marginVertical: 0 }]}>Upload Photos</H4>
          <P style={[spacing.mh2]}>Take upto 5 photos</P>
          <CameraComponent cameraRef={cameraRef} />

          <Button style={[styles.btn, styles.bgPrimary, layouts.center]} onPress={handleTakePicture}>
            <H2 style={[styles.btnText, styles.textLarge, typography.textLight]}>Take Photo</H2>
          </Button>

          <View style={[styles.row, { justifyContent: 'flex-start' }]}>
            {photos.map((photoUri, index) => (
              <View key={index} style={[spacing.mr2, spacing.mt2, { position: 'relative' }]}>
                <Image source={{ uri: photoUri }} style={[styles.image, spacing.br1]} />
                <TouchableOpacity
                  style={[layouts.circle625, layouts.center, styles.bgDanger, styles.removeImageButton]}
                  onPress={() => removePhoto(photoUri)}
                >
                  <P style={{ fontSize: 14, color: "white", marginLeft: 2 }}>
                    X
                  </P>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </Card>

        <MyTextInput
          title="Description"
          height={220}
          onChangeText={(text) => setDescription(text)}
          type="text"
          placeholder="Briefly describe in less than 80 words"
          multiline
          numberOfLines={4}
          value={description}
        />

        <View
          style={[styles.row, { justifyContent: "space-between" }]}
        >
          <Button onPress={handleCancel} style={[styles.btn, styles.bgLight, spacing.bw05, layouts.center, { width: SCREEN_WIDTH / 2 - 20 }]}>
            <H2 style={[styles.btnText, styles.textLarge, typography.textDark]}>Cancel</H2>
          </Button>
          <Button
            onPress={handleUpload}
            style={[styles.btn, styles.bgPrimary, layouts.center, { width: SCREEN_WIDTH / 2 - 20 }]}
          >
            <H2 style={[styles.btnText, styles.textLarge, typography.textLight]}>Submit</H2>
          </Button>
        </View>
      </ScrollView>
    </ContainerComponent>
  );
};