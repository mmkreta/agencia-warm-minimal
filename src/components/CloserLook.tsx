import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

/**
 * Apple-style "Take a closer look" section.
 * - Section is tall (200vh) with a sticky 3D viewport.
 * - Scroll progress drives the laptop rotation + lid open angle.
 * - Headline + bullet copy animate in on the left.
 */

const Laptop = ({ progress }: { progress: number }) => {
  const root = useRef<THREE.Group>(null);
  const lid = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!root.current || !lid.current) return;
    // gentle full rotation through scroll
    const targetY = -0.6 + progress * Math.PI * 1.4;
    const targetX = 0.25 - progress * 0.35;
    root.current.rotation.y += (targetY - root.current.rotation.y) * 0.08;
    root.current.rotation.x += (targetX - root.current.rotation.x) * 0.08;

    // lid: closed (~0) at start → open (~ -1.9rad) by mid-scroll
    const open = Math.min(1, Math.max(0, (progress - 0.05) / 0.55));
    const lidAngle = -open * 1.95;
    lid.current.rotation.x += (lidAngle - lid.current.rotation.x) * 0.1;
  });

  // dimensions
  const baseW = 3.2;
  const baseD = 2.2;
  const baseH = 0.12;
  const lidW = baseW;
  const lidH = baseD;
  const lidT = 0.08;
  const screenInset = 0.08;

  const aluminum = new THREE.MeshStandardMaterial({
    color: "#b8b8bc",
    metalness: 0.9,
    roughness: 0.35,
  });
  const dark = new THREE.MeshStandardMaterial({
    color: "#0a0a0a",
    metalness: 0.4,
    roughness: 0.6,
  });
  const screen = new THREE.MeshStandardMaterial({
    color: "#000",
    emissive: "#0a1628",
    emissiveIntensity: 0.4,
    metalness: 0.1,
    roughness: 0.2,
  });

  return (
    <group ref={root} position={[0, -0.25, 0]}>
      {/* Base */}
      <mesh material={aluminum} castShadow receiveShadow>
        <boxGeometry args={[baseW, baseH, baseD]} />
      </mesh>
      {/* Keyboard recess */}
      <mesh position={[0, baseH / 2 + 0.001, 0.15]} material={dark}>
        <boxGeometry args={[baseW * 0.78, 0.005, baseD * 0.55]} />
      </mesh>
      {/* Trackpad */}
      <mesh position={[0, baseH / 2 + 0.002, -0.55]} material={dark}>
        <boxGeometry args={[baseW * 0.4, 0.005, baseD * 0.32]} />
      </mesh>

      {/* Lid (rotates from back hinge) */}
      <group ref={lid} position={[0, baseH / 2, -baseD / 2]}>
        <group position={[0, lidH / 2, 0]}>
          {/* Back of lid */}
          <mesh material={aluminum} castShadow receiveShadow>
            <boxGeometry args={[lidW, lidH, lidT]} />
          </mesh>
          {/* Screen */}
          <mesh position={[0, 0, lidT / 2 + 0.002]} material={screen}>
            <boxGeometry args={[lidW - screenInset * 2, lidH - screenInset * 2, 0.005]} />
          </mesh>
          {/* Apple-ish glow logo */}
          <mesh position={[0, 0, -lidT / 2 - 0.002]}>
            <circleGeometry args={[0.18, 32]} />
            <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.3} />
          </mesh>
        </group>
      </group>
    </group>
  );
};

const CloserLook = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const sec = sectionRef.current;
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      const total = sec.offsetHeight - window.innerHeight;
      const scrolled = Math.min(total, Math.max(0, -rect.top));
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // text reveal windows
  const win = (a: number, b: number) =>
    Math.min(1, Math.max(0, (progress - a) / (b - a)));
  const titleIn = win(0.0, 0.18);
  const featuresIn = win(0.1, 0.3);

  const features = [
    { id: "strategy", label: "Stratégia" },
    { id: "design", label: "Dizajn" },
    { id: "code", label: "Kód" },
    { id: "performance", label: "Performance" },
    { id: "seo", label: "SEO" },
    { id: "support", label: "Podpora" },
  ];

  return (
    <section
      ref={sectionRef}
      id="closer-look"
      style={{ height: "220vh", backgroundColor: "#000" }}
      className="relative text-white"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* subtle radial backdrop behind product */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(55% 55% at 70% 55%, rgba(80,100,140,0.22) 0%, rgba(0,0,0,0) 70%)",
          }}
        />

        {/* Headline — top left, Apple-style */}
        <div className="absolute top-[6vh] md:top-[8vh] left-0 right-0 z-20 px-6 md:px-16 lg:px-24">
          <h2
            className="font-semibold leading-[0.95] tracking-[-0.035em]"
            style={{
              fontSize: "clamp(2.5rem, 7.5vw, 6.5rem)",
              opacity: titleIn,
              transform: `translateY(${(1 - titleIn) * 24}px)`,
              transition: "opacity 200ms linear",
            }}
          >
            Pozrite sa zblízka.
          </h2>
        </div>

        {/* Feature pills — bottom left column */}
        <div
          className="absolute left-6 md:left-16 lg:left-24 bottom-[8vh] z-20 flex flex-col gap-3 md:gap-3.5"
          style={{
            opacity: featuresIn,
            transform: `translateY(${(1 - featuresIn) * 16}px)`,
          }}
        >
          {features.map((f) => {
            const isActive = activeFeature === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFeature(isActive ? null : f.id)}
                className={`group flex items-center gap-3 pl-2 pr-5 py-2 rounded-full border transition-all duration-300 ${
                  isActive
                    ? "bg-white text-black border-white"
                    : "bg-white/[0.04] text-white border-white/20 hover:bg-white/10 hover:border-white/40"
                }`}
              >
                <span
                  className={`flex items-center justify-center w-7 h-7 rounded-full border transition-all ${
                    isActive
                      ? "border-black/30 rotate-45"
                      : "border-white/40 group-hover:border-white/70"
                  }`}
                >
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path
                      d="M5.5 1V10M1 5.5H10"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className="text-[14px] md:text-[15px] font-medium tracking-tight">
                  {f.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* 3D canvas — fills the right side */}
        <div className="absolute inset-0 md:left-[38%]">
            <Canvas
              shadows
              camera={{ position: [0, 1.4, 4.8], fov: 32 }}
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={0.35} />
              <directionalLight
                position={[4, 6, 4]}
                intensity={1.2}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
              />
              <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#88aaff" />
              <Suspense fallback={null}>
                <Laptop progress={progress} />
                <ContactShadows
                  position={[0, -0.55, 0]}
                  opacity={0.5}
                  scale={6}
                  blur={2.4}
                  far={2}
                />
                <Environment preset="city" />
              </Suspense>
            </Canvas>
        </div>

        {/* scroll progress bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[140px] h-[2px] bg-white/15 rounded-full overflow-hidden">
          <div className="h-full bg-white" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </section>
  );
};

export default CloserLook;
