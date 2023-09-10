import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function HistoryScreen({ route }) {
  const { historyData } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>History:</Text>
      <FlatList
        data={historyData}
        renderItem={({ item }) => (
          <Text style={styles.historyItem}>{item.key} </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
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
      marginBottom: 12,
      textAlign: "center",
      marginTop: 20,
      
    },
  
    history: {
      flex: 1,
      marginTop: 10,      
    },

    historyItem: {
      fontSize: 18,
      textAlign: "center",
      marginBottom: 10,
      paddingHorizontal: 100,  
    },
  });

