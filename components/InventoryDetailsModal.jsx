import React from "react";
import { View, Image } from "react-native";
import ModalPopup from "./Modal";
import { P, Span } from "./text";
import { layouts } from "../styles";

export default function InventoryDetailsModal({
  visible,
  onClose,
  selectedItem,
}) {
  if (!selectedItem) return null;

  return (
    <ModalPopup
      visible={visible}
      close={onClose}
      negativeButton="Close"
      positiveButton="OK"
      action={null}
    >
      <P>
        {selectedItem.productName} Allocated for {selectedItem.project}
      </P>
      <P>
        Site Name: {selectedItem.site?.location}, Dist:{selectedItem.site?.dist}
      </P>
      <P>Initial Quantity: {selectedItem.initialQuantity}{selectedItem.unit}</P>
      <P>Material Dispatch Date: {selectedItem.materialDispatchDate}</P>
      <P>Delivery Date: {selectedItem.deliveryDate} </P>
      <P>Allocated By : {selectedItem.allocationOfficer} </P>
      <View style={layouts.center}>
        <Image
          source={{ uri: selectedItem.url }}
          style={{
            height: 200,
            width: 200,
          }}
          resizeMode="contain"
        />

        <Span style={[{ marginLeft: "auto" }]}>View Details</Span>
      </View>
    </ModalPopup>
  );
}
