import { View, Pressable, Text, StyleSheet } from "react-native";

const CustomButton = ({ onPress, children }) => {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 30,
  },

  buttonInnerContainer: {
    backgroundColor: "#007BFF",
    paddingVertical: 28,
    paddingHorizontal: 20,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },

  pressed: {
    opacity: 0.75,
  },
});

export default CustomButton;
