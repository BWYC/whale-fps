import React from "react";
import { Canvas } from "react-three-fiber";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import "./styles.css";
import Controls from "./Controls";
import Tree from "./Tree";

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1009, 1000]} />
      <shadowMaterial attach="material" color="#171717" />
    </mesh>
  );
}

function Cube(props) {
  const [ref] = useBox(() => ({
    mass: 5,
    position: [0, 5, 0],
    rotation: [0.1, 0.2, 0.8],
    ...props,
  }));
  const color = props.color ? props.color : "gray";
  return (
    <mesh receiveShadow castShadow ref={ref}>
      <boxBufferGeometry />
      <meshLambertMaterial attach="material" color={color} />
    </mesh>
  );
}

function App() {
  return (
    <Canvas
      shadowMap
      sRGB
      gl={{ alpha: true }}
      camera={{ position: [3, 1, 10], fov: 50 }}
    >
      <color attach="background" args={["skyblue"]} />
      <Physics>
        <Controls />
        <hemisphereLight intensity={0.1} />
        <spotLight
          position={[30, 10, 10]}
          angle={0.3}
          penumbra={0.5}
          intensity={2}
          castShadow
        />
        <Plane />
        <Cube />
        <Cube position={[0, 10, -2]} color="gray" />

        <Cube position={[0, 20, -2]} color="darkseagreen" />
      </Physics>
    </Canvas>
  );
}

export default App;
