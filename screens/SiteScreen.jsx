import { useEffect, useState } from "react";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import NoRecord from "./NoRecord";
import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard1 from "../components/card/ClickableCard1";

import { useTranslation } from "react-i18next";

import { useSelector } from "react-redux";

export default function SiteScreen({ navigation }) {
  const { t } = useTranslation();
  const { sites } = useSelector((state) => state.site);

  useEffect(() => {
    console.log(sites);
  }, []);

  return (
    <ContainerComponent>
      <MyHeader isBack title={t("total_sites")} hasIcon />
      <MyFlatList
        data={sites}
        renderItem={({ item, index }) => (
          <ClickableCard1
            key={index}
            item={item}
            title={item.site_name || item.id}
            subtitle={`${item.location}, ${item.district} `}
            onPress={() =>
              navigation.navigate("siteDetailsScreen", { site: item })
            }
          ></ClickableCard1>
        )}
        ListEmptyComponent={() => <NoRecord msg={t("no_site")} />}
      />
    </ContainerComponent>
  );
}
