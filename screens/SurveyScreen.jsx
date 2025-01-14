import { View, TouchableOpacity, ScrollView, Image } from "react-native";
import { useEffect, useRef, useState } from "react";
import Button from "../components/buttons/Button";
import { H2, H4, P, Span } from "../components/text";
import { SCREEN_WIDTH, styles, spacing, layouts, typography } from "../styles";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { updateTask } from "../redux/actions/taskActions";
import ModalPopup from "../components/Modal";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import CameraComponent from "../components/servey/CameraComponent";
import UploadDocument from "../components/servey/UploadDocument";
import Description from "../components/servey/Description";

export default function SurveyScreen({ route }) {
  const { itemId } = route.params || 0;

  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const cameraRef = useRef(null);

  const { t } = useTranslation();

  const handleTakePicture = async () => {
    if (cameraRef.current && photos.length < 5) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotos([...photos, photo.uri]);
    }
  };

  const removePhoto = (uri) => {
    setPhotos(photos.filter((photoUri) => photoUri !== uri));
  };

  const handleCancel = () => {
    setPhotos([]);
    setDescription("");
  };

  const handleUpload = async () => {
    try {
      console.log(photos, file);
      setFileUploadProgress(0); // Reset progress
      const response = await dispatch(
        updateTask(itemId, {
          date,
          description,
          image: photos,
          file,
          lat: latitude,
          long: longitude,
        })
      );
      if (response?.status === 200) {
        setModalMessage("Task submitted successfully!");
      } else {
        setModalMessage("Error submitting task");
      }
    } catch (error) {
      setModalMessage("Error submitting task");
    } finally {
      setShowModal(true);
    }
  };
  const getAndSetCurrentLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (granted) {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        setLatitude(latitude);
        setLongitude(longitude);
      }
    } catch (err) {
      console.log(`No Location Permission Granted`);
    }
  };
  useEffect(() => {
    getAndSetCurrentLocation();
  }, []);

  return (
    <ContainerComponent>
      <MyHeader title={t("submit_task")} isBack={true} hasIcon={true} />

      <ScrollView
        style={[layouts.flex1, spacing.mh1]}
        showsVerticalScrollIndicator={false}
      >
        <H4 style={[styles.titleText, spacing.m2, { marginVertical: 0 }]}>
          {t("upload_photo")}
        </H4>
        <P style={[spacing.mh2]}>{t("photo_description")}</P>
        <CameraComponent cameraRef={cameraRef} />
        <Span>Current Location</Span>
        <Span>Lat: {latitude}</Span>
        <Span>Long: {longitude}</Span>

        <Button
          style={[styles.btn, styles.bgPrimary, layouts.center]}
          onPress={handleTakePicture}
        >
          <H2 style={[styles.btnText, typography.font20, typography.textLight]}>
            {t("take_photo")}
          </H2>
        </Button>

        <View style={[styles.row, { justifyContent: "flex-start" }]}>
          {photos.map((photoUri, index) => (
            <View
              key={index}
              style={[spacing.mr2, spacing.mt2, { position: "relative" }]}
            >
              <Image
                source={{ uri: photoUri }}
                style={[styles.image, spacing.br1]}
              />
              <TouchableOpacity
                style={[
                  layouts.circle625,
                  layouts.center,
                  styles.bgDanger,
                  styles.removeImageButton,
                ]}
                onPress={() => removePhoto(photoUri)}
              >
                <P style={{ fontSize: 14, color: "white", marginLeft: 2 }}>X</P>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <UploadDocument />
        <Description />

        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <Button
            onPress={handleCancel}
            style={[
              styles.btn,
              styles.bgLight,
              spacing.bw05,
              layouts.center,
              { width: SCREEN_WIDTH / 2 - 20 },
            ]}
          >
            <H2
              style={[styles.btnText, typography.font20, typography.textDark]}
            >
              Cancel
            </H2>
          </Button>
          <Button
            onPress={handleUpload}
            style={[
              styles.btn,
              styles.bgPrimary,
              layouts.center,
              { width: SCREEN_WIDTH / 2 - 20 },
            ]}
          >
            <H2
              style={[styles.btnText, typography.font20, typography.textLight]}
            >
              Submit
            </H2>
          </Button>
        </View>
      </ScrollView>
      <ModalPopup
        visible={showModal}
        close={() => setShowModal(false)}
        negativeButton={t("close")}
        positiveButton={t("ok")}
        action={() => {
          setShowModal(false), navigation.navigate("taskScreen");
        }}
      >
        <H4>Your task has been submitted successfully!</H4>
      </ModalPopup>
    </ContainerComponent>
  );
}
