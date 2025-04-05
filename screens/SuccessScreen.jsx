import { View, Text, ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { spacing, SCREEN_WIDTH, styles, typography } from "../styles";
import Button from "../components/buttons/Button";

const SuccessScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const params = route.params || {};
  const message = params.message || "Task update has been successfully saved.";
  const nextScreen = params.nextScreen || "taskScreen";

  useEffect(() => {
    setTimeout(() => {
      navigation.replace(nextScreen);
    }, 2000); // 2 sec delay
  }, []);

  return (
    <View
      style={{
        ...spacing.mh3,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        width: SCREEN_WIDTH - 16,
        paddingVertical: 20,
      }}
    >
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <>
          <Ionicons
            name="checkmark-sharp"
            size={100}
            color="green"
            style={{ marginBottom: 20 }}
          />
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            {message}
          </Text>
          <Button
            style={[styles.btn, styles.bgPrimary]}
            onPress={() => navigation.navigate(nextScreen)}
          >
            <Text style={[styles.btnText, typography.textLight]}>
              Continue Working
            </Text>
          </Button>
        </>
      )}
    </View>
  );
};

export default SuccessScreen;
