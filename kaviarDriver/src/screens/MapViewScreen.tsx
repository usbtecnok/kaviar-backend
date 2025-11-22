import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";

const GOOGLE_MAPS_API = "SUA_GOOGLE_API_KEY"; // Substituir

export default function MapViewScreen({ route }) {
    const { pickup, dropoff } = route.params || {};
    const mapRef = useRef(null);

    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                alert("Permissão de localização negada.");
                return;
            }

            let loc = await Location.getCurrentPositionAsync({});
            setLocation(loc.coords);
            setLoading(false);
        })();
    }, []);

    if (loading || !location) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#FFD700" />
                <Text style={styles.loaderText}>Carregando mapa...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <MapView
                ref={mapRef}
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                {/* Localização atual do motorista */}
                <Marker
                    coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                    }}
                    pinColor="gold"
                    title="Você está aqui"
                />

                {/* Ponto de embarque */}
                {pickup && (
                    <Marker
                        coordinate={{
                            latitude: pickup.lat,
                            longitude: pickup.lng,
                        }}
                        title="Origem"
                        pinColor="green"
                    />
                )}

                {/* Ponto de destino */}
                {dropoff && (
                    <Marker
                        coordinate={{
                            latitude: dropoff.lat,
                            longitude: dropoff.lng,
                        }}
                        title="Destino"
                        pinColor="red"
                    />
                )}

                {/* Rota */}
                {pickup && dropoff && (
                    <MapViewDirections
                        origin={{
                            latitude: pickup.lat,
                            longitude: pickup.lng,
                        }}
                        destination={{
                            latitude: dropoff.lat,
                            longitude: dropoff.lng,
                        }}
                        apikey={GOOGLE_MAPS_API}
                        strokeWidth={5}
                        strokeColor="gold"
                        onReady={(result) => {
                            mapRef.current.fitToCoordinates(result.coordinates, {
                                edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
                                animated: true,
                            });
                        }}
                    />
                )}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
    loaderText: { color: "#FFD700", marginTop: 20, fontSize: 16 },
});
