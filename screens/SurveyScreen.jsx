import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Snackbar } from "react-native-paper";
import Button from "../components/buttons/Button";
import { H2, H4, P, Span } from "../components/text";
import { SCREEN_WIDTH, styles, spacing, layouts, typography } from "../styles";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { surveyTask, updateTask } from "../redux/actions/taskActions";
import ModalPopup from "../components/Modal";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import CameraComponent from "../components/servey/CameraComponent";
import UploadDocument from "../components/servey/UploadDocument";
import Description from "../components/servey/Description";

export default function SurveyScreen({ route, message = "" }) {
  const { itemId } = route.params || 0;
  const { isSurvey } = route.params || false;

  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [modalMsg, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
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
    setFile(null);
  };

  const handleUpload = async () => {
    if (!description && photos.length === 0 && !file) {
      setSnackbarMessage("Please provide data before submitting.");
      setSnackbarVisible(true);
      return;
    }
    if (!isSurvey && photos.length < 2) {
      setSnackbarMessage("Please Click at least two pictures");
      setSnackbarVisible(true);
      return;
    }

    try {
      setLoading(true);
      if (isSurvey) {
        const response = await dispatch(
          surveyTask(itemId, {
            date,
            description,
            image: photos,
            file,
            lat: latitude,
            long: longitude,
          })
        );
        if (response === 200) {
          setPhotos([]);
          setDescription("");
          setFile(null);
          // navigation.navigate("successScreen");
          navigation.navigate("successScreen", {
            message: "Task update has been successfully saved.",
            nextScreen: "taskScreen",
          });
        } else {
          setSnackbarMessage("Error submitting task");
          setSnackbarVisible(true);
        }
        return;
      }
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
      if (response === 200) {
        setPhotos([]);
        setDescription("");
        setFile(null);
        navigation.navigate("successScreen");
      } else {
        setSnackbarMessage("Error submitting task");
        setSnackbarVisible(true);
      }
    } catch (error) {
      console.error("Error submitting task:", error);
      setModalMessage("Error submitting task");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const getAndSetCurrentLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (granted) {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
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

        <UploadDocument file={file} setFile={setFile} />
        <Description
          description={description}
          setDescription={setDescription}
        />

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
            {loading ? (
              <ActivityIndicator
                size="small"
                style={[
                  styles.btnText,
                  typography.font20,
                  typography.textLight,
                ]}
                animating
                color="#fff"
              />
            ) : (
              <H2
                style={[
                  styles.btnText,
                  typography.font20,
                  typography.textLight,
                ]}
              >
                Submit
              </H2>
            )}
          </Button>
        </View>
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={{
          backgroundColor: "#DC4C64",
          borderRadius: 20,
          bottom: 55,
        }}
      >
        <P style={{ color: "#ffffff", fontWeight: "bold" }}>
          {snackbarMessage}
        </P>
      </Snackbar>

      <ModalPopup
        visible={showModal}
        close={() => setShowModal(false)}
        negativeButton={t("close")}
        positiveButton={t("ok")}
        action={() => {
          setShowModal(false);
          navigation.goBack();
        }}
      >
        <H4>{modalMsg}</H4>
      </ModalPopup>
    </ContainerComponent>
  );
}
