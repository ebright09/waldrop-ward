
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { RoundedBox, Text, Html, OrthographicCamera, Torus, Cylinder, Box, Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { COLORS, BARK_LINES, PATIENT_BARKS } from '../constants';
import { VisualTraits, PropType, GamePhase } from '../types';

// Augment the global JSX namespace to include React Three Fiber elements
declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

// --- BABY MODEL ---
const BabyModel = () => (
    <group>
        {/* Head */}
        <mesh position={[0, 0.3, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#f8d9c0" />
        </mesh>
        {/* Body (Swaddle) */}
        <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.1, 0.4, 16]} />
            <meshStandardMaterial color="white" />
        </mesh>
        {/* Pacifier */}
        <mesh position={[0, 0.3, 0.13]} rotation={[Math.PI/2, 0, 0]}>
            <torusGeometry args={[0.03, 0.01, 8, 16]} />
            <meshStandardMaterial color="#blue" />
        </mesh>
    </group>
);

// --- YEET SYSTEM ---
const BabyProjectile = ({ active }: { active: boolean }) => {
    const ref = useRef<THREE.Group>(null);
    const [launched, setLaunched] = useState(false);
    const [scale, setScale] = useState(0);

    useEffect(() => {
        if (active) {
            setLaunched(true);
            setScale(0); // Start small
        } else {
            setLaunched(false);
        }
    }, [active]);

    useFrame((state) => {
        if (launched && ref.current) {
            // EXPANSION PHASE
            if (scale < 3) {
                const newScale = scale + 0.2;
                setScale(newScale);
                ref.current.scale.set(newScale, newScale, newScale);
                ref.current.position.y += 0.05; // Hover up while growing
            } else {
                // LAUNCH PHASE
                ref.current.position.y += 0.2; 
                ref.current.position.x += 0.25; 
                ref.current.rotation.z -= 0.2; 
                ref.current.rotation.x += 0.1;
            }
        } else if (!launched && ref.current) {
            ref.current.position.set(0, 0.5, 0);
            ref.current.scale.set(0, 0, 0);
        }
    });

    if (!launched) return null;

    return (
        <group ref={ref} position={[-0.5, 1.5, -0.5]}>
            <BabyModel />
             <Html position={[0, 0.5, 0]} center>
                <div className="text-2xl font-black text-white bg-black px-2 border-2 border-white whitespace-nowrap">YEET!</div>
            </Html>
        </group>
    );
};


// --- PROPS SYSTEM ---
const PropSystem = ({ type }: { type: PropType }) => {
    // SCALING: Reduced to 3x as requested
    const SCALE = 3;
    
    if (type === 'RING_LIGHT') {
        return (
            <group position={[2, 0, -2]} rotation={[0, -0.5, 0]} scale={[SCALE, SCALE, SCALE]}>
                <Cylinder args={[0.05, 0.05, 3]} position={[0, 1.5, 0]} material-color="#333" />
                <Torus args={[0.8, 0.05, 16, 32]} position={[0, 2.8, 0]} rotation={[0, 0, 0]}>
                    <meshStandardMaterial color="white" emissive="white" emissiveIntensity={2} />
                </Torus>
            </group>
        );
    }
    if (type === 'SNEAKERS') {
        return (
            <group position={[2, 0.5, -1]} scale={[SCALE, SCALE, SCALE]}>
                <Box args={[0.6, 0.3, 0.9]} position={[0, 0, 0]} rotation={[0, 0.2, 0]}>
                    <meshStandardMaterial color="#ea580c" />
                </Box>
                <Box args={[0.6, 0.3, 0.9]} position={[0.1, 0.3, 0]} rotation={[0, -0.1, 0]}>
                    <meshStandardMaterial color="#ea580c" />
                </Box>
                <Box args={[0.6, 0.3, 0.9]} position={[-0.05, 0.6, 0]} rotation={[0, 0.3, 0]}>
                    <meshStandardMaterial color="#ea580c" />
                </Box>
            </group>
        );
    }
    if (type === 'SERVERS') {
        return (
            <group position={[3, 0, 0]} scale={[SCALE, SCALE, SCALE]}>
                <Box args={[1, 2.5, 1]} position={[0, 1.25, 0]}>
                    <meshStandardMaterial color="#1a202c" />
                </Box>
                <Box args={[0.8, 0.1, 0.05]} position={[0, 2, 0.51]}>
                    <meshStandardMaterial color="green" emissive="green" emissiveIntensity={2} />
                </Box>
            </group>
        );
    }
    if (type === 'CANDLES') {
        return (
            <group scale={[SCALE, SCALE, SCALE]} position={[0, 0, 1]}>
                <pointLight position={[-1, 0.5, 0]} intensity={2} color="orange" distance={5} />
                <Cylinder args={[0.05, 0.05, 0.3]} position={[-1, 0.15, 0]} material-color="black" />
                <Cylinder args={[0.05, 0.05, 0.4]} position={[-1.2, 0.2, 0.3]} material-color="black" />
            </group>
        );
    }
    if (type === 'KETTLEBELLS') {
        return (
            <group position={[2, 0.5, 0]} scale={[SCALE, SCALE, SCALE]}>
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[0.2]} />
                    <meshStandardMaterial color="#333" roughness={0.2} />
                </mesh>
                <Torus args={[0.15, 0.03]} position={[0, 0.25, 0]} material-color="#333" />
            </group>
        );
    }
    if (type === 'ESSENTIAL_OILS') {
        return (
            <group position={[2, 1, -1]} scale={[SCALE, SCALE, SCALE]}>
                <Cylinder args={[0.1, 0.15, 0.4]} position={[0, 0.2, 0]} material-color="#805ad5" />
                <Box args={[0.6, 0.1, 0.4]} position={[0, 0, 0]} material-color="#ecc94b" />
                <mesh position={[0, 0.5, 0]}>
                    <sphereGeometry args={[0.3]} />
                    <meshStandardMaterial color="white" transparent opacity={0.3} />
                </mesh>
            </group>
        )
    }
    return null;
};

