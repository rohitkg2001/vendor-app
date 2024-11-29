import { View, TouchableOpacity, Image } from 'react-native'
import { H5, P } from '../../components/text'
<<<<<<< HEAD
import { styles, spacing, SCREEN_WIDTH, SECONDARY_COLOR } from '../../styles'

export default function InventoryCard({ item }) {
    return (
        <TouchableOpacity style={[styles.row, spacing.br2, spacing.bw1, spacing.m1, spacing.p2, { borderColor: SECONDARY_COLOR }]}>
            <Image
                source={{ uri: item.url }}
                style={[{ width: 80, height: 80 }, spacing.mr4, spacing.br2]}
            />
            <View style={{ flex: 1 }}>
                <H5>{item.product_name}</H5>
                <P>{item.description}</P>
                <View style={[styles.row, { width: SCREEN_WIDTH - 120 }]}>
                    <P>Delivered: {item.delivery_date}</P>
                    <P>Qty: {item.qty_stock} {item.unit}</P>
                </View>
            </View>
        </TouchableOpacity>
=======
import { styles, spacing, SCREEN_WIDTH, LIGHT } from '../../styles'
import { useTranslation } from 'react-i18next'
import { Card } from 'react-native-paper'

export default function InventoryCard({ item, onPress }) {
    const { t } = useTranslation()
    return (
        <Card
            style={[
                spacing.mv1,
                spacing.mh2,
                spacing.p2,
                {
                    width: SCREEN_WIDTH - 16,
                    backgroundColor: LIGHT,
                },
            ]}>
            <TouchableOpacity style={[styles.row, { alignItems: 'center' }]} onPress={onPress}>
                <Image
                    source={{ uri: item.url }}
                    style={[{ width: 72, height: 72 }, spacing.mr4, spacing.br2]}
                />


                <View style={{ flex: 1 }} >
                    <H5>{item.product_name}</H5>
                    <P>{item.description}</P>
                    <View style={[styles.row, spacing.mv1, { width: SCREEN_WIDTH - 120 }]}>
                        <P>{t('delivered_title')}: {item.delivery_date}</P>
                        <P>{t('quantity_title')}: {item.qty_stock} {item.unit}</P>
                    </View>
                </View>
            </TouchableOpacity>
        </Card>
>>>>>>> a85e4be1654a673a6c01d9c3c97de764acfbdfdc
    )
}