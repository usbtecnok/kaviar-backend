import React, { useState } from "react";
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";
import axios from "axios";

const GOOGLE_API_KEY = "AIzaSyAXQivhdYP5cYtHCWXPjMnjBwwOurveRw4";

export default function SearchLocationScreen({ navigation, route }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (text: string) => {
    setQuery(text);

    if (text.length < 3) return;

    try {
      const res = await axios.get(
        "https://maps.googleapis.com/maps/api/place/autocomplete/json",
        {
          params: {
            key: GOOGLE_API_KEY,
            input: text,
            language: "pt-BR",
            components: "country:br",
          },
        }
      );

      setResults(res.data.predictions);
    } catch (e) {
      console.log("Erro API Places:", e);
    }
  };

  const selectPlace = async (placeId: string, description: string) => {
    try {
      const res = await axios.get(
        "https://maps.googleapis.com/maps/api/place/details/json",
        {
          params: {
            key: GOOGLE_API_KEY,
            place_id: placeId,
            language: "pt-BR",
          },
        }
      );

      const loc = res.data.result.geometry.location;

      navigation.navigate("RoutePreview", {
        pickup: route.params?.pickup,
        destination: {
          lat: loc.lat,
          lng: loc.lng,
          description,
        },
      });
    } catch (e) {
      console.log("Erro place details:", e);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Para onde vamos?"
        placeholderTextColor="#999"
        style={styles.input}
        value={query}
        onChangeText={handleSearch}
      />

      <FlatList
        data={results}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => selectPlace(item.place_id, item.description)}
          >
            <Text style={styles.itemText}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 16 },

  input: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 12,
  },

  item: {
    padding: 12,
    backgroundColor: "#111",
    borderBottomColor: "#333",
    borderBottomWidth: 1,
  },

  itemText: {
    color: "#FFD700",
    fontSize: 16,
  },
});
