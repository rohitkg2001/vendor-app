import "react-native-gesture-handler"; //Don't ever remove this line
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-native-paper";

export default function App() {
  return (
    <Provider>
    <PaperProvider>
      <MyNavigationContainer />
    </PaperProvider>
    </Provider>
  );
}
