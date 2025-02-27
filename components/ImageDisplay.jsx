import { View, Text, Image, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-paper'
import { styles, typography } from '../styles'
import { P } from './text'

export default function ImageDisplay({ source }) {
    const [images, setImages] = useState([])
    const [documents, setDocuments] = useState([])

    const setAndFilterImages = (source) => {
        Array.isArray(source) && source.length > 0 && source.map((item, index) => {
            const extension = item.split(".").pop()
            if (extension.toLowerCase() === "pdf") {
                setDocuments(prevDocuments => [...prevDocuments, item]);
                // TODO:add spread method to save new document + older documents
            } else {
                setImages(prevDocuments => [...prevDocuments, item]);
            }
        })
    }

    useEffect(() => {
        setAndFilterImages(source)
    }, [])
    useEffect(() => {
        console.log(images)
    }, [
        images
    ])
    return (
        <View>
            <Text>Proof of Work</Text>
            <>
                {
                    Array.isArray(images) && images.map((image, index) =>
                        <Image key={index} source={{ uri: image }} style={{ height: 200, width: 200, resizeMode: 'contain' }} height={200} width={200} />)
                }
            </>
            <>
                {
                    Array.isArray(documents) && documents.map((pdf, index) =>
                        <View
                            key={index}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: 20,
                                width: "30%",
                            }}
                        >
                            <Button
                                style={[
                                    styles.btn,
                                    styles.bgPrimary,
                                    { justifyContent: "center", width: "100%" },
                                ]}
                                onPress={() => Linking.openURL(pdf)}
                            >
                                <P
                                    style={[
                                        styles.btnText,
                                        typography.font16,
                                        typography.textLight,
                                    ]}
                                >
                                    View PDF
                                </P>
                            </Button>
                        </View>
                    )
                }
            </>



        </View>
    )
}