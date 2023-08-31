import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
import ItemInput from "./components/ItemInput";
import Title from "./components/Title";

export default function App() {
  const [items, setItems] = useState([]);

  const addItemHandler = (enteredItemText) => {
    if (enteredItemText != "") {
      setItems((currentItems) => [...currentItems, { key: enteredItemText }]);
    } else {
      Alert.alert("Invalid input!");
    }
  };

  const deleteItemsHandler = () => {
    setItems([]);
  };

  return (
    <>
      <View style={styles.container}>
        <ItemInput onAddItem={addItemHandler} onDelete={deleteItemsHandler} />
        <Title />
        <View style={styles.goalsContainer}>
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <Text style={styles.itemText}>{"- " + item.key}</Text>
            )}
            keyExtractor={(item, index) => index.toString()}
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

  goalsContainer: {
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
});
