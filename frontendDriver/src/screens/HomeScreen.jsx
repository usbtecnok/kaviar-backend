import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>KAVIAR DRIVER</Text>

      <Button title="INICIAR TOUR" onPress={() => navigation.navigate("StartTour")} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#111" },
  title: { fontSize: 28, color: "#FFD700", fontWeight: "bold", marginBottom: 40 }
});
