// import react native
import { View, Image } from "react-native";
import { P } from "../components/text";
import { SCREEN_WIDTH, spacing } from "../styles";


export default function NoRecord({ msg }) {
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
      <Image
        source={require('../assets/norecode.png')}
        style={{ height: SCREEN_WIDTH / 2, width: SCREEN_WIDTH / 2 }}
        resizeMode="contain"
      />
      <P style={{ textAlign: "center" }}>{msg}</P>
    </View>
  );
};
