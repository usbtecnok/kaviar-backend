import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import io from 'socket.io-client';
import api from '../services/api';

export default function RideRequest() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [rideStatus, setRideStatus] = useState(null);

  useEffect(() => {
    const socket = io('http://192.168.0.100:4000'); // substitua pelo IP local do backend
    socket.on('rideStatusUpdate', (status) => {
      setRideStatus(status);
    });
    return () => socket.disconnect();
  }, []);

  const handleRequest = async () => {
    try {
      const response = await api.post('/ride/request', { origin, destination });
      setRideStatus('Procurando motorista...');
    } catch (error) {
      alert('Erro ao solicitar corrida.');
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -22.90278,
          longitude: -43.2075,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={{ latitude: -22.90278, longitude: -43.2075 }} title="Você" />
      </MapView>

      <View style={styles.panel}>
        <Text style={styles.title}>Solicitar Corrida</Text>
        <TextInput placeholder="Origem" style={styles.input} value={origin} onChangeText={setOrigin} />
        <TextInput placeholder="Destino" style={styles.input} value={destination} onChangeText={setDestination} />

        <TouchableOpacity style={styles.button} onPress={handleRequest}>
          <Icon name="send" size={20} color="#fff" />
          <Text style={styles.buttonText}>Solicitar</Text>
        </TouchableOpacity>

        {rideStatus && <Text style={styles.statusText}>🚗 {rideStatus}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  map: { flex: 1 },
  panel: { position: 'absolute', bottom: 0, backgroundColor: '#111', padding: 20, width: '100%', borderTopWidth: 1, borderColor: '#333' },
  title: { color: '#ffd700', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  input: { backgroundColor: '#222', color: '#fff', borderRadius: 8, padding: 10, marginBottom: 10 },
  button: { backgroundColor: '#ffd700', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 12, borderRadius: 8 },
  buttonText: { color: '#000', fontSize: 16, fontWeight: 'bold', marginLeft: 6 },
  statusText: { color: '#fff', textAlign: 'center', marginTop: 10 },
});
