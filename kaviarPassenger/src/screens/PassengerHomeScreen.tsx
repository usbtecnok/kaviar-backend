import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function PassengerHomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Text style={styles.logo}>KAVIAR</Text>
      <Text style={styles.subtitle}>Premium Passenger</Text>

      {/* Caixa de ações */}
      <View style={styles.box}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MapScreen")}
        >
          <Text style={styles.buttonText}>Solicitar Corrida</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate("PassengerHistory")}
        >
          <Text style={styles.buttonTextSecondary}>Histórico de Viagens</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  logo: {
    fontSize: 50,
    color: "#FFD700",
    fontWeight: "bold",
    letterSpacing: 4,
  },

  subtitle: {
    fontSize: 18,
    color: "#aaa",
    marginTop: 8,
  },

  box: {
    marginTop: 50,
    width: "80%",
  },

  button: {
    backgroundColor: "#FFD700",
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,
  },

  buttonText: {
    textAlign: "center",
    color: "#000",
    fontSize: 18,
    fontWeight: "700",
  },

  buttonSecondary: {
    borderColor: "#FFD700",
    borderWidth: 2,
    padding: 18,
    borderRadius: 14,
  },

  buttonTextSecondary: {
    textAlign: "center",
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "700",
  },
});
