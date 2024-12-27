import { useState, useRef, useEffect } from "react";
import { View, Image, TouchableOpacity, ScrollView, Text } from "react-native";
import { Card } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import CameraComponent from "../components/CameraComponent";
import ContainerComponent from "../components/ContainerComponent";
import { H2, H4, P } from "../components/text";
import Button from "../components/buttons/Button";
import MyTextInput from "../components/input/MyTextInput";
import MyHeader from "../components/header/MyHeader";
import ModalPopup from "../components/Modal";
import { SCREEN_WIDTH, typography, spacing, styles, layouts } from "../styles";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { updateTask } from "../redux/actions/taskActions";

export default function FileUploadScreen({ route }) {
  const { itemId } = route.params || 0;
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  // const [materials, setMaterials] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // const { inventory } = useSelector((state) => state.inventory);
  const dispatch = useDispatch();

  const cameraRef = useRef(null);

  const handleTakePicture = async () => {
    if (cameraRef.current && photos.length < 5) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotos([...photos, photo.uri]);
    }
  };

  const handleUpload = () => {
    console.log(itemId, date, description, photos);
    dispatch(updateTask(itemId, { date, description, photos, status: "In Progress" }));
    if (photos.length > 0) {

      setShowModal(true);
    }
  };

  const handleCancel = () => {
    setPhotos([]);
    setDescription("");
  };

  const removePhoto = (uri) => {
    setPhotos(photos.filter((photoUri) => photoUri !== uri));
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // useEffect(() => {
  //   let myArr = [];
  //   inventory.map((item) => {
  //     const myObj = { enabled: true, label: item.product_name, value: item.id };
  //     myArr.push(myObj);
  //   });
  //   setMaterials(myArr);
  // }, [inventory]);

  const { t } = useTranslation();

  return (
    <ContainerComponent>
      <MyHeader title={t("submit_task")} isBack={true} hasIcon={true} />
      <ScrollView style={[layouts.flex1]} showsVerticalScrollIndicator={false}>
        <Card style={[spacing.mv2, spacing.p2]}>
          <H4 style={[styles.titleText, spacing.m2, { marginVertical: 0 }]}>
            {t("upload_photo")}
          </H4>
          <P style={[spacing.mh2]}>{t("photo_description")}</P>
          <CameraComponent cameraRef={cameraRef} />

          <Button
            style={[styles.btn, styles.bgPrimary, layouts.center]}
            onPress={handleTakePicture}
          >
            <H2
              style={[styles.btnText, typography.font20, typography.textLight]}
            >
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

        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <MyTextInput
            title="Date"
            value={date.toLocaleDateString()}
            placeholder="Select Date"
            editable={false}
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            minimumDate={moment().toDate()}
            display="default"
            onChange={handleDateChange}
          />
        )}

        <MyTextInput
          title={t("description")}
          height={220}
          onChangeText={(text) => setDescription(text)}
          type="text"
          placeholder={t("description_title")}
          multiline
          numberOfLines={4}
          value={description}
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
          setPhotos([]);
          setShowModal(false);
        }}
      >
        <H4>Your task has been submitted successfully!</H4>
      </ModalPopup>
    </ContainerComponent>
  );
}
