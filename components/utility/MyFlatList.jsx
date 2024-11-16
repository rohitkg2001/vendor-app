import { useEffect } from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import { styles } from "../../styles/components.styles";
import { PRIMARY_COLOR } from "../../styles/constant";

export default function MyFlatList({
  data,
  renderItem,
  keyExtractor,
  loading,
  holidays,
  ListEmptyComponent,
  ...props
}) {
  return (
    <View >
      {loading ? (
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListEmptyComponent={ListEmptyComponent}
          showsVerticalScrollIndicator={false}
          {...props}
        />
      )}
    </View>
  );
}
