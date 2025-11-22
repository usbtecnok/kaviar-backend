import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import api from '../api/api';

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'passenger',
    phone: '',
    docNumber: '',
    vehicleModel: ''
  });

  const handleChange = (field, value) => setForm({ ...form, [field]: value });

  const handleRegister = async () => {
    try {
      const response = await api.post('/auth/register', form);
      Alert.alert('Sucesso!', 'Conta criada com sucesso!');
      console.log('Usuário cadastrado:', response.data.user);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro no cadastro:', error.response?.data || error.message);
      Alert.alert('Erro', 'Falha ao registrar usuário. Verifique os dados e tente novamente.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      <TextInput style={styles.input} placeholder="Nome completo" onChangeText={v => handleChange('name', v)} />
      <TextInput style={styles.input} placeholder="E-mail" autoCapitalize="none" onChangeText={v => handleChange('email', v)} />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry onChangeText={v => handleChange('password', v)} />
      <TextInput style={styles.input} placeholder="Telefone" keyboardType="phone-pad" onChangeText={v => handleChange('phone', v)} />
      <TextInput style={styles.input} placeholder="Documento (RG/CPF)" onChangeText={v => handleChange('docNumber', v)} />
      <Button title="Cadastrar" onPress={handleRegister} />
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        Já tenho conta
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 8 },
  link: { textAlign: 'center', color: '#007bff', marginTop: 20 },
});
