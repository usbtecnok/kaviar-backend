import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function LegalMenu({ navigation }) {
  const Item = ({ title, endpoint }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("LegalScreen", { title, endpoint })}
      style={{ padding: 16, backgroundColor: "#222", marginBottom: 10, borderRadius: 8 }}
    >
      <Text style={{ color: "#f0c060", fontSize: 18 }}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#000", padding: 20 }}>
      <Item title="Contrato do Motorista" endpoint="https://SEUSERVIDOR/api/legal/contract-driver" />
      <Item title="Termos do Motorista" endpoint="https://SEUSERVIDOR/api/legal/terms-driver" />
      <Item title="Política de Privacidade" endpoint="https://SEUSERVIDOR/api/legal/privacy" />
      <Item title="Bônus Kaviar Premium" endpoint="https://SEUSERVIDOR/api/legal/bonus-kaviar" />
    </View>
  );
}
