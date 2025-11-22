import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import vehicleService from "../services/vehicleService";
import { useAuth } from "../context/AuthContext";

export default function VehicleRegisterScreen() {
    const { user } = useAuth();

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [plate, setPlate] = useState("");
    const [year, setYear] = useState("");
    const [color, setColor] = useState("");
    const [documentPhoto, setDocumentPhoto] = useState<string | null>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.7,
        });

        if (!result.canceled) {
            setDocumentPhoto(result.assets[0].uri);
        }
    };

    const submit = async () => {
        if (!brand || !model || !plate || !year || !color) {
            alert("Preencha todos os campos!");
            return;
        }

        const payload = {
            driver_id: user.id,
            brand,
            model,
            plate,
            year: Number(year),
            color,
            document_photo: documentPhoto,
        };

        try {
            await vehicleService.create(payload);
            alert("Veículo enviado para validação!");
        } catch (error) {
            console.error(error);
            alert("Erro ao enviar veículo.");
        }
    };

    return (
        <ScrollView className="p-6">
            <Text className="text-2xl font-bold mb-4">Cadastrar Veículo</Text>

            <Text className="text-white">Marca</Text>
            <TextInput className="bg-gray-800 text-white p-3 rounded mb-3" value={brand} onChangeText={setBrand} />

            <Text className="text-white">Modelo</Text>
            <TextInput className="bg-gray-800 text-white p-3 rounded mb-3" value={model} onChangeText={setModel} />

            <Text className="text-white">Placa</Text>
            <TextInput className="bg-gray-800 text-white p-3 rounded mb-3" value={plate} onChangeText={setPlate} />

            <Text className="text-white">Ano</Text>
            <TextInput className="bg-gray-800 text-white p-3 rounded mb-3" value={year} onChangeText={setYear} keyboardType="numeric" />

            <Text className="text-white">Cor</Text>
            <TextInput className="bg-gray-800 text-white p-3 rounded mb-3" value={color} onChangeText={setColor} />

            <Text className="text-white mb-2">Foto do Documento</Text>

            {documentPhoto && (
                <Image source={{ uri: documentPhoto }} className="w-full h-48 rounded-lg mb-3" resizeMode="contain" />
            )}

            <TouchableOpacity onPress={pickImage} className="bg-blue-600 p-4 rounded-lg mb-4">
                <Text className="text-center text-white font-semibold">Selecionar Foto</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={submit} className="bg-green-600 p-4 rounded-lg">
                <Text className="text-center text-white font-semibold">Enviar Veículo</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
