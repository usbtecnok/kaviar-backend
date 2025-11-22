import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import StartTourScreen from "./screens/StartTourScreen";
import TourCompleteScreen from "./screens/TourCompleteScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: "#000" }, headerTintColor: "#FFD700" }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="StartTour" component={StartTourScreen} options={{ title: "Iniciar Tour" }} />
        <Stack.Screen name="TourComplete" component={TourCompleteScreen} options={{ title: "Finalizar Tour" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
