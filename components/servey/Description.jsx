import { useState } from "react";
import MyTextInput from "../input/MyTextInput";
import { useTranslation } from "react-i18next";

export default function Description({ description, setDescription }) {
  const { t } = useTranslation();

  return (
    <MyTextInput
      title={t("description")}
      height={190}
      onChangeText={(text) => setDescription(text)}
      type="text"
      placeholder={t("description_title")}
      multiline
      numberOfLines={4}
      value={description}
    />
  );
}


