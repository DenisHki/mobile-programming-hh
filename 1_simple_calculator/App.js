import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  Image,
} from "react-native";

export default function App() {
  const [firstNum, setFirstNum] = useState("");
  const [secondNum, setSecondNum] = useState("");
  const [result, setResult] = useState("");

  const firstNumInputHandler = (firstNum) => {
    setFirstNum(firstNum);
  };

  const secondNumInputHandler = (secondNum) => {
    setSecondNum(secondNum);
  };

  const resetHandler = () => {
    setFirstNum("");
    setSecondNum("");
    if (
      isNaN(firstNum) ||
      isNaN(secondNum) ||
      firstNum == "" ||
      secondNum == ""
    ) {
      Alert.alert("Invalid input!");
      setResult("");
    }
  };

  const sumHandler = () => {
    setResult(Number(firstNum) + Number(secondNum));
    resetHandler();
  };

  const subtractHandler = () => {
    setResult(Number(firstNum) - Number(secondNum));
    resetHandler();
  };

  return (
    <View style={styles.container}>
      <Image source={require("./images/hh-logo.png")} style={styles.image} />
      <Text style={styles.header}>Result: {result}</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        value={firstNum}
        onChangeText={firstNumInputHandler}
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
  },

  input: {
    width: 200,
    borderColor: "blue",
    borderWidth: 1,
    margin: 6,
    padding: 6,
    borderRadius: 10,
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
