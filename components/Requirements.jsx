import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { Card, Avatar, IconButton } from "react-native-paper";

const data = [
  { id: "1", title: "Headline", subtitle: "Supporting text" },
  { id: "2", title: "Headline", subtitle: "Supporting text" },
  { id: "3", title: "Headline", subtitle: "Supporting text" },
  { id: "4", title: "Headline", subtitle: "Supporting text" },
  { id: "5", title: "Headline", subtitle: "Supporting text" },
];

const Requirements = () => {
  const renderListItem = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.container}>
        <Avatar.Text size={40} label="A" style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
        <IconButton
          icon="triangle-outline"
          size={20}
          style={styles.icon}
          color="gray"
        />
      </View>
    </Card>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderListItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingVertical: 8,
  },
  card: {
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  avatar: {
    backgroundColor: "#E0BBE4",
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
  },
  icon: {
    marginRight: 0,
  },
});

export default Requirements;
