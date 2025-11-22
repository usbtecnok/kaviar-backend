import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, {user?.name || 'Passageiro'}!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RideRequest')}
      >
        <Icon name="directions-car" size={28} color="#fff" />
        <Text style={styles.buttonText}>Solicitar Corrida</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Icon name="logout" size={22} color="#ff5555" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0a0a0a' },
  title: { color: '#ffd700', fontSize: 26, fontWeight: 'bold', marginBottom: 40 },
  button: { backgroundColor: '#111', borderWidth: 1, borderColor: '#ffd700', flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 12 },
  buttonText: { color: '#ffd700', fontSize: 18, marginLeft: 10 },
  logoutButton: { marginTop: 40, flexDirection: 'row', alignItems: 'center' },
  logoutText: { color: '#ff5555', fontSize: 16, marginLeft: 5 },
});
