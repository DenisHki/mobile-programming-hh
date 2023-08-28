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
  FlatList,
} from "react-native";

export default function App() {
  const [firstNum, setFirstNum] = useState("");
  const [secondNum, setSecondNum] = useState("");
  const [result, setResult] = useState("");
  const [data, setData] = useState([]);

  const firstNumInputHandler = (firstNum) => {
    setFirstNum(firstNum);
  };

  const secondNumInputHandler = (secondNum) => {
    setSecondNum(secondNum);
  };

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

      <View style={styles.history}>
        <Text style={styles.header}>History:</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Text style={styles.historyItem}>{item.key} </Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
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
    flex: 1,
    width: 250,
    height: 250,
  },

  history: {
    flex: 1,
    marginTop: 10,
    
  },
  historyItem: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
