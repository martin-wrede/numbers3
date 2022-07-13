import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import React, { Suspense, useRef, useState, useEffect  } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import { EffectComposer , DepthOfField } from '@react-three/postprocessing'
import pingSound from "./audio/ping_pong.mp3"
import birthdaySong from "./audio/happy-birthday-music-box.mp3"
import backgroundSound from  "./audio/free-ambient-videos.mp3"

// Orbit-Controls
const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(
     () => {
        const controls = new OrbitControls(camera, gl.domElement);
        controls.minDistance = 3;
        controls.maxDistance = 20;
        return () => {
          controls.dispose();
        };
     },
     [camera, gl]
  );
  return null;
};


function Model({...props}) { 
  // This reference will give us direct access to the mesh 
  const group = useRef() 
  // Rotate mesh every frame, this is outside of React without overhead 
  // useFrame(() => { 
 //   ref.current.rotation.y += 0.01 
 //   ref.current.position.z = 0
  // })

  //const { nodes, materials } = useGLTF("/cake-export5.glb");
 // const { nodes, materials } = useGLTF("/Suzanne2.glb");
  const { nodes, materials } = useGLTF("/gltf/shoe.gltf");
    return (
      <group ref={group} {...props} dispose={null}>
        <mesh geometry={nodes.shoe.geometry} material={materials.laces}  
           material-color="orange"
        material-emissive="orange"
        // material-color={props.customColors.setStripes}/>
      //  material-color={props.customColors.setStripes}
        />
       < mesh geometry={nodes.shoe_1.geometry} material={materials.mesh} 
        material-color="blue"
        material-emissive="blue"/>
    </group> 
  ) 
} 
//<mesh geometry={nodes.shoe_1.geometry} material={materials.mesh} material-color={props.customColors.mesh}/>
//<mesh geometry={nodes.shoe_2.geometry} material={materials.caps} material-color={props.customColors.soul}/>
//<mesh geometry={nodes.shoe_3.geometry} material={materials.inner}material-color={props.customColors.soul} />
//<mesh geometry={nodes.shoe_4.geometry} material={materials.sole} material-color={props.customColors.soul}/>
//<mesh geometry={nodes.shoe_5.geometry} material={materials.stripes}material-color={props.customColors.stripes} />
//<mesh geometry={nodes.shoe_6.geometry} material={materials.band} material-color={props.customColors.stripes}/>
//<mesh geometry={nodes.shoe_7.geometry} material={materials.patch} material-color={props.customColors.soul}
 //  geometry ={nodes.Suzanne.geometry}
// material ={nodes.Suzanne.material}
// geometry ={nodes.cake.geometry}
// material ={nodes.cake.material}

//   scale={0.5}
//  position={[0, 0, 0]}
//  
// useGLTF.preload("/cake-export5.glb");
 //useGLTF.preload("/shoe.glb");


function Banana({ z }) {
  const ref = useRef()
  const  { nodes, materials } = useGLTF('/zahlen-gold-1-v1-exp2.glb')
 
  // const  { nodes,materials } = useGLTF('/banana-skin-v1.glb')
  const { viewport, camera } = useThree()
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z])
  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height),
    rX: Math.random()* Math.PI ,
    rY: Math.random()* Math.PI ,
    rZ: Math.random()* Math.PI 
  })

  useFrame((state) => {
    // speed of rotation and position
      ref.current.rotation.set((data.rX += 0.01) ,(data.rY += 0.01), (data.rZ += 0.01))
      ref.current.position.set(data.x * width , (data.y+=0.045), z)
       if (data.y > height)  data.y = -height 
   // ref.current.position.x = Math.sin(state.clock.elapsedTime*2) // -1 to 1
    // ref.current.rotation.y = Math.sin(state.clock.elapsedTime*2) // -1 to 1   
  })

  return (
    <mesh  ref={ref}   geometry={nodes.banana.geometry}   material={materials.skin}  rotation={[-Math.PI/2,0,0]} 
    scale={ 0.10}
   material-color="orange"
  material-emissive="orange" />
  )
}

function Sound(){
  
  const ping = new Audio(birthdaySong)

 // const ping = new Audio(pingSound)
ping.load();
ping.muted = true;
document.addEventListener('keyup', () => {
  ping.muted = false;
  ping.play();
});
 
  return(
    console.log(ping)
    
  )
}

export default function App({ count = 15,  depth=60}) {

   
  
  return (
  <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: 110, fov: 30  }}>
    <color  attach="background" args={["#ddffff"]} />
    <Suspense fallback={null}>
    <ambientLight intensity={0.2} />
    <Sound />
    <CameraController />
    <Model />
    <spotLight position={[10,10,10]}  intensity={2} />
   
    <Environment preset="sunset" />
    {Array.from({ length: count}, (_,i) => (
    <Banana key={i} z={-(i / count) * depth - 20}
     scale={[1.4,1.4,1.4]}
    />
    ))}
     <EffectComposer>
    
      <DepthOfField // target of focallength camera 60 ,depth = 60 /> hälfte
      // zwischjen kamera und 0 depth / 2
      target={[0,0,0]} focalLength={2.9} bokehScale={25} height={700} />
    </EffectComposer>
    </Suspense>
   
  </Canvas>
    )
}