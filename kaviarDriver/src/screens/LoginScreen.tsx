import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { driverLogin } from "../services/authService";

export default function LoginScreen({ navigation }: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        try {
            const data = await driverLogin(email, password);
            Alert.alert("Sucesso", "Login realizado!");
            navigation.replace("DriverHome");
        } catch (err) {
            Alert.alert("Erro", "Login inválido.");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login Motorista</Text>

            <TextInput
                placeholder="E-mail"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />

            <TextInput
                placeholder="Senha"
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("RegisterDriver")}>
                <Text style={styles.link}>Criar conta</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000", justifyContent: "center", padding: 24 },
    title: { color: "#FFD700", fontSize: 28, textAlign: "center", marginBottom: 30 },
    input: {
        backgroundColor: "#111",
        borderWidth: 1,
        borderColor: "#333",
        padding: 14,
        marginBottom: 16,
        color: "#fff",
        borderRadius: 10,
    },
    button: {
        backgroundColor: "#FFD700",
        padding: 14,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: { color: "#000", textAlign: "center", fontWeight: "bold" },
    link: { marginTop: 20, textAlign: "center", color: "#FFD700" },
});
