import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { getDriverProfile, updateDriverProfile } from "../services/driverProfileService";

export default function DriverProfileScreen() {
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = global.authToken;

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const result = await getDriverProfile(token);
    if (result.success) setDriver(result.data);
    setLoading(false);
  }

  async function handleSave() {
    const updated = await updateDriverProfile(token, {
      name: driver.name,
      carModel: driver.carModel,
      carPlate: driver.carPlate,
    });

    if (updated.success) {
      alert("Perfil atualizado com sucesso!");
    } else {
      alert("Erro ao atualizar.");
    }
  }

  if (loading || !driver) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loading}>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={driver.name}
        onChangeText={(v) => setDriver({ ...driver, name: v })}
      />

      <Text style={styles.label}>Modelo do Carro</Text>
      <TextInput
        style={styles.input}
        value={driver.carModel}
        onChangeText={(v) => setDriver({ ...driver, carModel: v })}
      />

      <Text style={styles.label}>Placa</Text>
      <TextInput
        style={styles.input}
        value={driver.carPlate}
        onChangeText={(v) => setDriver({ ...driver, carPlate: v })}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    padding: 20,
    flex: 1,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#E1C16E",
    marginBottom: 25,
  },

  label: {
    color: "#E1C16E",
    marginTop: 15,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },

  input: {
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10,
    padding: 12,
    color: "#fff",
    fontSize: 16,
  },

  saveButton: {
    marginTop: 30,
    backgroundColor: "#E1C16E",
    paddingVertical: 14,
    borderRadius: 12,
  },

  saveText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  loading: {
    color: "#fff",
    fontSize: 22,
  },
});
