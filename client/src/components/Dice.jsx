import { useFrame } from '@react-three/fiber';
import React from "react";
import { useState } from "react";

const Dice = () => {
    const dice = React.useRef();
    const [blocked, setBlocked] = useState(false);
    useFrame(({ clock }) => {
        if (blocked) return;
        setBlocked(true);
        setTimeout(() => setBlocked(false), 1000 / 60);
        const t = clock.getElapsedTime();
        dice.current.rotation.x = t / 2;
        dice.current.rotation.y = (t / 2) / 2;
        dice.current.rotation.z = (t * 0.8) / 2;
    });

    return (
        <mesh ref={dice} scale={0.6}>
            <octahedronGeometry args={[4, 0]} />
            <meshStandardMaterial color="royalblue" />
        </mesh>
    );
};

export default Dice;