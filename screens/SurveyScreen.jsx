import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import * as DocumentPicker from 'expo-document-picker'
import Button from '../components/buttons/Button'
import { H2, H4, P } from '../components/text'
import { SCREEN_WIDTH, styles, spacing, layouts, typography } from '../styles'
import ContainerComponent from '../components/ContainerComponent'
import MyHeader from '../components/header/MyHeader'
import { useTranslation } from 'react-i18next'
import CameraComponent from "../components/CameraComponent";
import MyTextInput from '../components/input/MyTextInput'
import { useDispatch } from 'react-redux'
import { updateTask } from '../redux/actions/taskActions'
import ModalPopup from "../components/Modal";
import { useNavigation } from '@react-navigation/native'

export default function SurveyScreen({ route }) {
    const { itemId } = route.params || 0;

    const [file, setFile] = useState(null)
    const [photos, setPhotos] = useState([]);
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [fileUploadProgress, setFileUploadProgress] = useState(0); // Progress state
    const dispatch = useDispatch();
    const navigation = useNavigation()

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
        try {
            setFileUploadProgress(0); // Reset progress
            const response = await dispatch(updateTask(itemId, { date, description, image: photos, file }));

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
    }

    return (
        <ContainerComponent>
            <MyHeader title={t("submit_task")} isBack={true} hasIcon={true} />

            <ScrollView style={[layouts.flex1, spacing.mh1]} showsVerticalScrollIndicator={false}>
                <CameraComponent cameraRef={cameraRef} height={SCREEN_WIDTH} />

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

                <View style={{ width: SCREEN_WIDTH - 20, height: SCREEN_WIDTH - 200, backgroundColor: 'lightblue', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 10, borderStyle: "dashed", borderWidth: 1, borderColor: "black" }}>
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


                {/* Add designs to show a good file upload ui and preview and download progress */}

                <View style={[styles.row, { justifyContent: "space-between", marginTop: 100 }]}>
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
                action={() => { setShowModal(false), navigation.navigate("taskScreen") }}
            >
                <H4>Your task has been submitted successfully!</H4>
            </ModalPopup>
        </ContainerComponent>
    )
}