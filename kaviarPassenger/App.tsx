// ===========================================
// KAVIAR PASSENGER - APP PRINCIPAL
// Tema: Preto + Dourado
// ===========================================
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// === Telas ===
import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/LoginScreen";
import PassengerHomeScreen from "./src/screens/PassengerHomeScreen";
import PassengerRideRequestScreen from "./src/screens/PassengerRideRequestScreen";
import PassengerActiveRideScreen from "./src/screens/PassengerActiveRideScreen";
import PassengerRatingScreen from "./src/screens/PassengerRatingScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerStyle: { backgroundColor: "#000" },
          headerTintColor: "#FFD700",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Entrar no Kaviar" }}
        />

        <Stack.Screen
          name="PassengerHome"
          component={PassengerHomeScreen}
          options={{ title: "Kaviar Passageiro" }}
        />

        <Stack.Screen
          name="RideRequest"
          component={PassengerRideRequestScreen}
          options={{ title: "Solicitar Corrida" }}
        />

        <Stack.Screen
          name="ActiveRide"
          component={PassengerActiveRideScreen}
          options={{ title: "Corrida em Andamento" }}
        />

        <Stack.Screen
          name="RateDriver"
          component={PassengerRatingScreen}
          options={{ title: "Avaliar Motorista" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
