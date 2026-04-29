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
  const titleIn = win(0.05, 0.25);
  const bullet1 = win(0.25, 0.45);
  const bullet2 = win(0.45, 0.65);
  const bullet3 = win(0.65, 0.85);

  return (
    <section
      ref={sectionRef}
      id="closer-look"
      style={{ height: "260vh", backgroundColor: "#0a0a0a" }}
      className="relative text-white"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* subtle radial backdrop */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 70% 50%, rgba(70,90,120,0.25) 0%, rgba(10,10,10,0) 70%)",
          }}
        />

        <div className="relative h-full max-w-[1400px] mx-auto grid md:grid-cols-2 items-center gap-8 px-6 md:px-12">
          {/* Left: copy */}
          <div className="relative z-10 max-w-[520px]">
            <p
              className="uppercase text-[10px] tracking-[0.3em] text-white/55 mb-6"
              style={{ opacity: titleIn, transform: `translateY(${(1 - titleIn) * 12}px)` }}
            >
              Pozrite sa zblízka
            </p>
            <h2
              className="font-semibold leading-[1.02] tracking-[-0.02em]"
              style={{
                fontSize: "clamp(2.25rem, 5vw, 4.25rem)",
                opacity: titleIn,
                transform: `translateY(${(1 - titleIn) * 24}px)`,
                transition: "opacity 200ms linear",
              }}
            >
              Postavené do detailu.
            </h2>

            <ul className="mt-10 space-y-6 text-white/80 text-[15px] md:text-[17px] leading-relaxed">
              {[
                { t: bullet1, label: "Stratégia, dizajn a kód pod jednou strechou." },
                { t: bullet2, label: "Performance audit pred každým launchom." },
                { t: bullet3, label: "Žiadne šablóny — všetko šité na mieru." },
              ].map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4"
                  style={{
                    opacity: b.t,
                    transform: `translateY(${(1 - b.t) * 18}px)`,
                  }}
                >
                  <span className="mt-2 size-1.5 rounded-full bg-white/70 shrink-0" />
                  <span>{b.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: 3D canvas */}
          <div className="absolute md:relative inset-0 md:inset-auto h-full w-full md:h-[80vh]">
            <Canvas
              shadows
              camera={{ position: [0, 1.6, 5.2], fov: 35 }}
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
