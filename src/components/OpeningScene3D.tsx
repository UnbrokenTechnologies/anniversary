import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { romanticAudio } from '../utils/audioEngine';

interface OpeningScene3DProps {
  onComplete: () => void;
}

export const OpeningScene3D: React.FC<OpeningScene3DProps> = ({ onComplete }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showNameReveal, setShowNameReveal] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  // References to Three.js objects for animation
  const lidGroupRef = useRef<THREE.Group | null>(null);
  const ribbonBowRef = useRef<THREE.Group | null>(null);
  const boxGroupRef = useRef<THREE.Group | null>(null);
  const lightBurstRef = useRef<THREE.PointLight | null>(null);
  const burstParticlesRef = useRef<THREE.Points | null>(null);
  const boxYOffsetRef = useRef<number>(0);
  const boxScaleRef = useRef<number>(1);
  const shadowMeshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const isMobile = width < 640;
    const camZ = width < 420 ? 7.2 : (width < 640 ? 6.2 : 5.2);
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, isMobile ? 1.0 : 1.2, camZ);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff0f5, 1.4);
    scene.add(ambientLight);

    const goldSpot = new THREE.SpotLight(0xffd700, 3.5, 20, Math.PI / 4, 0.4, 1);
    goldSpot.position.set(4, 6, 5);
    goldSpot.castShadow = true;
    scene.add(goldSpot);

    const warmFill = new THREE.PointLight(0xe27396, 2.0, 15);
    warmFill.position.set(-4, 2, 3);
    scene.add(warmFill);

    const rimLight = new THREE.DirectionalLight(0xffe4e1, 1.2);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    // Inner Burst Light
    const innerLight = new THREE.PointLight(0xfff1b0, 0, 8);
    innerLight.position.set(0, 0.5, 0);
    scene.add(innerLight);
    lightBurstRef.current = innerLight;

    // Materials
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: 0xfae1dd, // Soft blush pink luxury texture
      roughness: 0.3,
      metalness: 0.15,
    });

    const goldRibbonMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Champagne gold satin
      roughness: 0.25,
      metalness: 0.85,
    });

    // Master Box Group
    const boxGroup = new THREE.Group();
    boxGroupRef.current = boxGroup;
    scene.add(boxGroup);

    // 1. Box Base
    const boxSize = 1.8;
    const boxHeight = 1.3;
    const baseGeo = new THREE.BoxGeometry(boxSize, boxHeight, boxSize);
    const boxBase = new THREE.Mesh(baseGeo, boxMaterial);
    boxBase.position.y = 0;
    boxBase.castShadow = true;
    boxBase.receiveShadow = true;
    boxGroup.add(boxBase);

    // Vertical Ribbon on Base
    const ribbonWidth = 0.26;
    const vRibbonGeo = new THREE.BoxGeometry(ribbonWidth, boxHeight + 0.02, boxSize + 0.02);
    const vRibbon = new THREE.Mesh(vRibbonGeo, goldRibbonMaterial);
    boxGroup.add(vRibbon);

    // Horizontal Ribbon on Base
    const hRibbonGeo = new THREE.BoxGeometry(boxSize + 0.02, boxHeight + 0.02, ribbonWidth);
    const hRibbon = new THREE.Mesh(hRibbonGeo, goldRibbonMaterial);
    boxGroup.add(hRibbon);

    // 2. Box Lid with Pivot Group (hinged at back)
    const lidGroup = new THREE.Group();
    // Set pivot at the top back edge of the box
    lidGroup.position.set(0, boxHeight / 2 + 0.05, -boxSize / 2);
    boxGroup.add(lidGroup);
    lidGroupRef.current = lidGroup;

    const lidMeshGroup = new THREE.Group();
    lidMeshGroup.position.set(0, 0, boxSize / 2); // Shift geometry center relative to pivot
    lidGroup.add(lidMeshGroup);

    const lidGeo = new THREE.BoxGeometry(boxSize + 0.08, 0.28, boxSize + 0.08);
    const boxLid = new THREE.Mesh(lidGeo, boxMaterial);
    boxLid.castShadow = true;
    lidMeshGroup.add(boxLid);

    // Ribbon crosses on Lid
    const lidVRibbon = new THREE.Mesh(
      new THREE.BoxGeometry(ribbonWidth, 0.29, boxSize + 0.1),
      goldRibbonMaterial
    );
    lidMeshGroup.add(lidVRibbon);

    const lidHRibbon = new THREE.Mesh(
      new THREE.BoxGeometry(boxSize + 0.1, 0.29, ribbonWidth),
      goldRibbonMaterial
    );
    lidMeshGroup.add(lidHRibbon);

    // 3. Satin Ribbon Bow on Top
    const bowGroup = new THREE.Group();
    bowGroup.position.set(0, 0.16, 0);
    ribbonBowRef.current = bowGroup;
    lidMeshGroup.add(bowGroup);

    // Bow loops (Torus meshes)
    const bowLoopGeo = new THREE.TorusGeometry(0.24, 0.07, 16, 32);
    const leftLoop = new THREE.Mesh(bowLoopGeo, goldRibbonMaterial);
    leftLoop.rotation.y = Math.PI / 4;
    leftLoop.rotation.x = Math.PI / 4;
    leftLoop.position.set(-0.16, 0.1, 0);
    bowGroup.add(leftLoop);

    const rightLoop = new THREE.Mesh(bowLoopGeo, goldRibbonMaterial);
    rightLoop.rotation.y = -Math.PI / 4;
    rightLoop.rotation.x = -Math.PI / 4;
    rightLoop.position.set(0.16, 0.1, 0);
    bowGroup.add(rightLoop);

    // Center knot
    const knotGeo = new THREE.SphereGeometry(0.1, 16, 16);
    const knot = new THREE.Mesh(knotGeo, goldRibbonMaterial);
    knot.position.set(0, 0.05, 0);
    bowGroup.add(knot);

    // 4. Soft Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(3.5, 3.5);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.45,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.0;
    scene.add(shadowMesh);
    shadowMeshRef.current = shadowMesh;

    // 5. Internal Sparkle Particles
    const particleCount = 120;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    const pVelocities: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 1.2;
      pPositions[i * 3 + 1] = 0;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
      pVelocities.push(
        (Math.random() - 0.5) * 0.02,
        Math.random() * 0.04 + 0.02,
        (Math.random() - 0.5) * 0.02
      );
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));

    const pMat = new THREE.PointsMaterial({
      color: 0xffd700,
      size: 0.06,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(pGeo, pMat);
    boxGroup.add(particles);
    burstParticlesRef.current = particles;

    // Animation Loop
    const startTime = performance.now();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Floating idle motion with opening offset
      if (boxGroup) {
        boxGroup.position.y = boxYOffsetRef.current + Math.sin(elapsedTime * 1.5) * 0.08;
        boxGroup.rotation.y = Math.sin(elapsedTime * 0.6) * 0.18 + 0.35;
        boxGroup.rotation.x = 0.15 + Math.cos(elapsedTime * 0.8) * 0.04;
        boxGroup.scale.setScalar(boxScaleRef.current);
      }

      // Shadow breathing following box position
      if (shadowMesh) {
        shadowMesh.position.y = -1.0 + boxYOffsetRef.current;
        shadowMesh.scale.setScalar(
          (1 - (boxGroup.position.y - boxYOffsetRef.current) * 0.4) * boxScaleRef.current
        );
      }

      // Sparkle burst animation when opened
      if (particles && (particles.material as THREE.PointsMaterial).opacity > 0) {
        const positions = particles.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3] += pVelocities[i * 3];
          positions[i * 3 + 1] += pVelocities[i * 3 + 1];
          positions[i * 3 + 2] += pVelocities[i * 3 + 2];
        }
        particles.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize listener
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.position.z = w < 420 ? 7.2 : (w < 640 ? 6.2 : 5.2);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Handle Box Opening
  const handleOpenGift = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Play sounds & start music
    romanticAudio.playChimeSound();
    romanticAudio.play();

    // 1. Untie Bow & open Lid smoothly
    const startTime = performance.now();
    const duration = 2200;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const targetYDrop = isMobile ? 1.4 : 1.2;
    const targetScale = 0.84;

    const animateOpen = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      // Lower box smoothly down to bottom of viewport
      boxYOffsetRef.current = -ease * targetYDrop;
      boxScaleRef.current = 1 - ease * (1 - targetScale);

      // Untie and shrink bow
      if (ribbonBowRef.current) {
        ribbonBowRef.current.scale.setScalar(Math.max(0.001, 1 - ease * 1.2));
      }

      // Rotate lid backward smoothly
      if (lidGroupRef.current) {
        lidGroupRef.current.rotation.x = -ease * 2.2; // ~126 degrees open
      }

      // Light burst
      if (lightBurstRef.current) {
        lightBurstRef.current.intensity = Math.sin(progress * Math.PI) * 7.5;
      }

      // Particles emission
      if (burstParticlesRef.current) {
        (burstParticlesRef.current.material as THREE.PointsMaterial).opacity = Math.min(1, ease * 1.5);
      }

      if (progress < 1) {
        requestAnimationFrame(animateOpen);
      } else {
        // Trigger emotional reveal
        setTimeout(() => setShowNameReveal(true), 400);
        setTimeout(() => setShowSubtitle(true), 1800);
        // Transition to Hero after showing reveal
        setTimeout(() => {
          onComplete();
        }, 6200);
      }
    };

    requestAnimationFrame(animateOpen);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-radial from-[#310815] via-[#140207] to-[#080104]">
      {/* Skip Intro Button */}
      <button
        onClick={onComplete}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-40 text-[10px] sm:text-xs tracking-widest text-[#f6e6b4]/80 hover:text-[#f6e6b4] uppercase px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#d4af37]/30 hover:border-[#d4af37]/70 backdrop-blur-md transition-all duration-300"
      >
        Skip Intro &rarr;
      </button>

      {/* Atmospheric Moving Rays & Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.7)_100%)] z-10" />
      <div className="absolute inset-0 pointer-events-none bg-[conic-gradient(from_0deg_at_50%_50%,rgba(226,115,150,0.03)_0deg,transparent_60deg,rgba(212,175,55,0.04)_120deg,transparent_180deg)] animate-spin-slow opacity-60 z-10" />

      {/* Title above box */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="absolute top-[8%] sm:top-[14%] z-20 text-center px-4 max-w-sm sm:max-w-none"
        >
          <p className="font-cormorant italic text-base sm:text-2xl text-[#f6e6b4] tracking-wide mb-1 flex items-center justify-center gap-1.5 sm:gap-2">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d4af37] animate-pulse" />
            <span>A special gift for the love of my life...</span>
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d4af37] animate-pulse" />
          </p>
          <div className="h-[1px] w-20 sm:w-24 mx-auto bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
        </motion.div>
      )}

      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full absolute inset-0 z-15 cursor-pointer" onClick={handleOpenGift} />

      {/* Button: Open the Gift */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-[9%] sm:bottom-[16%] z-30 flex flex-col items-center px-4 w-auto max-w-full"
        >
          <button
            onClick={handleOpenGift}
            className="group relative px-7 py-3 sm:px-9 sm:py-3.5 rounded-full overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95 cursor-pointer"
          >
            {/* Button Gradient & Glow Border */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#670d22] via-[#ea638c] to-[#d4af37] opacity-90 group-hover:opacity-100 transition-opacity" />
            <span className="absolute inset-[1.5px] rounded-full bg-[#1b030b]/90 backdrop-blur-md" />
            <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-2.5 whitespace-nowrap font-serif-luxury tracking-wider text-sm xs:text-base sm:text-lg font-semibold">
              <span className="gold-shimmer-text">Open the Gift</span>
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#ea638c] fill-[#ea638c] animate-bounce shrink-0" />
            </span>
          </button>
          <span className="mt-2.5 text-[11px] sm:text-xs tracking-widest text-[#f6e6b4]/70 uppercase font-light text-center">
            Touch to unveil your surprise
          </span>
        </motion.div>
      )}

      {/* Emotional Name Reveal from inside the box */}
      <AnimatePresence>
        {showNameReveal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] as const }}
            className="absolute top-[12%] sm:top-[16%] z-30 flex flex-col items-center justify-center text-center px-4 max-w-2xl sm:max-w-4xl w-full"
          >
            {/* Romantic Dark Luxury Frosted Glass Backing */}
            <div className="absolute inset-0 -inset-x-4 sm:-inset-x-10 -inset-y-4 sm:-inset-y-8 bg-[#090104]/88 backdrop-blur-xl rounded-3xl border border-[#d4af37]/40 shadow-[0_25px_80px_rgba(0,0,0,0.95)] -z-10 pointer-events-none" />

            {/* Golden & Rose Aura Glow */}
            <div className="absolute w-72 sm:w-[500px] h-36 sm:h-52 rounded-full bg-gradient-to-tr from-[#ea638c]/25 via-[#d4af37]/30 to-transparent blur-3xl -z-10 pointer-events-none" />

            <motion.h1
              initial={{ y: 15 }}
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="font-script text-4xl xs:text-5xl sm:text-7xl md:text-8xl tracking-wide max-w-full px-2 flex items-center justify-center gap-2 sm:gap-4 flex-nowrap"
            >
              <span className="gold-shimmer-text font-normal whitespace-nowrap">
                Sabnam Rai
              </span>
              <span className="inline-block text-[#ea638c] animate-pulse drop-shadow-[0_0_25px_rgba(234,99,140,0.95)] shrink-0">
                ❤️
              </span>
            </motion.h1>

            {/* Animated Golden Underline Stroke */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '260px' }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mt-2 mb-3"
            />

            {/* Emotional Blessing Subtitle */}
            {showSubtitle && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="font-cormorant text-base sm:text-2xl text-[#fffaf0] tracking-wider italic glow-text-rose"
              >
                “The most beautiful blessing of my life.”
              </motion.p>
            )}

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              onClick={onComplete}
              className="mt-6 px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-widest text-[#f6e6b4] border border-[#d4af37]/50 bg-[#160209]/90 backdrop-blur-md hover:bg-[#d4af37] hover:text-[#160209] transition-all duration-300 shadow-xl cursor-pointer"
            >
              Step Into Our Love Story &rarr;
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