// --- CHARACTERS ---
const SpeechBubble = ({ text, visible, position }: { text: string, visible: boolean, position: [number, number, number] }) => {
  if (!visible) return null;
  return (
    <Html position={position} center zIndexRange={[100, 0]}>
      <div className="bg-white border-4 border-black p-4 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap pointer-events-none transform -translate-y-16 animate-bounce origin-bottom max-w-[250px] text-center z-50">
        <p className="text-lg font-black font-sans text-black uppercase tracking-tight">{text}</p>
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-r-4 border-b-4 border-black rotate-45"></div>
      </div>
    </Html>
  );
};

const Doctor = ({ gamePhase }: { gamePhase: GamePhase }) => {
  const group = useRef<THREE.Group>(null);
  const [bark, setBark] = useState("");
  const [showBark, setShowBark] = useState(false);

  useFrame((state) => {
    if (group.current) {
        // Idle animation
        group.current.position.y = Math.sin(state.clock.elapsedTime * 5) * 0.02;
    }
  });

  useEffect(() => {
    if (gamePhase === GamePhase.DECISION) {
        const timer = setInterval(() => {
             if (Math.random() > 0.6) {
                setBark(BARK_LINES[Math.floor(Math.random() * BARK_LINES.length)]);
                setShowBark(true);
                setTimeout(() => setShowBark(false), 3000);
             }
        }, 5000);
        return () => clearInterval(timer);
    }
  }, [gamePhase]);

  return (
    <group position={[1.2, 0, 1.2]} rotation={[0, -0.5, 0]} ref={group}>
      <SpeechBubble text={bark} visible={showBark} position={[0, 2.5, 0]} />
      {/* Legs */}
      <RoundedBox args={[0.15, 0.8, 0.15]} position={[-0.12, 0.4, 0]} radius={0.02}><meshStandardMaterial color="#2d3748" /></RoundedBox>
      <RoundedBox args={[0.15, 0.8, 0.15]} position={[0.12, 0.4, 0]} radius={0.02}><meshStandardMaterial color="#2d3748" /></RoundedBox>
      {/* Body */}
      <mesh position={[0, 1.1, 0]}><cylinderGeometry args={[0.2, 0.25, 0.7, 8]} /><meshStandardMaterial color={COLORS.SCRUBS_DOCTOR} /></mesh>
      {/* Head */}
      <RoundedBox args={[0.25, 0.3, 0.28]} position={[0, 1.65, 0]} radius={0.08}><meshStandardMaterial color="#e0ac69" /></RoundedBox>
      {/* Ponytail Hair */}
      <RoundedBox args={[0.28, 0.15, 0.3]} position={[0, 1.8, 0]} radius={0.05}><meshStandardMaterial color="#3B3024" /></RoundedBox>
      <RoundedBox args={[0.28, 0.3, 0.1]} position={[0, 1.65, -0.1]} radius={0.05}><meshStandardMaterial color="#3B3024" /></RoundedBox>
      <RoundedBox args={[0.12, 0.35, 0.12]} position={[0, 1.5, -0.25]} radius={0.05} rotation={[0.2, 0, 0]}><meshStandardMaterial color="#3B3024" /></RoundedBox>
    </group>
  );
};

