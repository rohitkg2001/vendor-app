import { View } from "react-native";
import {  P } from "../components/text";
import { SCREEN_WIDTH, spacing} from "../styles";


const NoRecord = ({ msg }) => {
  return (
    <View
      style={[
        spacing.mh3,
        {
          alignItems: "center",
          width: SCREEN_WIDTH - 16,
          paddingVertical: 10,
        },
      ]}
    >
      <P style={{ textAlign: "center" }}>{msg}</P>
    </View>
  );
};

export default NoRecord;
