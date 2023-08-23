import { Text, StyleSheet } from "react-native";

const Header = () => {
  return <Text style={styles.header}>Guess a number between 1-100</Text>;
};

const styles = StyleSheet.create({
  header: {
    fontSize: 37,
    fontWeight: "bold",
    textAlign: "center",
    padding: 12,
    margin: 10,
    maxWidth: "80%",
    width: 300,
    marginBottom: 20,
  },
});

export default Header;
