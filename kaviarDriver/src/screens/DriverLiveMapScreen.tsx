import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import { startLocationStream } from "../services/locationStream";

export default function DriverLiveMapScreen() {
    const mapRef = useRef(null);

    const [carPosition] = useState(
        new AnimatedRegion({
            latitude: -22.90,
            longitude: -43.20,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        })
    );

    useEffect(() => {
        startLocationStream((coords) => {
            const { latitude, longitude } = coords;

            carPosition.timing({
                latitude,
                longitude,
                duration: 800,
                useNativeDriver: false,
            }).start();

            // acompanha o carro no mapa
            mapRef.current.animateCamera({
                center: { latitude, longitude },
                pitch: 45,
                zoom: 17,
            });
        });
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <MapView
                ref={mapRef}
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: -22.90,
                    longitude: -43.20,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <Marker.Animated
                    coordinate={carPosition}
                    anchor={{ x: 0.5, y: 0.5 }}
                >
                    <View style={styles.carMarker} />
                </Marker.Animated>
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    carMarker: {
        width: 20,
        height: 20,
        backgroundColor: "gold",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#000",
    },
});
