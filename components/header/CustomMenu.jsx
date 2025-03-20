import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Menu, Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { ICON_MEDIUM } from "../../styles/constant";
import { spacing } from "../../styles";

export default function CustomMenu({ icon, menuItems = [] }) {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <TouchableOpacity onPress={openMenu} style={{ padding: 8 }}>
          <Icon name={icon} size={ICON_MEDIUM} />
        </TouchableOpacity>
      }
      style={[spacing.mt4]}
    >
      {menuItems.length > 0 ? (
        menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <Menu.Item onPress={item.onPress} title={item.title} />
            {index < menuItems.length - 1 && <Divider />}
          </React.Fragment>
        ))
      ) : (
        <Menu.Item title="No options available" disabled />
      )}
    </Menu>
  );
}
