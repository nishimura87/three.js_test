import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls as OrbitControlsImpl } from '@react-three/drei';
import Model from '../components/Model';
import * as THREE from 'three';

const App: React.FC = () => {
    const [color, setColor] = useState<string>('#ffffff');
    const [bgColor, setBgColor] = useState<string>('white');
    const controlsRef = useRef<any>(null);

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor(event.target.value);
    };

    const handleBgColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setBgColor(event.target.value);
    };

    const setView = (direction: [number, number, number]) => {
        if (controlsRef.current) {
        const controls = controlsRef.current;
        const distance = controls.object.position.length();
        const normalizedDirection = new THREE.Vector3(...direction).normalize();
        const newPosition = normalizedDirection.multiplyScalar(distance);
        controls.object.position.set(newPosition.x, newPosition.y, newPosition.z);
        controls.object.lookAt(0, 0, 0);
        controls.update();
        }
    };

    return (
        <div style={{ backgroundColor: bgColor }}>
        <div id="controls" style={{ display: 'flex', gap: '5px', position: 'absolute', top: 10, left: 10, zIndex: 100 }}>
            <button onClick={() => setView([0, 0, 1])}>正面</button>
            <button onClick={() => setView([1, 0, 0])}>右側面</button>
            <button onClick={() => setView([-1, 0, 0])}>左側面</button>
            <button onClick={() => setView([0, 1, 0])}>平面図</button>
            <input type="color" value={color} onChange={handleColorChange} />
            <select value={bgColor} onChange={handleBgColorChange}>
            <option value="white">背景色を選択</option>
            <option value="lightgray">グレー</option>
            <option value="black">黒</option>
            </select>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Canvas
            style={{ width: '100vw', height: '80vh' }}
            camera={{
                position: [0, 0, 20],
                fov: 75,
                near: 0.1,
                far: 1000
            }}
            >
            <ambientLight intensity={2.0} />
            <directionalLight />
            <fog attach="fog" args={[bgColor, 10, 100]} />
            <Model color={color} />
            <OrbitControlsImpl ref={controlsRef} enableRotate={true} />
            </Canvas>
        </div>
        </div>
    );
};

export default App;
