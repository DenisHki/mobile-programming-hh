import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Icon } from "@rneui/themed";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import ItemInput from "./components/ItemInput";
import Title from "./components/Title";
import database from "./database/db";
import { ref, onValue, remove } from "firebase/database";

export default function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemsRef = ref(database, "items/");
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemList = Object.entries(data).map(([key, value]) => ({
          key,
          product: value.enteredItem,
          amount: value.enteredAmount,
        }));
        setItems(itemList);
      } else {
        setItems([]);
      }
    });
  }, []);

  const addItemHandler = (enteredItemText) => {
    if (enteredItemText !== "") {
      setItems((currentItems) => [...currentItems, { key: enteredItemText }]);
    } else {
      Alert.alert("Invalid input!");
    }
  };

  // Remove all items
  const deleteItemsHandler = () => {
    const itemsRef = ref(database, "items/");
    remove(itemsRef).then(() => {
      setItems([]);
    });
  };

  // Remove item by id
  const deleteItemHandler = (item) => {
    const itemRef = ref(database, `items/${item.key}`);
    remove(itemRef).then(() => {
      setItems((prevItems) => prevItems.filter((i) => i.key !== item.key));
    });
  };

  const renderListItem = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.itemText}>{`${item.product} - ${item.amount}`}</Text>
    <TouchableOpacity onPress={() => deleteItemHandler(item)}>
      <Icon
        type="material"
        name="delete"
        color="red"
      />
    </TouchableOpacity>
  </View>
);

  return (
    <View style={styles.container}>
      <ItemInput onAddItem={addItemHandler} onDelete={deleteItemsHandler} />
      <Title />
      <View style={styles.itemsContainer}>
        <FlatList data={items} renderItem={renderListItem} />
      </View>
      <StatusBar style="auto" />
    </View>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    padding: 16,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  itemText: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 20,
  },
});
