import { useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import spacemanScene from "../assets/3d/spaceman-optimized.glb";
import CanvasLoader from "./Loader";

const Spaceman = ({ scale, position, rotationX, rotationY }) => {
  const spacemanRef = useRef();
  const { scene, animations } = useGLTF(spacemanScene);
  const { actions } = useAnimations(animations, spacemanRef);

  useEffect(() => {
    console.log("✅ Spaceman model loaded successfully!");
    console.log("Available animations:", Object.keys(actions));

    if (actions["Idle"]) {
      actions["Idle"].play();
      console.log("🎬 Idle animation started");
    }
  }, [actions]);

  return (
    <group
      ref={spacemanRef}
      position={position}
      scale={scale}
      rotation={[rotationX || 0, 2.2 + (rotationY || 0), 0]}
    >
      <primitive object={scene} />
    </group>
  );
};

const SpacemanCanvas = ({ scrollContainer }) => {
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [scale, setScale] = useState([2, 2, 2]); // Back to original size
  const [position, setPosition] = useState([0.2, -0.7, 0]); // Back to original position

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainer.current) return;
      const scrollTop = scrollContainer.current.scrollTop;
      const rotationXValue = scrollTop * -0.0006;
      const rotationYValue = scrollTop * -0.00075;
      setRotationX(rotationXValue);
      setRotationY(rotationYValue);
    };

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScale([1, 1, 1]);
        setPosition([0.2, -0.1, 0]);
      } else if (window.innerWidth < 1024) {
        setScale([1.33, 1.33, 1.33]);
        setPosition([0.2, -0.3, 0]);
      } else if (window.innerWidth < 1280) {
        setScale([1.5, 1.5, 1.5]);
        setPosition([0.2, -0.4, 0]);
      } else if (window.innerWidth < 1536) {
        setScale([1.66, 1.66, 1.66]);
        setPosition([0.2, -0.5, 0]);
      } else {
        setScale([2, 2, 2]);
        setPosition([0.2, -0.7, 0]);
      }
    };

    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollContainer]);

  return (
    <Canvas
      className="w-full h-screen bg-transparent z-10"
      camera={{
        position: [0, 0, 5],
        fov: 75,
        near: 0.1,
        far: 1000,
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <directionalLight position={[1, 1, 1]} intensity={2} />
        <ambientLight intensity={0.5} />

        <Spaceman
          rotationX={rotationX}
          rotationY={rotationY}
          scale={scale}
          position={position}
        />
      </Suspense>
    </Canvas>
  );
};

export default SpacemanCanvas;
