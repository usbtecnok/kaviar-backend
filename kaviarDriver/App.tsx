import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// === Telas ===
import DriverHomeScreen from "./src/screens/DriverHomeScreen";
import RideRequestScreen from "./src/screens/RideRequestScreen";
import ActiveRideScreen from "./src/screens/ActiveRideScreen";
import MapScreen from "./src/screens/MapScreen";
import RatingScreen from "./src/screens/RatingScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="DriverHome"
        screenOptions={{
          headerStyle: { backgroundColor: "#000" },
          headerTintColor: "#FFD700",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen name="DriverHome" component={DriverHomeScreen} options={{ title: "Kaviar Driver" }} />
        <Stack.Screen name="RideRequest" component={RideRequestScreen} options={{ title: "Nova Corrida" }} />
        <Stack.Screen name="ActiveRide" component={ActiveRideScreen} options={{ title: "Corrida em Andamento" }} />
        <Stack.Screen name="MapScreen" component={MapScreen} options={{ title: "Mapa da Rota" }} />
        <Stack.Screen name="RatingScreen" component={RatingScreen} options={{ title: "Avaliação" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
