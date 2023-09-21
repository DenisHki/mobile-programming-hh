import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function App() {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState();
  const [currency, setCurrency] = useState("USD");
  const [result, setResult] = useState(0);

  const fetchData = () => {
    fetch("https://api.apilayer.com/exchangerates_data/latest", {
      headers: { apikey: "MY_API" },
    })
      .then((response) => response.json())
      .then((data) => setRates(data.rates))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate conversion
  const rateConversion = () => {
    const rate = rates[currency];
    setResult((parseFloat(amount) / rate).toFixed(4));
  };

  const resetHandler = () => {
    setAmount();
    setResult(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Currency Converter</Text>
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{result} €</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Enter amount"
          keyboardType="numeric"
          onChangeText={(text) => setAmount(text)}
          value={amount}
        />
        <Picker
          style={styles.currencyPicker}
          selectedValue={currency}
          onValueChange={(value) => setCurrency(value)}
        >
          {Object.keys(rates).map((item) => (
            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Convert" onPress={rateConversion} />
        </View>
        <View style={styles.button}>
          <Button title="Reset" onPress={resetHandler} color="red" />
        </View>
      </View>
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
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  inputContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  inputField: {
    fontSize: 20,
    width: 150,
    marginRight: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  currencyPicker: {
    height: 40,
    width: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  resultContainer: {
    marginBottom: 20,
  },
  resultText: {
    fontSize: 24,
  },
  buttonContainer: {
    //width: 150,
    flexDirection: "row",
  },

  button: {
    width: 100,
    height: 100,
    borderRadius: 40,
    margin: 10,
  },
});