const Patient = ({ traits, gamePhase }: { traits?: VisualTraits, gamePhase: GamePhase }) => {
  const group = useRef<THREE.Group>(null);
  const [bark, setBark] = useState("");
  const [showBark, setShowBark] = useState(false);
  const skinColor = traits?.skinColor || COLORS.SKIN_TONES[0];
  const hairColor = traits?.hairColor || COLORS.HAIR_COLORS[0];

  useFrame((state) => {
     if (group.current) {
         // Shaking animation if active
         group.current.rotation.y = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 15) * 0.03;
     }
  });

  useEffect(() => {
    if (gamePhase === GamePhase.DECISION) {
        const timer = setInterval(() => {
             if (Math.random() > 0.6) {
                setBark(PATIENT_BARKS[Math.floor(Math.random() * PATIENT_BARKS.length)]);
                setShowBark(true);
                setTimeout(() => setShowBark(false), 3000);
             }
        }, 4000);
        return () => clearInterval(timer);
    }
  }, [gamePhase]);

  return (
    <group position={[-0.5, 0.65, -0.5]} rotation={[0, Math.PI / 2, 0]} ref={group}>
      <SpeechBubble text={bark} visible={showBark} position={[0, 1.5, 0]} />
      {/* Bed Body */}
      <RoundedBox args={[0.6, 0.3, 1.6]} position={[0, 0.15, 0.2]} radius={0.1}><meshStandardMaterial color="#90cdf4" /></RoundedBox>
      {/* Head */}
      <RoundedBox args={[0.3, 0.3, 0.3]} position={[0, 0.25, -0.7]} radius={0.1}><meshStandardMaterial color={skinColor} /></RoundedBox>
      {/* Long Hair */}
      <RoundedBox args={[0.34, 0.1, 0.34]} position={[0, 0.4, -0.7]} radius={0.05}><meshStandardMaterial color={hairColor} /></RoundedBox>
      <RoundedBox args={[0.45, 0.1, 0.7]} position={[0, 0.15, -0.9]} radius={0.05} rotation={[0.1, 0, 0]}><meshStandardMaterial color={hairColor} /></RoundedBox>
    </group>
  );
};

const Decor = () => {
    return (
        <group>
            {/* Medical Cabinet */}
            <group position={[-3, 0, -3]}>
                <Box args={[1.5, 2, 0.5]} position={[0, 1, 0]}>
                    <meshStandardMaterial color="#cbd5e0" />
                </Box>
                <Box args={[1.4, 0.9, 0.05]} position={[0, 1.5, 0.23]}>
                    <meshStandardMaterial color="#a0aec0" />
                </Box>
                <Box args={[1.4, 0.9, 0.05]} position={[0, 0.5, 0.23]}>
                    <meshStandardMaterial color="#a0aec0" />
                </Box>
            </group>
            {/* Oxygen Tank */}
            <group position={[-2, 0, 2]}>
                <Cylinder args={[0.15, 0.15, 1.2]} position={[0, 0.6, 0]} material-color="green" />
                <Sphere args={[0.15]} position={[0, 1.2, 0]} material-color="silver" />
            </group>
            {/* Computer Cart */}
            <group position={[1, 0, -2.5]} rotation={[0, -0.5, 0]}>
                 <Cylinder args={[0.05, 0.05, 1.5]} position={[0, 0.75, 0]} material-color="silver" />
                 <Box args={[0.5, 0.05, 0.5]} position={[0, 1, 0]} material-color="white" />
                 <Box args={[0.6, 0.4, 0.05]} position={[0, 1.3, 0.2]} rotation={[-0.2, 0, 0]} material-color="black" />
            </group>
        </group>
    )
}

