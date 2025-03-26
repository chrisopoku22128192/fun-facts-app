import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";
import axios from "axios"; 

export default function App() {
  const [fact, setFact] = useState("Press the button for a fun fact!");
  const [loading, setLoading] = useState(false);

  const fetchFact = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://uselessfacts.jsph.pl/random.json?language=en");
      setFact(response.data.text);
    } catch (error) {
      setFact("Failed to fetch a fact. Try again!");
      console.error("Error fetching fun fact:", error);
    }
    setLoading(false);
  };

  return (
    <ImageBackground source={require("./assets/assets/fun-facts-bg.jpg")} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.factText}>{fact}</Text>
        <TouchableOpacity style={styles.button} onPress={fetchFact} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Loading..." : "Get Fun Fact"}</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  factText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
    color: "#fff",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
