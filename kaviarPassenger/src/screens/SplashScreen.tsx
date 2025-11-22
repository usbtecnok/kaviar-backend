import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>KAVIAR</Text>
      <Text style={styles.sub}>Passageiro</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center" },
  text: { color: "#FFD700", fontSize: 40, fontWeight: "bold", letterSpacing: 4 },
  sub: { color: "#fff", marginTop: 10 }
});
