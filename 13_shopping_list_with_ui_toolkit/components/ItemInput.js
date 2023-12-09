import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Input, Button } from '@rneui/themed';
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
      <Input
        onChangeText={(text) => setEnteredItem(text)}
        placeholder="Enter an item..."
        style={styles.textInput}
        value={enteredItem}
      />
      <Input
        placeholder="Enter amount..."
        style={styles.textInput}
        onChangeText={(text) => setEnteredAmount(text)}
        value={enteredAmount}
      />
      <View style={styles.buttonContainer}>
        <Button
          raised
          icon={{ name: 'save' }}
          onPress={addItemHandler}
          color="#9966ff"
          style={styles.button}
        >
          Add Item
        </Button>
        <View style={styles.buttonSpacer}></View>
        <Button
          raised
          icon={{ name: 'clear' }}
          onPress={props.onDelete}
          color="#f31282"
          style={styles.button}
        >
          Clear
        </Button>
      </View>
    </View>
  );
};

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
    justifyContent: "center", // Center the buttons
  },
  button: {
    marginHorizontal: 8,
  },
  buttonSpacer: {
    width: 16,
  },
});

export default ItemInput;
