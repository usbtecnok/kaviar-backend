import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, AuthContext } from "./src/context/AuthContext";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import RideRequestScreen from "./src/screens/RideRequestScreen";
import RideRouteScreen from "./src/screens/RideRouteScreen";
import RideStartScreen from "./src/screens/RideStartScreen";
import RideInProgressScreen from "./src/screens/RideInProgressScreen";

const Stack = createNativeStackNavigator();

function Routes() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="RideRequest" component={RideRequestScreen} />
          <Stack.Screen name="RideRoute" component={RideRouteScreen} />
          <Stack.Screen name="RideStart" component={RideStartScreen} />
          <Stack.Screen name="RideInProgress" component={RideInProgressScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
}