const Room = ({ propType, gamePhase, lastOutcome }: { propType: PropType, gamePhase: GamePhase, lastOutcome: string }) => {
  const success = lastOutcome.startsWith("SUCCESS");

  return (
    <group>
      {/* Floor */}
      {Array.from({ length: 8 }).map((_, x) =>
        Array.from({ length: 8 }).map((_, z) => (
          <mesh key={`${x}-${z}`} position={[x - 3.5, 0, z - 3.5]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.95, 0.95]} />
            <meshStandardMaterial color={(x + z) % 2 === 0 ? COLORS.FLOOR_TILE_A : COLORS.FLOOR_TILE_B} />
          </mesh>
        ))
      )}
      
      {/* Walls */}
      <mesh position={[-4, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[8, 4]} />
        <meshStandardMaterial color="#f7fafc" />
      </mesh>
      <mesh position={[0, 2, -4]}>
        <planeGeometry args={[8, 4]} />
        <meshStandardMaterial color="#f7fafc" />
      </mesh>

      {/* Art & Text */}
      <group position={[-3.95, 2.5, -2]} rotation={[0, Math.PI/2, 0]}>
          <Box args={[1.5, 1.5, 0.1]}><meshStandardMaterial color="#1a202c" /></Box>
          <Box args={[1.3, 1.3, 0.12]}><meshStandardMaterial color="#c68642" /></Box>
          <Cylinder args={[0.2, 0.4, 1]} position={[0, -0.2, 0.1]} material-color="darkgreen" />
      </group>
      
      {/* Fun Wall Text */}
      <mesh position={[0, 2.8, -3.99]}><planeGeometry args={[8, 0.8]} /><meshStandardMaterial color={COLORS.HOSPITAL_RED} /></mesh>
      <Text position={[0, 2.8, -3.98]} fontSize={0.5} color="white" anchorX="center" anchorY="middle" font="https://fonts.gstatic.com/s/fredokaone/v8/k3kUo8kEI-tA1RRcTZGmGmHHE00.woff">CARDINAL MEDICAL</Text>
      <Text position={[-3.98, 2.5, 2]} rotation={[0, Math.PI/2, 0]} fontSize={0.4} color="#333" anchorX="center" anchorY="middle" font="https://fonts.gstatic.com/s/fredokaone/v8/k3kUo8kEI-tA1RRcTZGmGmHHE00.woff">WALDROP'S WARD</Text>

      {/* Bed */}
      <group position={[-0.5, 0, -0.5]} rotation={[0, Math.PI/2, 0]}>
         <RoundedBox args={[0.9, 0.5, 2.3]} position={[0, 0.25, 0]} radius={0.05}><meshStandardMaterial color="#cbd5e0" /></RoundedBox>
         <RoundedBox args={[0.8, 0.2, 2.2]} position={[0, 0.55, 0]} radius={0.05}><meshStandardMaterial color="white" /></RoundedBox>
         <RoundedBox args={[0.7, 0.15, 0.5]} position={[0, 0.7, -0.8]} radius={0.05}><meshStandardMaterial color="white" /></RoundedBox>
      </group>
      
      {/* IV Stand */}
      <group position={[-1.5, 0, -1]}>
          <Cylinder args={[0.02, 0.02, 2.5]} position={[0, 1.25, 0]} material-color="silver" />
          <mesh position={[0, 2.2, 0.2]}><sphereGeometry args={[0.15]} /><meshStandardMaterial color="#90cdf4" transparent opacity={0.8} /></mesh>
      </group>

      <Decor />
      <Doctor gamePhase={gamePhase} />
      <PropSystem type={propType} />
      <BabyProjectile active={gamePhase === GamePhase.RESULT && success} />
    </group>
  );
};

interface SceneProps {
  patientTraits?: VisualTraits;
  propType?: PropType;
  gamePhase: GamePhase;
  lastOutcome: string;
}

const Scene3D: React.FC<SceneProps> = ({ patientTraits, propType = 'NONE' as PropType, gamePhase, lastOutcome }) => {
  return (
    <Canvas shadows dpr={[1, 2]} className="w-full h-full">
      <color attach="background" args={['#1a202c']} />
      {/* Interactive Orbit Controls restricted to a "Desk" view */}
      <OrbitControls 
         enablePan={true} 
         enableZoom={true} 
         minZoom={20} 
         maxZoom={100}
         minPolarAngle={0} 
         maxPolarAngle={Math.PI / 2.5}
         minAzimuthAngle={0}
         maxAzimuthAngle={Math.PI / 2}
      />
      <OrthographicCamera makeDefault position={[20, 20, 20]} zoom={35} near={-50} far={200} />
      
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 20, 5]} intensity={1.5} castShadow />
      <pointLight position={[-5, 5, -5]} intensity={0.5} />
      
      {/* CENTERED ROOM POSITION [2, -2, 0] to offset left UI */}
      <group position={[2, -2, 0]}>
        <Room propType={propType} gamePhase={gamePhase} lastOutcome={lastOutcome} />
        <Patient traits={patientTraits} gamePhase={gamePhase} />
      </group>
    </Canvas>
  );
};

export default Scene3D;
