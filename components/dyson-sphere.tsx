"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function DysonSphere() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45, 
      el.clientWidth / el.clientHeight, 
      0.1, 
      1000
    );
    // Position camera far enough back to see the sphere
    camera.position.z = 12;
    // Shift camera slightly to the right so sphere is offset left
    camera.position.x = -2;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    // Dyson Sphere Geometry - Group
    const group = new THREE.Group();


    // 2. Middle Shell (Data Rings - Blue)
    // 2. Middle Shell (Data Rings - Blue)
    const middleGeo = new THREE.SphereGeometry(3.5, 24, 12);
    const middleMat = new THREE.MeshBasicMaterial({
      color: 0x0051ff, // blue
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const middleSphere = new THREE.Mesh(middleGeo, middleMat);
    group.add(middleSphere);

    // 3. Inner Core (Energy Source - Orange)
    const coreGeo = new THREE.IcosahedronGeometry(2, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xff2f00, // accent orange
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const coreSphere = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreSphere);

    scene.add(group);

    // Animation loop
    let animationFrameId: number;
    const render = () => {
      // Rotate the main spheres
      middleSphere.rotation.x -= 0.001;
      middleSphere.rotation.y -= 0.0005;

      coreSphere.rotation.x += 0.002;
      coreSphere.rotation.z += 0.0015;

      // Slowly bob the entire group up and down
      group.position.y = Math.sin(Date.now() * 0.001) * 0.2;

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
      
      // Dispose Geometries and Materials
      middleGeo.dispose();
      middleMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 pointer-events-none mix-blend-screen" 
      aria-hidden="true"
    />
  );
}
