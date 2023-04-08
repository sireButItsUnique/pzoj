import { useFrame } from '@react-three/fiber';
import React from "react";

const Dice = () => {
    const dice = React.useRef();
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        dice.current.rotation.x = t / 2;
        dice.current.rotation.y = (t / 2) / 2;
        dice.current.rotation.z = (t * 0.8) / 2;
    });

    return (
        <mesh ref={dice} scale={0.5}>
            <octahedronGeometry args={[4, 0]} />
            <meshStandardMaterial color="royalblue" />
        </mesh>
    );
};

export default Dice;