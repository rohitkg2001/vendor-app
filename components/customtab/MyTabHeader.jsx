import { View, Text } from 'react-native'
import { TabBar } from 'react-native-tab-view'

export default function MyTabHeader(props) {
    return (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: 'black', height: 80 }}
            scrollEnabled
            tabStyle={{ width: 'auto', height: 100 }}
            labelStyle={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}
            badge={() => <View><Text>0</Text></View>}
        />
    )
}