"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function TerrainGrid() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Add fog to fade out the grid in the distance. 
    scene.fog = new THREE.FogExp2(0x0f0f0f, 0.025);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60, 
      el.clientWidth / el.clientHeight, 
      0.1, 
      200
    );
    // Position camera just above the terrain, looking forward into the horizon
    camera.position.y = 3;
    camera.position.z = 10;
    camera.lookAt(0, 0, -20);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    // Geometry setup
    const geometry = new THREE.PlaneGeometry(120, 80, 100, 80);
    geometry.rotateX(-Math.PI / 2);

    const positions = geometry.attributes.position.array;
    const initialZ: number[] = [];
    
    for (let i = 0; i < positions.length; i += 3) {
      initialZ.push(positions[i + 2]);
    }

    // Material setup
    // 1. Solid base to occlude the sun behind the mountains
    const solidMat = new THREE.MeshBasicMaterial({
      color: 0x050505, // Very dark background color
      transparent: true,
      opacity: 0.95, // Nearly solid
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });

    // 2. Wireframe lines
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x4a4a4a, // muted gray
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });

    const terrainGroup = new THREE.Group();
    const solidTerrain = new THREE.Mesh(geometry, solidMat);
    const wireTerrain = new THREE.Mesh(geometry, wireMat);
    
    terrainGroup.add(solidTerrain);
    terrainGroup.add(wireTerrain);
    scene.add(terrainGroup);

    // Animation loop
    let animationFrameId: number;
    let time = 0;
    const speed = 0.08;

    const render = () => {
      time += speed;
      
      // Calculate responsive parameters for smooth transition between mobile and desktop.
      // Desktop & iPad (>= 768px): t = 1 (Original waves)
      // Mobile phones (<= 430px): t = 0 (Subtle waves, narrower flat path)
      const t = Math.max(0, Math.min(1, (window.innerWidth - 430) / (768 - 430)));
      
      // Interpolate path width (2.5 on mobile, 6 on desktop)
      const pathWidth = 2.5 + t * 3.5;
      // Interpolate amplitude (60% height on mobile, 100% on desktop)
      const amplitudeScale = 0.6 + t * 0.4;
      
      const positions = geometry.attributes.position.array;
      let zIndex = 0;
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const originalZ = initialZ[zIndex++];
        
        const movingZ = originalZ + time;
        const distanceX = Math.abs(x);
        let y = 0;
        
        // Central flat path, mountains on sides adapted for screen size
        if (distanceX > pathWidth) {
          const mountainStrength = Math.min(1, (distanceX - pathWidth) / 15);
          let noise = Math.sin(x * 0.4) + Math.cos(movingZ * 0.4);
          noise += Math.sin(x * 0.1) * 2;
          noise += Math.cos(movingZ * 0.2) * 3;
          y = Math.max(0, noise) * 2 * mountainStrength * amplitudeScale;
        }
        
        positions[i + 1] = y;
      }
      
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    // Resize handler
    const handleResize = () => {
      if (!el) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (el && el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement);
      }
      geometry.dispose();
      solidMat.dispose();
      wireMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* The Retro Sun */}
      <div 
        className="absolute left-1/2 top-[40%] h-[80vw] w-[80vw] md:h-[50vw] md:w-[50vw] max-h-[400px] max-w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-100 blur-xl md:blur-0"
        style={{
          background: "linear-gradient(to bottom, #ffea00 0%, #ff5e00 45%, #e60000 100%)",
          boxShadow: "0 0 120px 20px rgba(255, 94, 0, 0.2)",
          zIndex: 0
        }}
      />
      
      {/* The 3D Terrain Canvas */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 z-10" 
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
        }}
      />
    </div>
  );
}
