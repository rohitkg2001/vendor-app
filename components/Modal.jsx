import { Modal, Portal, } from "react-native-paper";
import { DANGER_COLOR, LIGHT, SCREEN_HEIGHT, SCREEN_WIDTH, SECONDARY_COLOR } from "../styles/constant";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"
import { H4 } from "./text";
import Button from "./buttons/Button";
import { styles } from "../styles/components.styles";

export default function ModalPopup({ close, visible, negativeButton, positiveButton, action, children }) {

  return (
    <Portal>
      <Modal visible={visible} onDismiss={close}>
        <View style={{ backgroundColor: LIGHT, width: SCREEN_WIDTH - 32, marginHorizontal: 8, minHeight: SCREEN_HEIGHT / 6, borderRadius: 16 }}>
          {/* Popup header */}
          <Icon name="close-outline" style={{ position: 'absolute', right: -12, top: -10 }} color={DANGER_COLOR} size={32} />

          <View style={{ padding: 16 }} >
            {children}
          </View>
          <View style={{ flexDirection: 'row', padding: 16, justifyContent: 'space-between', alignItems: 'center', borderTopColor: SECONDARY_COLOR, borderTopWidth: 1 }}>
            <Button
              style={{ borderRightColor: SECONDARY_COLOR, borderRightWidth: 1, paddingHorizontal: (SCREEN_WIDTH / 6) - 36, marginLeft: 20 }} onPress={close}>
              <H4 style={[styles.textSecondary, styles.textLarge, { textAlign: 'right', textTransform: 'uppercase' }]} >{negativeButton}</H4>
            </Button>
            <Button style={{ paddingHorizontal: (SCREEN_WIDTH / 6) - 36, marginRight: 20 }} onPress={action} >
              <H4 style={[styles.textSecondary, styles.textLarge, styles.textDanger, { textAlign: 'left', textTransform: 'uppercase' }]}>{positiveButton}</H4>
            </Button>
          </View>
        </View>
      </Modal>
    </Portal >

  );
}
