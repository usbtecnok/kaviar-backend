// ---------------------------------------------
// ARQUIVO: frontend-passenger/App.tsx
// FUNÇÃO: Arquivo de entrada principal
// ---------------------------------------------

import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/LoginScreen';

const App = () => {
  // Neste ponto inicial, mostramos apenas a tela de Login/Registro.
  // Em uma versão futura, esta tela faria a verificação do 'kaviar_token' no AsyncStorage
  // e redirecionaria para 'HomeScreen' ou 'LoginScreen' (o chamado Auth Flow).

  return (
    <SafeAreaProvider>
      {/* Define o estilo da barra de status para combinar com o fundo escuro */}
      <StatusBar barStyle="light-content" backgroundColor="#000000" /> 
      
      <LoginScreen />
    </SafeAreaProvider>
  );
};

export default App;

<Stack.Screen
  name="PassengerActiveRide"
  component={PassengerActiveRideScreen}
  options={{ title: "Sua corrida" }}
/>

