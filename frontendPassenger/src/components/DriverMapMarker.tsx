import React from "react";
import { Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDriverScore } from "../hooks/useDriverScore";

export default function DriverMapMarker({ driver }) {
  const points = useDriverScore(driver.id);

  let icon = require("../assets/driver/default.png");

  if (points !== null) {
    if (points >= 200) {
      icon = require("../assets/driver/premium.png");
    } else if (points >= 100) {
      icon = require("../assets/driver/gold.png");
    } else if (points >= 50) {
      icon = require("../assets/driver/silver.png");
    }
  }

  return (
    <Marker coordinate={{ latitude: driver.lat, longitude: driver.lng }}>
      <Image source={icon} style={{ width: 42, height: 42 }} />
    </Marker>
  );
}
