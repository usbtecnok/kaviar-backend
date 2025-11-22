import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    try {
      await login(email, password);
    } catch {
      setError("Email ou senha inválidos");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KAVIAR DRIVER</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", alignItems: "center", justifyContent: "center" },
  title: { color: "#e6b800", fontSize: 28, marginBottom: 40, fontWeight: "bold" },
  input: { width: "80%", backgroundColor: "#222", padding: 14, borderRadius: 8, marginTop: 15, color: "#fff" },
  button: { marginTop: 30, backgroundColor: "#e6b800", padding: 14, width: "80%", borderRadius: 8, alignItems: "center" },
  buttonText: { fontSize: 18, fontWeight: "bold" },
  error: { color: "red", marginTop: 10 }
});
