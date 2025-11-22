import React from "react";
import { Image, View } from "react-native";

export default function AppLogo() {
  return (
    <View style={{ alignItems: "center", marginTop: 40 }}>
      <Image
        source={require("../assets/logo.png")}
        style={{ width: 180, height: 180, resizeMode: "contain" }}
      />
    </View>
  );
}
