import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import axios from "axios";

export default function RatingScreen({ route, navigation }) {
  const { rideId, passengerName } = route.params || {};
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const API_BASE = "http://SEU_BACKEND:4000"; // trocar pelo backend real

  async function enviarAvaliacao() {
    if (rating === 0) {
      Alert.alert("Erro", "Selecione uma nota antes de enviar.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE}/rides/rate`, {
        rideId,
        rating_driver: rating,
        comment,
      });

      Alert.alert("Obrigado!", "Avaliação enviada com sucesso.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("DriverHome"),
        },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Falha ao enviar avaliação.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Avalie o Passageiro</Text>

      <Text style={styles.sub}>Passageiro: {passengerName || "Desconhecido"}</Text>

      {/* Seleção de Estrelas */}
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((n) => (
          <TouchableOpacity key={n} onPress={() => setRating(n)}>
            <Text style={[styles.star, rating >= n && styles.starSelected]}>
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Campo de Comentário */}
      <TextInput
        style={styles.input}
        placeholder="Comentário (opcional)"
        placeholderTextColor="#888"
        multiline
        value={comment}
        onChangeText={setComment}
      />

      {/* Botão Enviar */}
      <TouchableOpacity style={styles.button} onPress={enviarAvaliacao}>
        <Text style={styles.buttonText}>Enviar Avaliação</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    color: "#FFD700",
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  sub: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  star: {
    fontSize: 42,
    color: "#555",
    marginHorizontal: 8,
  },
  starSelected: {
    color: "#FFD700",
  },
  input: {
    backgroundColor: "#111",
    borderColor: "#FFD700",
    borderWidth: 1,
    borderRadius: 12,
    color: "#fff",
    fontSize: 16,
    padding: 12,
    height: 120,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});
