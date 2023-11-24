import { View, Text, StyleSheet } from "react-native";

const Title = () => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>SHOPPING LIST:</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  titleContainer: {    
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff0066",
  },
});
