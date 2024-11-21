import { TouchableOpacity } from 'react-native'

export default function Button({ style, onPress, children }) {
    return (
        <TouchableOpacity style={style} onPress={onPress}>
            {children}
        </TouchableOpacity>
    )
}