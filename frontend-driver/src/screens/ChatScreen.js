// ---------------------------------------------
// ARQUIVO: frontend-driver/src/screens/ChatScreen.js
// FUNÇÃO: Chat da Comunicação Silenciosa para o Motorista
// ---------------------------------------------

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import api from '../utils/api'; // Assumindo util/api configurado
import { useAuth } from '../context/AuthContext';
import { subscribeToEvent, unsubscribeFromEvent, emitEvent } from '../services/socketService';
import PanicButton from '../components/PanicButton';

// Mensagens Rápidas (Para Motoristas Kaviar)
const QUICK_MESSAGES = [
    { type: 'ARRIVED', text: 'Cheguei. Aguardando discretamente.' },
    { type: 'ETA_2_MIN', text: 'Chegarei em 2 minutos.' },
    { type: 'WAIT_1_MIN', text: 'Houve um pequeno atraso, aguarde mais 1 minuto.' },
];

const ChatScreen = ({ route, navigation }) => {
    // Simulação: o rideId viria dos parâmetros da rota quando a viagem estivesse ativa
    const { rideId = '123_ACTIVE_RIDE' } = route.params || {}; 
    const { user } = useAuth();
    
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    const isDriver = user?.role === 'driver';

    // 1. Carregar Histórico de Mensagens
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                // Rota: GET /api/v1/chat/rides/:rideId
                const response = await api.get(`/chat/rides/${rideId}`);
                setMessages(response.data.messages);
            } catch (error) {
                console.error("Erro ao carregar chat:", error);
            }
        };
        fetchMessages();
    }, [rideId]);

    // 2. Ouvir Novas Mensagens via Socket.io
    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            setMessages(prev => [...prev, newMessage]);
        };

        subscribeToEvent('new_chat_message', handleNewMessage);

        return () => {
            unsubscribeFromEvent('new_chat_message');
        };
    }, []);

    // 3. Função de Envio de Mensagem
    const handleSendMessage = useCallback(async (type, content) => {
        if (!type || (!content && type === 'TEXT')) return;
        
        try {
            await api.post('/chat/send', {
                rideId,
                type,
                content: content || null, // Apenas se for TEXT, senão o backend usa o texto predefinido
            });
            setInputText(''); // Limpa o campo de texto
            // A mensagem será adicionada via Socket.io pelo evento que o Backend emite para o próprio remetente (opcionalmente)
            // ou via refetching. Para simplificar, vamos deixar o Socket.io gerenciar o display.

        } catch (error) {
            console.error("Erro ao enviar mensagem:", error);
        }
    }, [rideId]);
    
    // 4. Renderização do item de mensagem
    const renderMessage = (msg) => {
        const isMine = msg.sender_id === user?.id;
        const isPanic = msg.type === 'PANIC_ALERT';

        return (
            <View key={msg.id} style={[styles.messageContainer, isMine ? styles.myMessage : styles.otherMessage]}>
                <Text style={isPanic ? styles.panicText : styles.messageText}>
                    {msg.content}
                </Text>
                <Text style={styles.timestamp}>
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Botão de Pânico no Cabeçalho */}
            <View style={styles.header}>
                 <Text style={styles.headerTitle}>Comunicação Silenciosa</Text>
                 <PanicButton 
                    rideId={rideId} 
                    role={user?.role} 
                    style={styles.panicIcon} 
                />
            </View>
            
            <ScrollView 
                style={styles.chatArea}
                contentContainerStyle={styles.chatContent}
                // Auto-scroll para o final
                ref={ref => { this.scrollView = ref; }}
                onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}
            >
                {messages.map(renderMessage)}
            </ScrollView>

            {/* ENVIAR MENSAGEM */}
            <View style={styles.inputArea}>
                {/* 5. MENSAGENS RÁPIDAS (Apenas para Motorista) */}
                {isDriver && (
                    <View style={styles.quickMessagesContainer}>
                        {QUICK_MESSAGES.map(msg => (
                            <TouchableOpacity 
                                key={msg.type} 
                                style={styles.quickButton} 
                                onPress={() => handleSendMessage(msg.type, null)}
                            >
                                <Text style={styles.quickButtonText}>{msg.text.split('.')[0]}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {/* 6. MENSAGEM DE TEXTO LIVRE (Emergência - Opcional para Passageiro) */}
                <View style={styles.textInputRow}>
                    <TextInput
                        style={styles.textInput}
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder={isDriver ? "Apenas para Emergências/Ajustes de Rota..." : "Mensagem (Discreta)"}
                        placeholderTextColor="#999"
                        editable={!isDriver} // Apenas passageiro pode digitar livremente (por política Kaviar)
                    />
                    <TouchableOpacity 
                        style={[styles.sendButton, !inputText && styles.sendButtonDisabled]} 
                        onPress={() => handleSendMessage('TEXT', inputText)}
                        disabled={!inputText}
                    >
                        <Text style={styles.sendButtonText}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    // (Adicione estilos baseados em KaviarColors)
    container: { flex: 1, backgroundColor: '#0A0A0A' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#333' },
    headerTitle: { color: '#DAA520', fontSize: 18, fontWeight: 'bold' },
    panicIcon: { position: 'relative', right: 0 },
    chatArea: { flex: 1, padding: 10 },
    chatContent: { paddingBottom: 20 },
    messageContainer: { maxWidth: '75%', padding: 10, borderRadius: 10, marginBottom: 8 },
    myMessage: { alignSelf: 'flex-end', backgroundColor: '#DAA520', borderTopRightRadius: 0 },
    otherMessage: { alignSelf: 'flex-start', backgroundColor: '#333333', borderTopLeftRadius: 0 },
    messageText: { color: 'white', fontSize: 15 },
    panicText: { color: 'red', fontWeight: 'bold', fontSize: 16 },
    timestamp: { fontSize: 10, color: '#999', alignSelf: 'flex-end', marginTop: 3 },
    inputArea: { padding: 10, borderTopWidth: 1, borderTopColor: '#333' },
    quickMessagesContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10, justifyContent: 'space-around' },
    quickButton: { backgroundColor: '#222', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, margin: 4 },
    quickButtonText: { color: '#DAA520', fontSize: 13 },
    textInputRow: { flexDirection: 'row', alignItems: 'center' },
    textInput: { flex: 1, backgroundColor: '#333', color: 'white', borderRadius: 25, paddingHorizontal: 15, height: 45, marginRight: 10 },
    sendButton: { backgroundColor: '#DAA520', borderRadius: 25, paddingHorizontal: 15, height: 45, justifyContent: 'center' },
    sendButtonDisabled: { backgroundColor: '#888' },
    sendButtonText: { color: '#0A0A0A', fontWeight: 'bold' },
});

export default ChatScreen;
