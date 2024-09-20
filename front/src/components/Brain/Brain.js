import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Select, Selection, EffectComposer, Outline } from '@react-three/postprocessing';
import brainModel from '../../assets/models/me.glb';
import './Brain.scss';

export function BrainModel(props) {
    const { nodes, materials } = useGLTF(brainModel);
    const groupRef = useRef()
    const [hovered, setHover] = useState(false)

    useFrame(({ clock }, delta) => {
        groupRef.current.rotation.y += delta;
        groupRef.current.translateY(Math.sin(clock.elapsedTime)/10);
    })

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'default';
    }, [hovered]);

    const hello = () => {
        console.log('Hello :)');
    }

    return (
        <Select enabled={hovered}>
            <group
                {...props}
                ref={groupRef}
                scale={10}
                dispose={null}
                onClick={hello}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <group position={[0.498, 0.652, 3.041]} rotation={[-Math.PI / 2, 0, 0]} scale={4.201}>
                    <group rotation={[Math.PI / 2, 0, 0]}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.polySurface7_OrangOetan__LOWOog_binnen_0001_1.geometry}
                            material={materials['OrangOetan__LOWOog_binnen.001']}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.polySurface7_OrangOetan__LOWOog_binnen_0001_2.geometry}
                            material={materials['Material.003']}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.polySurface7_OrangOetan__LOWOog_binnen_0001_3.geometry}
                            material={materials.aiStandardSurface1}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.polySurface7_OrangOetan__LOWOog_binnen_0001_4.geometry}
                            material={materials.OrangOetan__LOWOog_binnen}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.polySurface7_OrangOetan__LOWOog_binnen_0001_5.geometry}
                            material={materials.OrangOetan__LOWOog_buiten}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.polySurface7_OrangOetan__LOWOog_binnen_0001_6.geometry}
                            material={materials['OrangOetan__LOWOog_buiten.001']}
                        />
                    </group>
                </group>
            </group>
        </Select>
    )
}

useGLTF.preload(brainModel);

export default function Brain() {
    return (
        <Canvas camera={{ position: [900, 200, 0], fov: 11 }}>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
            <Selection>
                <EffectComposer multisampling={8} autoClear={false}>
                    <Outline blur visibleEdgeColor="red" edgeStrength={100} width={1000} />
                </EffectComposer>
                <BrainModel />
            </Selection>
        </Canvas>
    )
}
