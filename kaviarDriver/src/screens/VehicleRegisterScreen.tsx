import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";

export default function VehicleRegisterScreen() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [plate, setPlate] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");

  return (
    <ScrollView style={{ padding: 20, backgroundColor: "#000", flex: 1 }}>
      <Text style={{ color: "#FFD700", fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
        Cadastro de Veículo
      </Text>

      <Text style={{ color: "#fff" }}>Marca</Text>
      <TextInput style={styles.input} value={brand} onChangeText={setBrand} />

      <Text style={{ color: "#fff" }}>Modelo</Text>
      <TextInput style={styles.input} value={model} onChangeText={setModel} />

      <Text style={{ color: "#fff" }}>Placa</Text>
      <TextInput style={styles.input} value={plate} onChangeText={setPlate} />

      <Text style={{ color: "#fff" }}>Ano</Text>
      <TextInput style={styles.input} value={year} onChangeText={setYear} keyboardType="numeric" />

      <Text style={{ color: "#fff" }}>Cor</Text>
      <TextInput style={styles.input} value={color} onChangeText={setColor} />

      <TouchableOpacity style={styles.buttonPrimary}>
        <Text style={styles.buttonTextDark}>Enviar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = {
  input: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  buttonPrimary: {
    backgroundColor: "#FFD700",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonTextDark: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
};
