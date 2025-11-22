// ---------------------------------------------
// Kaviar - App Motorista
// Tema: Preto + Dourado
// ---------------------------------------------
import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>KAVIAR DRIVER</Text>
        <Text style={styles.slogan}>Excelência ao Volante</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.buttonPrimary}>
          <Text style={styles.buttonText}>Iniciar Sessão</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary}>
          <Text style={styles.buttonText}>Registrar Motorista</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  logoText: {
    color: '#FFD700',
    fontSize: 42,
    fontWeight: '700',
    letterSpacing: 3,
  },
  slogan: {
    color: '#fff',
    fontSize: 16,
    marginTop: 8,
  },
  buttons: {
    width: '80%',
  },
  buttonPrimary: {
    backgroundColor: '#FFD700',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  buttonSecondary: {
    borderColor: '#FFD700',
    borderWidth: 2,
    padding: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});
