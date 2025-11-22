import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import axios from "axios";

export default function BonusScoreScreen() {
  const [score, setScore] = useState(null);

  useEffect(() => {
    axios.get("https://SEUSERVIDOR/api/driver/bonus-status")
      .then(res => setScore(res.data));
  }, []);

  if (!score) {
    return (
      <View style={{ backgroundColor: "#000", flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#f0c060", fontSize: 20 }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#000" }}>
      <Text style={{ color: "#f0c060", fontSize: 28 }}>Bônus Kaviar Premium</Text>

      <Text style={{ color: "#fff", marginTop: 20, fontSize: 18 }}>
        ⭐ Avaliação atual: {score.rating}
      </Text>
      <Text style={{ color: "#fff", marginTop: 8, fontSize: 18 }}>
        🚫 Cancelamentos: {score.cancelRate}%
      </Text>
      <Text style={{ color: "#fff", marginTop: 8, fontSize: 18 }}>
        🚗 Corridas realizadas: {score.rides}
      </Text>

      <Text style={{ color: "#f0c060", marginTop: 20, fontSize: 20 }}>
        Progresso: {score.progress}%
      </Text>
    </View>
  );
}
