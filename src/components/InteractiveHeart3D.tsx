import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { romanticAudio } from '../utils/audioEngine';
import { triggerHeartBurst } from '../utils/confettiFireworks';

export const InteractiveHeart3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [beatCount, setBeatCount] = useState(0);

  const heartMeshRef = useRef<THREE.Mesh | null>(null);
  const pointLightRef = useRef<THREE.PointLight | null>(null);
  const isPulsingRef = useRef<boolean>(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const cameraZ = width < 360 ? 4.8 : 4.2;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, cameraZ);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.position.z = w < 360 ? 4.8 : 4.2;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff0f5, 1.2);
    scene.add(ambientLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 2.2);
    frontLight.position.set(2, 4, 4);
    scene.add(frontLight);

    const heartGlow = new THREE.PointLight(0xff2a6d, 3.5, 10);
    heartGlow.position.set(0, 0, 1.5);
    scene.add(heartGlow);
    pointLightRef.current = heartGlow;

    // Create 3D Heart Geometry using ExtrudeGeometry
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x + 0.25, y + 0.25);
    shape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    shape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
    shape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 0.95);
    shape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
    shape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
    shape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);

    const extrudeSettings = {
      depth: 0.25,
      bevelEnabled: true,
      bevelSegments: 12,
      steps: 2,
      bevelSize: 0.12,
      bevelThickness: 0.12,
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();

    const material = new THREE.MeshPhysicalMaterial({
      color: 0xe63946,
      emissive: 0x9f1239,
      emissiveIntensity: 0.45,
      roughness: 0.15,
      metalness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const heartMesh = new THREE.Mesh(geometry, material);
    heartMesh.rotation.z = Math.PI; // Flip upright
    scene.add(heartMesh);
    heartMeshRef.current = heartMesh;

    const startTime = performance.now();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = (performance.now() - startTime) * 0.001;

      // Idle gentle float and rotation
      if (heartMesh && !isPulsingRef.current) {
        heartMesh.rotation.y = Math.sin(t * 1.4) * 0.22;
        heartMesh.rotation.x = Math.sin(t * 0.9) * 0.1;
        // Idle gentle heartbeat
        const idlePulse = 1 + Math.sin(t * 3.5) * 0.035;
        heartMesh.scale.set(idlePulse, idlePulse, idlePulse);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleHeartClick = () => {
    setBeatCount((c) => c + 1);
    setHasInteracted(true);

    // Trigger sound & confetti
    romanticAudio.playHeartbeatSound();
    triggerHeartBurst(0.5, 0.5);

    // Three.js Lub-Dub realistic heartbeat animation
    isPulsingRef.current = true;
    const mesh = heartMeshRef.current;
    const light = pointLightRef.current;
    if (!mesh) return;

    const startTime = performance.now();
    const anim = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed < 140) {
        // First expansion "lub"
        const p = elapsed / 140;
        const scale = 1 + Math.sin(p * Math.PI) * 0.35;
        mesh.scale.set(scale, scale, scale);
        if (light) light.intensity = 3.5 + p * 6;
        requestAnimationFrame(anim);
      } else if (elapsed < 200) {
        // Brief pause
        requestAnimationFrame(anim);
      } else if (elapsed < 360) {
        // Second expansion "dub"
        const p = (elapsed - 200) / 160;
        const scale = 1 + Math.sin(p * Math.PI) * 0.45;
        mesh.scale.set(scale, scale, scale);
        if (light) light.intensity = 3.5 + (1 - p) * 5;
        requestAnimationFrame(anim);
      } else {
        mesh.scale.set(1, 1, 1);
        if (light) light.intensity = 3.5;
        isPulsingRef.current = false;
      }
    };
    requestAnimationFrame(anim);
  };

  return (
    <section className="relative py-28 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Dynamic Background Flare on click */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-[#ea638c]/25 via-[#670d22]/30 to-[#d4af37]/20 blur-[140px] pointer-events-none transition-all duration-700 ${
          hasInteracted ? 'scale-125 opacity-100' : 'scale-100 opacity-60'
        }`}
      />

      {/* Header Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center z-20 mb-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#ea638c]/40 mb-4">
          <Heart className="w-4 h-4 text-[#ea638c] fill-[#ea638c] animate-pulse" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#ffd1dc] font-medium">
            Interactive Love Moment
          </span>
        </div>

        <h2 className="font-serif-luxury text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-[#fffaf0] font-normal px-2">
          Sabnam, touch my heart ❤️
        </h2>
        <p className="text-[11px] sm:text-sm tracking-widest text-[#f6e6b4]/70 uppercase font-light mt-2">
          Touch the heart below to feel its rhythm
        </p>
      </motion.div>

      {/* 3D Heart Container */}
      <div
        onClick={handleHeartClick}
        className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center cursor-pointer group z-20"
      >
        <div ref={mountRef} className="w-full h-full" />

        {/* Ambient Ring Ripple */}
        <div className="absolute inset-0 rounded-full border border-[#ea638c]/20 group-hover:border-[#ea638c]/60 group-hover:scale-105 transition-all duration-500 pointer-events-none" />
      </div>

      {/* Emotional Reveal Message */}
      <div className="min-h-[80px] mt-4 z-20 flex flex-col items-center justify-center px-4">
        <AnimatePresence>
          {hasInteracted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
              className="text-center"
            >
              <h3 className="font-cormorant italic text-xl sm:text-3xl md:text-4xl text-[#fffaf0] glow-text-rose font-normal leading-relaxed">
                “It still beats faster because of you.”
              </h3>
              <p className="text-xs tracking-widest text-[#f6e6b4] uppercase mt-2">
                Beats with devotion: {beatCount} times & counting
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
