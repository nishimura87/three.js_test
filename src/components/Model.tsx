import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

type GLTFResult = {
    nodes: any;
    materials: any;
    scene: THREE.Group;
    };

    interface ModelProps {
    color: string;
    }

    const Model: React.FC<ModelProps> = ({ color }) => {
    const { scene } = useGLTF('/test.glb') as unknown as GLTFResult;
    const meshRef = useRef<THREE.Group>(null);

    useEffect(() => {
        scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const material = mesh.material;
            if (Array.isArray(material)) {
            material.forEach((mat) => {
                if (mat instanceof THREE.MeshStandardMaterial) {
                mat.color.set(color);
                }
            });
            } else if (material instanceof THREE.MeshStandardMaterial) {
            material.color.set(color);
            }
        }
        });
    }, [color, scene]);

  return <primitive ref={meshRef} object={scene} scale={[5, 5, 5]} />; // 必要に応じてスケールを調整
};

export default Model;
