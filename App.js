import "react-native-gesture-handler"; //Don't ever remove this line
import { useState, useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import MyNavigationContainer from "./navigation/MyNavigationContainer";
import { Provider } from "react-redux";
import store from "./store";
import i18n from "./i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LanguageSelector from './components/LanguageSelector'
import { View, ActivityIndicator } from 'react-native'

export default function App() {
  const [language, setLanguage] = useState(null);
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);

  const selectLanguage = async ( lang ) =>
  {
 
    await AsyncStorage.setItem("appLanguage", lang);
    i18n.changeLanguage(lang);
    setLanguage(lang);
    setIsLanguageSelected(true);
  };

  useEffect(() => {
    const fetchLanguage = async () => {
      const storedLanguage = await AsyncStorage.getItem("appLanguage");
      if (storedLanguage) {
        i18n.changeLanguage(storedLanguage); 
        setLanguage(storedLanguage);
        setIsLanguageSelected(true);
      } else {
        setIsLanguageSelected(false); 
      }
    };

    fetchLanguage();
  }, []);

  if (!language) {
    // Show a loading indicator while language is being fetched
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  // 1.App loads
  // 2. Check for appLanguage key in localstorage
  // 3.If !isLanguageSelected->LanguageSelector
  // 4.Otherwise return to main flow
  // 5. Check is user is already loggedin userId, sessionId ->Dashboard
  // 6.return LoginPage


  if (!isLanguageSelected) {
    return <LanguageSelector onSelectLanguage={selectLanguage} />;
  }

  return (
    <Provider store={store}>
      <PaperProvider>
        <MyNavigationContainer />
      </PaperProvider>
    </Provider>
  );
}
