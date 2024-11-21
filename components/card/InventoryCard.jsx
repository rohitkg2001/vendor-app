import { View, TouchableOpacity, Image } from 'react-native'
import { H5, P } from '../../components/text'
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
    )
}