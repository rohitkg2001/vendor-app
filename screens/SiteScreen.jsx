import { useEffect, useState, useCallback } from "react";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import NoRecord from "./NoRecord";
import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard1 from "../components/card/ClickableCard1";
import SearchBar from "../components/input/SearchBar";

import { useTranslation } from "react-i18next";

import { useSelector } from "react-redux";

export default function SiteScreen({ navigation }) {
  const { t } = useTranslation();
  const { sites } = useSelector((state) => state.site);
  const [searchText, setSearchText] = useState(""); // State for search input
  useEffect(() => {
    console.log(sites);
  }, []);

  // Filter sites based on search query
  const filteredSites = sites.filter((site) =>
    site.site_name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearchChange = useCallback((text) => {
    setSearchText(text);
  }, []);

  return (
    <ContainerComponent>
      <MyHeader isBack title={t("total_sites")} hasIcon />

      <SearchBar
        value={searchText}
        onChangeText={handleSearchChange}
        style={{ marginHorizontal: 10 }}
      />
      <MyFlatList
        data={filteredSites}
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
        showSearchBar={false}
      />
    </ContainerComponent>
  );
}
