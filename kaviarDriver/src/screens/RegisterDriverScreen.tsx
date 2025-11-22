import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { registerDriver } from "../services/authService";

export default function RegisterDriverScreen({ navigation }: any) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister() {
        try {
            await registerDriver(name, email, password);
            Alert.alert("Sucesso", "Conta criada!");
            navigation.goBack();
        } catch (e) {
            Alert.alert("Erro", "Falha ao registrar.");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Criar Conta</Text>

            <TextInput style={styles.input} placeholder="Nome" placeholderTextColor="#999" value={name} onChangeText={setName}/>
            <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="#999" value={email} onChangeText={setEmail}/>
            <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#999" secureTextEntry value={password} onChangeText={setPassword}/>

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000", justifyContent: "center", padding: 24 },
    title: { color: "#FFD700", fontSize: 28, textAlign: "center", marginBottom: 30 },
    input: { backgroundColor: "#111", color: "#fff", marginBottom: 16, padding: 14, borderRadius: 10 },
    button: { backgroundColor: "#FFD700", padding: 14, borderRadius: 10 },
    buttonText: { color: "#000", textAlign: "center", fontWeight: "bold" },
});
