import React, { useState } from "react";
import { TouchableOpacity, Text, ActivityIndicator, Alert, StyleSheet } from "react-native";
import api from "../utils/api";

const PanicButton = ({ userId, style }) => {
  const [loading, setLoading] = useState(false);

  const handlePanicPress = async () => {
    try {
      setLoading(true);

      // Simulação de coordenadas — futuramente pode usar expo-location
      const latitude = -22.9035;
      const longitude = -43.2096;

      await api.post("/panic", {
        user_id: userId || 1,
        latitude,
        longitude,
        message: "🚨 Alerta de pânico acionado via app Kaviar.",
      });

      Alert.alert("Alerta Enviado", "🚨 Sua equipe de segurança foi notificada.");
    } catch (error) {
      console.error("Erro ao enviar alerta:", error);
      Alert.alert("Erro", "Não foi possível enviar o alerta de pânico.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={handlePanicPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#0A0A0A" />
      ) : (
        <Text style={styles.text}>🚨</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#DAA520",
    borderRadius: 30,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#DAA520",
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 5,
  },
  text: {
    color: "#0A0A0A",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default PanicButton;
