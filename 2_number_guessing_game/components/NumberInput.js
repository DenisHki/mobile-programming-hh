import { TextInput, StyleSheet } from "react-native";

const NumberInput = ({ inputHandler, onEnterNum }) => {
  return (
    <TextInput
      style={styles.input}
      keyboardType="number-pad"
      onChangeText={inputHandler}
      value={onEnterNum}
      maxLength={3}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: 100,
    borderColor: "#CCCCCC",
    color: "#333333",
    fontSize: 28,
    fontWeight: "bold",
    borderRadius: 10,
    borderWidth: 1,
    margin: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    textAlign: "center",
  },
});

export default NumberInput;
