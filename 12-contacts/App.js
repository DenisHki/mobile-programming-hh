import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      if (data.length > 0) {
        setContacts(data);
        setContact(data[0]);
      }
    }
  };

  const getNextContact = () => {
    const nextIndex = (currentIndex + 1) % contacts.length;
    setCurrentIndex(nextIndex);
    setContact(contacts[nextIndex]);
  };

  const getPreviousContact = () => {
    const prevIndex = (currentIndex - 1 + contacts.length) % contacts.length;
    setCurrentIndex(prevIndex);
    setContact(contacts[prevIndex]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`Name: ${contact.name}`}</Text>
      {contact.phoneNumbers && (
        <Text style={styles.text}>{`Phone: ${contact.phoneNumbers[0]?.number}`}</Text>
      )}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.getContactsButton]}
          onPress={getContacts}
        >
          <Text style={styles.buttonText}>Get Contacts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.clearButton]}
          onPress={() => setContact({})}
        >
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.previousNextButton]}
          onPress={getPreviousContact}
        >
          <Text style={styles.buttonText}>Previous Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.previousNextButton]}
          onPress={getNextContact}
        >
          <Text style={styles.buttonText}>Next Contact</Text>
        </TouchableOpacity>
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
  text: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  button: {
    width: "40%",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
  getContactsButton: {
    backgroundColor: "#3498db",
  },
  clearButton: {
    backgroundColor: "red",
  },
  previousNextButton: {
    backgroundColor: "lightgreen",
  },
});
