import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import axios from "axios";

const API_BASE = "http://SEU_BACKEND:4000"; // ajuste para seu backend real

export default function PassengerRatingScreen({ route, navigation }) {
  const { rideId, driverId } = route.params;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  async function sendRating() {
    if (rating === 0) {
      alert("Por favor, selecione uma nota.");
      return;
    }

    try {
      await axios.post(`${API_BASE}/ratings/passenger`, {
        ride_id: rideId,
        driver_id: driverId,
        rating_passenger: rating,
        comment,
      });

      alert("Avaliação enviada com sucesso!");
      navigation.replace("PassengerHome");
    } catch (err) {
      console.log("Erro ao enviar avaliação:", err);
      alert("Erro ao enviar avaliação.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Avalie o Motorista</Text>
      <Text style={styles.subtitle}>Sua opinião é importante</Text>

      {/* Estrelas */}
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((s) => (
          <TouchableOpacity key={s} onPress={() => setRating(s)}>
            <Text style={[styles.star, rating >= s && styles.starSelected]}>
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Comentário */}
      <TextInput
        style={styles.input}
        placeholder="Escreva um comentário (opcional)"
        placeholderTextColor="#666"
        value={comment}
        onChangeText={setComment}
        multiline
      />

      {/* Botão */}
      <TouchableOpacity style={styles.button} onPress={sendRating}>
        <Text style={styles.buttonText}>Enviar Avaliação</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
    justifyContent: "center",
  },

  title: {
    color: "#FFD700",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    color: "#aaa",
    textAlign: "center",
    marginBottom: 30,
  },

  starsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
  },

  star: {
    fontSize: 40,
    color: "#444",
    marginHorizontal: 8,
  },

  starSelected: {
    color: "#FFD700",
  },

  input: {
    backgroundColor: "#111",
    borderColor: "#333",
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    color: "#fff",
    minHeight: 100,
    marginBottom: 25,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 12,
  },

  buttonText: {
    color: "#000",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
});
