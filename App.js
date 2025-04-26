import "react-native-gesture-handler"; //Don't ever remove this line
import { useState, useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import MyNavigationContainer from "./navigation/MyNavigationContainer";
import { Provider } from "react-redux";
import store from "./store";
import i18n from "./i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LanguageSelector from './components/LanguageSelector'
import useFonts from "./hooks/useFonts";
import { ActivityIndicator } from "react-native";

export default function App() {
  const [language, setLanguage] = useState(null);
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);
  const [loaded, setLoaded] = useState(true)

  const loadFonts = async () => {
    await useFonts();
    setLoaded(false)
  };

  const selectLanguage = async (lang) => {
    await AsyncStorage.setItem("appLanguage", lang);
    i18n.changeLanguage(lang);
    setLanguage(lang);
    setIsLanguageSelected(true);
  };

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

  useEffect(() => {
    fetchLanguage();
    loadFonts()
  }, []);


  if (!isLanguageSelected) {
    return <LanguageSelector onSelectLanguage={selectLanguage} />;
  }
  if (loaded) return <ActivityIndicator size="large" animating />

  return (
    <Provider store={store}>
      <PaperProvider>
        <MyNavigationContainer />
      </PaperProvider>
    </Provider>
  );
}
