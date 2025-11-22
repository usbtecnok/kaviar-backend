import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterDriverScreen from "../screens/RegisterDriverScreen";
import VehicleRegisterScreen from "../screens/VehicleRegisterScreen";

const Stack = createNativeStackNavigator();

export default function DriverStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#FFD700",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >

      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: "KAVIAR DRIVER" }}
      />

      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ title: "Entrar" }}
      />

      <Stack.Screen 
        name="RegisterDriver" 
        component={RegisterDriverScreen} 
        options={{ title: "Registrar Motorista" }}
      />

      <Stack.Screen 
        name="VehicleRegister" 
        component={VehicleRegisterScreen} 
        options={{ title: "Cadastrar Veículo" }}
      />

    </Stack.Navigator>
  );
}
