import React from "react";
import { Image, View } from "react-native";

export default function Logo() {
  return (
    <View style={{ alignItems: "center", marginVertical: 20 }}>
      <Image
        source={require("../assets/logo.png")}
        style={{ width: 200, height: 200, resizeMode: "contain" }}
      />
    </View>
  );
}
