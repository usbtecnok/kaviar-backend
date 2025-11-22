import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Reflector, useTexture } from "@react-three/drei";
import * as THREE from "three";
import Car3D from "./Car3D";

// 💦 Piso molhado refletindo o carro
function WetGround() {
  const [roughness, normal] = useTexture([
    "https://threejs.org/examples/textures/water/Water_1_M_Normal.jpg",
    "https://threejs.org/examples/textures/water/Water_2_M_Normal.jpg",
  ]);

  return (
    <Reflector
      resolution={1024}
      args={[30, 30]}
      mirror={1}
      mixStrength={1.2}
      rotation={[-Math.PI / 2, 0, 0]}
      blur={[400, 100]}
      minDepthThreshold={0.4}
      maxDepthThreshold={1.25}
    >
      {(Material, props) => (
        <Material
          color="#0a0a0a"
          metalness={0.8}
          roughnessMap={roughness}
          normalMap={normal}
          {...props}
        />
      )}
    </Reflector>
  );
}

export default function MapScene({ carPosition }) {
  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
      {/* 🌙 Luz ambiente noturna */}
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.3}
        color={new THREE.Color("#87CEEB")}
      />

      {/* 💡 Faróis dianteiros */}
      <spotLight
        position={[0.8, 0.4, 1]}
        angle={0.4}
        penumbra={0.6}
        intensity={8}
        color="#ffffff"
        target-position={[0, 0, 5]}
      />
      <spotLight
        position={[-0.8, 0.4, 1]}
        angle={0.4}
        penumbra={0.6}
        intensity={8}
        color="#ffffff"
        target-position={[0, 0, 5]}
      />

      {/* 💦 Chão molhado */}
      <WetGround />

      {/* 🚘 Carro 3D */}
      <Car3D position={carPosition} />

      {/* 🌃 Ambiente noturno HDRI */}
      <Environment preset="night" background blur={0.3} />

      {/* 🎥 Controles de câmera */}
      <OrbitControls enableZoom={true} enablePan={false} maxPolarAngle={Math.PI / 2.1} />
    </Canvas>
  );
}
