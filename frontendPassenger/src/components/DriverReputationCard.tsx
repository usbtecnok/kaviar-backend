import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DriverReputationCard({ points }: { points: number }) {
  const level =
    points >= 200 ? "⭐ Motorista Premium"
    : points >= 100 ? "Motorista Ouro"
    : points >= 50 ? "Motorista Prata"
    : "Motorista Bronze";

  return (
    <View style={styles.container}>
      <Text style={styles.level}>{level}</Text>
      <Text style={styles.points}>{points} pts</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#444",
    marginTop: 8,
  },
  level: {
    color: "#E6B800",
    fontWeight: "bold",
    fontSize: 16,
  },
  points: {
    color: "#fff",
    fontSize: 14,
    marginTop: 5,
  },
});

