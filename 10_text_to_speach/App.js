import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import * as Speech from "expo-speech";

export default function App() {
  const [textToPlay, setTextToPlay] = useState("");

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const voices = await Speech.getAvailableVoicesAsync();
        console.log(voices);
      } catch (error) {
        console.error("Error fetching available voices:", error);
      }
    };
    fetchVoices();
  }, []);

  const textPlayerHandler = () => {
    const options = {
      language: "en",
      pitch: 1.0,
      rate: 0.8,
      onStart: () => {
        console.log("Speech started");
      },
      onDone: () => {
        console.log("Speech done");
      },
      onError: (error) => {
        console.error("Speech error:", error);
      },
    };
    Speech.speak(textToPlay, options);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Text to Speech App</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTextToPlay}
        value={textToPlay}
        placeholder="Enter text to play"
      />
      <Button title="Play Text" onPress={textPlayerHandler} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
});
