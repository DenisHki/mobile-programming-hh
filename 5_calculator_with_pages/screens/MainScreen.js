import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
} from "react-native";

export default function MainScreen({ navigation }) {
  const [firstNum, setFirstNum] = useState("");
  const [secondNum, setSecondNum] = useState("");
  const [result, setResult] = useState("");
  const [data, setData] = useState([]);

  // focus here
  const firstNumInputRef = useRef();

  const firstNumInputHandler = (firstNum) => {
    setFirstNum(firstNum);
  };

  const secondNumInputHandler = (secondNum) => {
    setSecondNum(secondNum);
  };

  // Reset input values
  const resetHandler = () => {
    setFirstNum("");
    setSecondNum("");
  };

  const sumHandler = () => {
    if (
      isNaN(firstNum) ||
      isNaN(secondNum) ||
      firstNum === "" ||
      secondNum === ""
    ) {
      Alert.alert("Invalid input!");
      return;
    }

    const newResult = Number(firstNum) + Number(secondNum);
    setResult(newResult);

    const historyOutput = `${firstNum} + ${secondNum} = ${newResult}`;
    setData([{ key: historyOutput }, ...data]);

    resetHandler();
    firstNumInputRef.current.focus();
  };

  const subtractHandler = () => {
    if (
      isNaN(firstNum) ||
      isNaN(secondNum) ||
      firstNum === "" ||
      secondNum === ""
    ) {
      Alert.alert("Invalid input!");
      return;
    }

    const newResult = Number(firstNum) - Number(secondNum);
    setResult(newResult);

    const historyOutput = `${firstNum} - ${secondNum} = ${newResult}`;
    setData([{ key: historyOutput }, ...data]);

    resetHandler();
    firstNumInputRef.current.focus();
  };

  const navigateToHistory = () => {
    navigation.navigate("History", { historyData: data });
  };

  return (
    <View style={styles.container}>
      <Image source={require("../images/hh-logo.png")} style={styles.image} />
      <Text style={styles.header}>Result: {result}</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        value={firstNum}
        onChangeText={firstNumInputHandler}
        ref={firstNumInputRef}
      />
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        value={secondNum}
        onChangeText={secondNumInputHandler}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="+" onPress={sumHandler} />
        </View>
        <View style={styles.button}>
          <Button title="-" onPress={subtractHandler} />
        </View>
        <View style={styles.button}>
          <Button title="History" onPress={navigateToHistory} />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
    textAlign: "center",
  },

  input: {
    width: 200,
    borderColor: "blue",
    borderWidth: 1,
    margin: 6,
    padding: 6,
    borderRadius: 10,
    fontSize: 18,
  },

  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },

  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 10,
  },

  image: {
    width: 250,
    height: 250,
  },
});
