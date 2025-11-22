import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, PermissionsAndroid, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";

export default function DriverMapScreen() {
    const [coords, setCoords] = useState<any>(null);

    async function requestPermission() {
        if (Platform.OS === "android") {
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
        }
    }

    useEffect(() => {
        requestPermission();

        Geolocation.getCurrentPosition(
            (pos) => setCoords(pos.coords),
            (err) => console.error(err),
            { enableHighAccuracy: true, timeout: 20000 }
        );

        const watchId = Geolocation.watchPosition(
            (pos) => setCoords(pos.coords),
            (err) => console.error(err),
            { enableHighAccuracy: true, distanceFilter: 2 }
        );

        return () => Geolocation.clearWatch(watchId);
    }, []);

    if (!coords)
        return (
            <View style={styles.loading}>
                <Text style={{ color: "#fff" }}>Obtendo localização...</Text>
            </View>
        );

    return (
        <MapView
            style={styles.map}
            region={{
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
        >
            <Marker
                coordinate={{
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                }}
                title="Você"
                description="Motorista Kaviar"
            />
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: { flex: 1, width: "100%", height: "100%" },
    loading: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
});
