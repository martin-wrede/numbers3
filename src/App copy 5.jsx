import * as THREE from 'three'
import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
// import { EffectComposer , DepthOfField } from 'three/examples/jsm/postprocessing/EffectComposer'
import { EffectComposer , DepthOfField } from '@react-three/postprocessing'


function Banana({ z }) {
  const ref = useRef()
  const  { nodes,materials } = useGLTF('/zahlen-gold-1-v1-exp2.glb')
 
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
      ref.current.rotation.set((data.rX += 0.01) ,(data.rY += 0.01), (data.rZ += 0.01))
      ref.current.position.set(data.x * width , (data.y+=0.045), z)
       if (data.y > height)  data.y = -height 
   // ref.current.position.x = Math.sin(state.clock.elapsedTime*2) // -1 to 1
    // ref.current.rotation.y = Math.sin(state.clock.elapsedTime*2) // -1 to 1   
  })

  return (
    <mesh  ref={ref}   geometry={nodes.banana.geometry}   material={materials.skin}  rotation={[-Math.PI/2,0,0]} 
    scale={ 0.10}
     material-emissive="orange" />
  )
}


export default function App({ count = 12,  depth=60}) {
   
  return (
  <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: 110, fov: 30  }}>
    <color  attach="background" args={["#ddffff"]} />
    <Suspense fallback={null}>
    <ambientLight intensity={0.2} />
    <spotLight position={[10,10,10]}  intensity={2} />
    
    <Environment preset="sunset" />
    {Array.from({ length: count}, (_,i) => (
    <Banana key={i} z={-(i / count) * depth - 20}
     scale={[1,1,1]}
    />
    ))}
    <EffectComposer>
      <DepthOfField target={[0,0,depth / 2]} focalLength={0.2} bokehScale={10} height={700} />
    </EffectComposer>
    </Suspense>
   
  </Canvas>
    )
}