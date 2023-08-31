import { useState } from "react";
import { TextInput, View, StyleSheet, Text, Button } from "react-native";

const ItemInput = (props) => {
  const [enteredItem, setEnteredItem] = useState("");

  const itemInputHandler = (enteredItem) => {
    setEnteredItem(enteredItem);
  };

  const addItemHandler = () => {
    props.onAddItem(enteredItem);
    setEnteredItem("");
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        onChangeText={itemInputHandler}
        placeholder="Enter an item..."
        style={styles.textInput}
        value={enteredItem}
      />
      <Text>{enteredItem}</Text>
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
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "pink",
    padding: 50,
    marginTop: 50,
    borderRadius: 6,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    borderRadius: 6,
    width: "100%",
    padding: 16,
    fontSize: 20,
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
