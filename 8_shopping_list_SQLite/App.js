import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import ItemInput from "./components/ItemInput";
import Title from "./components/Title";
import db, { initDatabase } from "./database/db";

export default function App() {
  const [items, setItems] = useState([]);

  const updateList = () => {
    db.transaction((tx) => {
      tx.executeSql("select * from shoppinglist;", [], (_, { rows }) =>
        setItems(rows._array)
      );
    });
  };

  const deleteItemsHandler = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("delete from shoppinglist;");
      },
      null,
      updateList
    );
  };

  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from shoppinglist where id = ?;`, [id]);
      }, null, updateList
    )    
  }

  useEffect(() => {
    initDatabase();
    updateList();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <ItemInput onAddItem={updateList} onDelete={deleteItemsHandler} />
        <Title />
        <View style={styles.itemsContainer}>
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{`- ${item.product}, ${item.amount}`}</Text>
                <TouchableOpacity onPress={() => deleteItem(item.id)}>
                  <Text style={styles.boughtButton}>Bought</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <StatusBar style="auto" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#ccccff",
  },
  itemsContainer: {
    flex: 5,
    justifyContent: "center",
    width: "80%",
    marginLeft: "10%",
  },
  itemText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 20,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  boughtButton: {
    color: "red",
    fontWeight: "bold",
    marginLeft: 10,
  },
});

