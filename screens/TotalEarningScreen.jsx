// 
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard1 from "../components/card/ClickableCard1";
import NoRecord from "./NoRecord";
import { useTranslation } from "react-i18next";

const TotalEarningScreen = () => {
  const { t } = useTranslation();

  return (
    <ContainerComponent>
      <MyHeader title={t("total_earning")} hasIcon={true} isBack={true} />

      <MyFlatList
        data={[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ClickableCard1
            key={index}
            item={item}
            title={item}
            subtitle={item}
          ></ClickableCard1>
        )}
        ListEmptyComponent={() => <NoRecord msg={t("no_earning")} />}
      />
    </ContainerComponent>
  );
};
export default TotalEarningScreen;
