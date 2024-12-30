import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import * as DocumentPicker from 'expo-document-picker'
import Button from '../components/buttons/Button'
import { H2, H4, P } from '../components/text'
import { SCREEN_WIDTH, styles, spacing, layouts, typography } from '../styles'
import { BASE_URL } from '../redux/constant'
import ContainerComponent from '../components/ContainerComponent'
import MyHeader from '../components/header/MyHeader'
import { useTranslation } from 'react-i18next'
import { Card } from 'react-native-paper'
import CameraComponent from "../components/CameraComponent";
import MyTextInput from '../components/input/MyTextInput'
import { useDispatch } from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import { updateTask } from '../redux/actions/taskActions'

export default function FileUploadScreen({ route }) {
  const { itemId } = route.params || 0;

  const [file, setFile] = useState(null)
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  // const [materials, setMaterials] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // const { inventory } = useSelector((state) => state.inventory);
  const dispatch = useDispatch();

  const cameraRef = useRef(null);

  const { t } = useTranslation()

  const pickDocument = async () => {
    const file = await DocumentPicker.getDocumentAsync({ type: 'application/pdf', copyToCacheDirectory: true })
    if (!file.canceled) {
      setFile(file.assets[0])
    }
  }

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
    await dispatch(updateTask(itemId, { date, description, image: photos, file }));
  }

  return (
    <ContainerComponent>
      <MyHeader title={t("submit_task")} isBack={true} hasIcon={true} />

      <ScrollView style={[layouts.flex1, spacing.mh1]} showsVerticalScrollIndicator={false}>
        {/* <Card style={[spacing.mv2, spacing.p2]}> */}
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

        <TouchableOpacity onPress={pickDocument}>
          <Text>Upload Document</Text>
        </TouchableOpacity>
        {/* Add designs to show a good file upload ui and preview and download progress */}
        {/* </Card> */}

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
    </ContainerComponent>

  )
}