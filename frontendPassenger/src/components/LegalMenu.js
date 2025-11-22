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
      <Item title="Termos do Passageiro" endpoint="https://SEUSERVIDOR/api/legal/terms-passenger" />
      <Item title="Política de Privacidade" endpoint="https://SEUSERVIDOR/api/legal/privacy" />
    </View>
  );
}
