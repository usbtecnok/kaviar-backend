import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>KAVIAR DRIVER</Text>
        <Text style={styles.slogan}>Excelência ao Volante</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity 
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonTextDark}>Iniciar Sessão</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate("RegisterDriver")}
        >
          <Text style={styles.buttonText}>Registrar Motorista</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate("VehicleRegister")}
        >
          <Text style={styles.buttonText}>Cadastrar Veículo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
    justifyContent: "center",
  },
  logoContainer: { alignItems: "center", marginBottom: 40 },
  logo: { color: "#FFD700", fontSize: 36, fontWeight: "bold", letterSpacing: 3 },
  slogan: { color: "#fff", fontSize: 14, marginTop: 8 },
  buttons: { marginTop: 20 },
  buttonPrimary: {
    backgroundColor: "#FFD700",
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonSecondary: {
    borderWidth: 2,
    borderColor: "#FFD700",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonTextDark: { color: "#000", textAlign: "center", fontSize: 16, fontWeight: "bold" },
  buttonText: { color: "#FFD700", textAlign: "center", fontSize: 16, fontWeight: "bold" },
};
