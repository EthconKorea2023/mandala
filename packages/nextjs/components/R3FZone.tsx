import { useEffect, useRef } from "react";
import { Environment, Grid, OrbitControls, Stage, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
// import { easing } from "maath";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import useEnvStore from "~~/utils/store/envStore";

export default function R3FZone() {
  const selectedGame = useEnvStore(state => state.selectedGame);

  return (
    <Canvas gl={{ logarithmicDepthBuffer: true }} shadows camera={{ position: [-7, 0, 5], fov: 25 }}>
      {/* <fog attach="fog" args={["black", 15, 21.5]} /> */}
      <Stage intensity={0.5} environment="city" adjustCamera={false}>
        <Model glbURL={selectedGame ? "/sample_character.glb" : "/gollum.glb"} />
      </Stage>
      <Grid
        renderOrder={-1}
        position={[0, -1.85, 0]}
        infiniteGrid
        cellSize={0.6}
        cellThickness={0.6}
        sectionSize={3.3}
        sectionThickness={1.5}
        sectionColor={[0.5, 0.5, 10]}
        fadeDistance={30}
      />
      <OrbitControls
        target={[0, 1, 0]}
        autoRotate
        autoRotateSpeed={0.05}
        enableZoom={true}
        makeDefault
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
      {/* <OrbitControls /> */}
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={1.5} mipmapBlur />
      </EffectComposer>
      <Environment background preset="sunset" blur={0.8} />
    </Canvas>
  );
}

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Emm (Scenario) (https://sketchfab.com/edemaistre)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/gollum-weta-workshop-5de697f1593f4fc584563903ce09f717
Title: Gollum (Weta Workshop)
*/

// export function Model(props) {
//   const { nodes, materials } = useGLTF("/gollum2.glb");

//   const boxRef = useRef();

//   useFrame(() => {
//     boxRef.current.rotation.y += 0.0025;
//   });
//   return (
//     <group {...props} dispose={null} ref={boxRef}>
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_2.geometry}
//         material={materials.material_1}
//         rotation={[-Math.PI / 2, 0, 0]}
//       />
//       {/* <pointLight  intensity={1} color={[10, 2, 5]} distance={2.5} /> */}
//     </group>
//   );
// }

// useGLTF.preload("/gollum2.glb");

function Model({ glbURL }) {
  const gltf = useLoader(GLTFLoader, glbURL);

  const modelRef = useRef();

  useFrame(() => {
    modelRef.current.rotation.y += 0.0025;
  });
  return <primitive ref={modelRef} object={gltf.scene} />;
}

// useGLTF.preload("/sample_character.glb");

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.0 s2wt_kamdo_industrial_divinities.glb --transform --simplify
Author: Hansalex (https://sketchfab.com/Hansalex)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/s2wt-kamdo-industrial-divinities-f503b70ac05e49a38c81100d71599a1b
Title: S2WT "Kamdo" (Industrial Divinities)
*/

// function Kamdo(props) {
//   const head = useRef()
//   const stripe = useRef()
//   const light = useRef()
//   const { nodes, materials } = useGLTF('/s2wt_kamdo_industrial_divinities-transformed.glb')
//   useFrame((state, delta) => {
//     const t = (1 + Math.sin(state.clock.elapsedTime * 2)) / 2
//     stripe.current.color.setRGB(1 + t * 10, 2, 20 + t * 50)
//     easing.dampE(head.current.rotation, [0, state.pointer.x * (state.camera.position.z > 1 ? 1 : -1), 0], 0.4, delta)
//     light.current.intensity = 1 + t * 2
//   })
//   return (
//     <group {...props}>
//       <mesh castShadow receiveShadow geometry={nodes.body001.geometry} material={materials.Body} />
//       <group ref={head}>
//         <mesh castShadow receiveShadow geometry={nodes.head001.geometry} material={materials.Head} />
//         <mesh castShadow receiveShadow geometry={nodes.stripe001.geometry}>
//           <meshBasicMaterial ref={stripe} toneMapped={false} />
//           <pointLight ref={light} intensity={1} color={[10, 2, 5]} distance={2.5} />
//         </mesh>
//       </group>
//     </group>
//   )
// }

// useGLTF.preload('/s2wt_kamdo_industrial_divinities-transformed.glb')
