import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";

const API_BASE = "http://SEU_BACKEND:4000"; // ajuste para o seu backend

export default function PassengerHistoryScreen({ navigation }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 Ajustar com login real depois
  const passengerId = 1;

  async function loadHistory() {
    try {
      const response = await axios.get(`${API_BASE}/history/passenger/${passengerId}`);
      setHistory(response.data.history || []);
    } catch (err) {
      console.error("Erro ao carregar histórico", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHistory();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("RideDetails", { ride: item })}
    >
      <Text style={styles.cardTitle}>Corrida #{item.id}</Text>
      <Text style={styles.cardText}>Origem: {item.pickup_latitude}, {item.pickup_longitude}</Text>
      <Text style={styles.cardText}>Destino: {item.dropoff_latitude}, {item.dropoff_longitude}</Text>
      <Text style={styles.cardStatus}>Status: {item.status}</Text>
      {item.amount && (
        <Text style={styles.cardValue}>Valor: R$ {item.amount.toFixed(2)}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Histórico de Viagens</Text>

      {loading ? (
        <Text style={styles.loading}>Carregando...</Text>
      ) : history.length === 0 ? (
        <Text style={styles.empty}>Nenhuma viagem encontrada.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },

  header: {
    color: "#FFD700",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  loading: {
    color: "#FFD700",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },

  empty: {
    color: "#777",
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
  },

  card: {
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333",
  },

  cardTitle: {
    color: "#FFD700",
    fontSize: 20,
    fontWeight: "bold",
  },

  cardText: {
    color: "#ccc",
    marginTop: 5,
    fontSize: 14,
  },

  cardStatus: {
    color: "#5fa5ff",
    marginTop: 8,
    fontWeight: "bold",
  },

  cardValue: {
    color: "#0f0",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "700",
  },
});
