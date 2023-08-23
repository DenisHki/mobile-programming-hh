import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert, } from "react-native";
import { useState, useEffect } from "react";
import CustomButton from "./components/CustomButton";
import Header from "./components/Header";
import NumberInput from "./components/NumberInput";

export default function App() {
  const [enteredNumber, setEnteredNumber] = useState("");
  const [guesses, setGuesses] = useState(1);
  const [randomNum, setRandomNum] = useState(0);

  useEffect(() => {
    generateRandomNum();
  }, []);

  const generateRandomNum = () =>
    setRandomNum(Math.floor(Math.random() * 100) + 1);

  const numberInputHandler = (enteredText) => {
    setEnteredNumber(enteredText);
  };

  const guessCounter = () => {
    setGuesses(guesses + 1);
  };

  const checkGuessHandler = () => {
    const chosenNum = enteredNumber;

    if (
      isNaN(chosenNum) ||
      chosenNum < 0 ||
      chosenNum > 100 ||
      chosenNum == ""
    ) {
      Alert.alert(
        "Invalid number!",
        "Enter a valid number between 1 and 100.",
        [{ text: "Okay" }]
      );
      guessCounter();
    } else if (chosenNum == randomNum) {
      guessCounter();
      Alert.alert(
        "Correct!",
        `Your score: ${guesses} ${guesses == 1 ? "round" : "rounds"}`,
        [{ text: "Okay" }]
      );
      generateRandomNum();
      setGuesses(1);
    } else if (chosenNum > randomNum) {
      guessCounter();
      Alert.alert("Wrong!", "Your number is too high", [{ text: "Okay" }]);
    } else if (chosenNum < randomNum) {
      guessCounter();
      Alert.alert("Wrong!", "Your number is too low", [{ text: "Okay" }]);
    }
    setEnteredNumber("");
  };
  
  return (
    <View style={styles.container}>
      <Header />
      <NumberInput
        inputHandler={numberInputHandler}
        onEnterNum={enteredNumber}
      />
      <CustomButton onPress={checkGuessHandler}>
        <Text>MAKE GUESS</Text>
      </CustomButton>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
});
