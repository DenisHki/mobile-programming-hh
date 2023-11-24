import React, { useState } from "react";
import { TextInput, View, StyleSheet, Text, Button, Alert } from "react-native";
import { push, ref } from 'firebase/database';
import database from "../database/db"; 

const ItemInput = (props) => {
  const [enteredItem, setEnteredItem] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");

  const addItemHandler = () => {
    if (!enteredItem.trim() || !enteredAmount.trim()) {
      Alert.alert("Invalid input!", "Please enter a valid item.");
      return;
    }
    push(ref(database, 'items/'), { enteredItem, enteredAmount });
    setEnteredItem("");
    setEnteredAmount("");
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        onChangeText={(text) => setEnteredItem(text)}
        placeholder="Enter an item..."
        style={styles.textInput}
        value={enteredItem}
      />
      <TextInput
        placeholder="Enter amount..."
        style={styles.textInput}
        onChangeText={(text) => setEnteredAmount(text)}
        value={enteredAmount}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Add Item" onPress={addItemHandler} color="#9966ff" />
        </View>
        <View style={styles.button}>
          <Button title="Clear" onPress={props.onDelete} color="#f31282" />
        </View>
      </View>
    </View>
  );
};

export default ItemInput;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "pink",
    marginTop: 50,
    borderRadius: 6,
  },
  inputFieldsContainer: {
    width: "100%",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    borderRadius: 6,
    width: "100%",
    padding: 16,
    fontSize: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
});