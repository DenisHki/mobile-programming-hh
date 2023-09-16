import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const getRepositories = () => {
    setIsVisible(true);
    //fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    fetch(process.env.EXPO_PUBLIC_API_URL + "?i=" + keyword)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals) {
          setRepositories(data.meals);
        } else {
          setRepositories([]);
          Alert.alert("No Results", "No recipes found for the given keyword.");
        }
        setIsVisible(false);
      })
      .catch((err) => {
        setIsVisible(false);
        Alert.alert("Error", "Something went wrong");
      });
  
    setKeyword("");
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator animating={isVisible} size="large" />
      {repositories.length === 0 ? (
        <Text style={styles.title}>Recipe finder</Text>
      ) : (
        <Text style={styles.title}>Found<Text style={{color: '#196ef7'}}> {repositories.length} </Text>results:</Text>
      )}
      <FlatList
        style={styles.list}
        data={repositories}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.strMeal}</Text>
            <Image style={styles.image} source={{ uri: item.strMealThumb }} />
            <Text style={styles.itemText}>{item.idMeal}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        style={styles.input}
        placeholder="keyword"
        value={keyword}
        onChangeText={(text) => setKeyword(text)}
      />
      <View style={styles.buttonContainer}>
        <Button title="Find" onPress={getRepositories} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginBottom: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,

  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 20
  },
  list: {
    width: "80%",
  },
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    alignItems: "center",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  buttonContainer: {
    height: 100,
    width: 100,
  },
});
