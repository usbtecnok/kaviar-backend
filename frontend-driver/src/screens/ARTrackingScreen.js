import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { GLView } from "expo-gl";
import * as THREE from "three";
import api from "../utils/api";

export default function ARTrackingScreen({ route, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const glViewRef = useRef();

  // 1️⃣ Permissão da câmera
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // 2️⃣ Busca de localização do motorista (simulação)
  useEffect(() => {
    const fetchDriverLocation = async () => {
      try {
        const res = await api.get("/driver/location/active");
        setDriverLocation(res.data);
      } catch (error) {
        console.error("Erro ao buscar localização do motorista:", error);
      }
    };
    fetchDriverLocation();
    const interval = setInterval(fetchDriverLocation, 5000); // Atualiza a cada 5s
    return () => clearInterval(interval);
  }, []);

  // 3️⃣ Calcula distância (simplificada)
  useEffect(() => {
    if (driverLocation) {
      const d = Math.sqrt(
        Math.pow(driverLocation.latitude - (-22.9035), 2) +
        Math.pow(driverLocation.longitude - (-43.2096), 2)
      );
      setDistance((d * 111).toFixed(2)); // Conversão aproximada para km
    }
  }, [driverLocation]);

  // 4️⃣ Renderização 3D do veículo
  const onContextCreate = async (gl) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 1000);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ gl });
    renderer.setSize(width, height);

    // Luz ambiente
    const light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    // Objeto 3D (veículo dourado estilizado)
    const geometry = new THREE.BoxGeometry(0.4, 0.2, 0.8);
    const material = new THREE.MeshStandardMaterial({ color: 0xdaa520 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Animação (flutuação leve)
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.y += 0.01;
      cube.position.y = Math.sin(Date.now() * 0.002) * 0.05;
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    animate();
  };

  if (hasPermission === null) return <View />;
  if (hasPermission === false)
    return <Text style={{ color: "white" }}>Permissão de câmera negada.</Text>;

  return (
    <View style={styles.container}>
      <Camera style={StyleSheet.absoluteFillObject} type={Camera.Constants.Type.back} />
      <GLView
        style={StyleSheet.absoluteFillObject}
        onContextCreate={onContextCreate}
        ref={glViewRef}
      />
      <View style={styles.overlay}>
        <Text style={styles.text}>🚘 Veículo a {distance || "?"} km</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  overlay: {
    position: "absolute",
    bottom: 60,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 12,
    borderRadius: 20,
  },
  text: { color: "#DAA520", fontSize: 18, fontWeight: "bold" },
  backButton: {
    marginTop: 10,
    backgroundColor: "#DAA520",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  backText: { color: "#000", fontWeight: "bold" },
});
