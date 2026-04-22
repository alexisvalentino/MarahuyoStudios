"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

/**
 * Three.js blob (ported from the "Tibixx/BbBxRG" CodePen). A sphere deformed
 * every frame by 3D Perlin noise, lit by two colored point lights, shaded as
 * PBR with an HDR environment map, with UnrealBloom for the highlight glow.
 *
 * Why the canvas is bigger than its slot and uses mix-blend-mode:
 *   UnrealBloomPass always writes alpha = 1 in its final composite; combined
 *   with EffectComposer's opaque render targets there is no clean way to get
 *   a truly transparent canvas that still shows bloom halos. Instead we:
 *     1. Render onto a canvas that extends ~25% past the aspect-square slot
 *        (so the bloom halo has physical room to reach into the hero), and
 *     2. Apply `mix-blend-mode: screen` so every near-black pixel from the
 *        canvas composites as "no change" against the dark hero background
 *        while the bright blob + bloom add brightness to the section.
 *   The visible rectangular "box" the old setup showed is gone because the
 *   dark pixels are now optically invisible rather than drawn on top.
 *
 * Self-contained: sizes to its parent element, pauses its render loop when
 * scrolled off-screen, and disposes every THREE allocation on unmount.
 * Respects prefers-reduced-motion by freezing the noise phase and
 * auto-rotation.
 *
 * Perf-tuned for the hero slot:
 *   - Sphere segments 72 (down from the pen's 256 — vertex noise sample
 *     is CPU-bound and 256² is ~13× too many for a landing page).
 *   - 30 FPS cap; DPR clamped at 1.5.
 *   - AfterimagePass removed entirely: it accumulated an opaque feedback
 *     buffer that filled the whole canvas rectangle and was the main cause
 *     of the visible box outline. The blob reads cleaner without it.
 */

// -----------------------------------------------------------------------
// 3D Perlin noise (Ken Perlin's "improved" 2002 reference)
// -----------------------------------------------------------------------
// Vendored inline because the CodePen depends on a global `noise` object
// loaded from an external script. Classic permutation table, single
// ~60-line implementation; no allocations per call.
const PERLIN_PERM = [
  151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140,
  36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234,
  75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237,
  149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48,
  27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105,
  92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73,
  209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86,
  164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38,
  147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189,
  28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153,
  101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224,
  232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144,
  12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214,
  31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150,
  254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66,
  215, 61, 156, 180,
];

function createPerlin() {
  const p = new Uint8Array(512);
  for (let i = 0; i < 256; i++) p[i] = p[i + 256] = PERLIN_PERM[i];

  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (t: number, a: number, b: number) => a + t * (b - a);
  const grad = (hash: number, x: number, y: number, z: number) => {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  };

  return (x: number, y: number, z: number) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);
    const u = fade(x);
    const v = fade(y);
    const w = fade(z);
    const A = p[X] + Y;
    const AA = p[A] + Z;
    const AB = p[A + 1] + Z;
    const B = p[X + 1] + Y;
    const BA = p[B] + Z;
    const BB = p[B + 1] + Z;
    return lerp(
      w,
      lerp(
        v,
        lerp(u, grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z)),
        lerp(u, grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z)),
      ),
      lerp(
        v,
        lerp(
          u,
          grad(p[AA + 1], x, y, z - 1),
          grad(p[BA + 1], x - 1, y, z - 1),
        ),
        lerp(
          u,
          grad(p[AB + 1], x, y - 1, z - 1),
          grad(p[BB + 1], x - 1, y - 1, z - 1),
        ),
      ),
    );
  };
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------
export function HeroBlob({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const width = mount.clientWidth || 1;
    const height = mount.clientHeight || 1;

    // ------- Renderer --------------------------------------------------
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // mix-blend-mode: screen is how we hide the "black rectangle".
    // Mathematically screen(src, dst) = 1 - (1-src)(1-dst), so any pixel
    // with src ≈ 0 composites as dst (invisible) while bright blob + bloom
    // pixels brighten the dark hero background. This handles the parts the
    // bloom pass can't (bloom writes alpha=1 everywhere it touches).
    // pointer-events:none because the extended canvas overlaps the text
    // column; we don't want it stealing clicks from nearby CTAs.
    Object.assign(renderer.domElement.style, {
      display: "block",
      background: "transparent",
      mixBlendMode: "screen",
      pointerEvents: "auto",
      width: "100%",
      height: "100%",
      touchAction: "none",
      cursor: "grab",
    });

    // ------- Scene + camera --------------------------------------------
    // Camera at z=5.0. The mount is 1.5x the slot size (inset: -25% each
    // side), so the camera is further than the slot-sized config (z=3.3)
    // to keep the blob's angular size inside the now-wider frustum. At
    // z=5.0 the blob spans ~65% of the canvas height, leaving ~35%
    // canvas margin where the bloom halo spills outside the aspect-square
    // slot into the hero background.
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.8);

    // ------- Lighting ---------------------------------------------------
    // Ferrofluid is a near-black mirror, so its entire visible appearance
    // is the reflection of light sources + HDR environment. That means the
    // point lights need to be bright enough to produce punchy specular
    // glints, and their colour is what tints the whole surface.
    //   - light1 (key): brand accent orange #ff4a1f from above-front.
    //     Dominant specular colour → the spikes read as orange-hot tips.
    //   - light2 (fill): warm cream from below so the underside of the
    //     spikes isn't dead black.
    //   - light3 (rim): cool warm-white from the far side, so rotating
    //     spikes sweep through a second highlight as they come around.
    const light1 = new THREE.PointLight(0xff4a1f, 4.5, 32);
    light1.position.set(4, 12, 7);
    scene.add(light1);
    const light2 = new THREE.PointLight(0xfff2e3, 2.2, 60);
    light2.position.set(-3, -12, 5);
    scene.add(light2);
    const light3 = new THREE.PointLight(0xffe6d0, 3, 36);
    light3.position.set(-10, 3, -6);
    scene.add(light3);

    // ------- Geometry + material ---------------------------------------
    // Cache the undeformed sphere positions so each frame we can deform
    // from the canonical unit sphere — applying noise to already-deformed
    // positions would compound error and drift.
    const geometry = new THREE.SphereGeometry(1, 72, 72);
    const posAttr = geometry.attributes.position;
    const basePositions = new Float32Array(posAttr.array as Float32Array);

    // Ferrofluid material: near-black base + fully metallic + very low
    // roughness. The key trick is that diffuse reflection is near zero
    // (metalness=1, color≈black), so every visible pixel is specular
    // reflection of the lights or HDR env. That's exactly how real
    // ferrofluid reads on camera — jet-black with liquid-mirror glints
    // along the spike tips.
    //   - color 0x060606: slight warm tint, not pure 0x000000 (pure black
    //     would make the shader skip some tonemapping nuance).
    //   - roughness 0.08: sharp, readable highlights; too low starts to
    //     alias badly at this vertex density.
    //   - No roughness map: a patterned roughness map breaks the uniform
    //     liquid-metal illusion we need here.
    const material = new THREE.MeshStandardMaterial({
      color: 0x060606,
      roughness: 0.08,
      metalness: 1.0,
    });

    const blob = new THREE.Mesh(geometry, material);
    scene.add(blob);

    // ------- HDR environment (for the PBR reflections) -----------------
    // Loaded async; the blob renders with just the point lights until the
    // HDR arrives, then the reflections "pop in". For ferrofluid the HDR
    // matters even more than before: a near-mirror black surface with
    // metalness=1 shows almost *nothing* except specular — the env map
    // is what fills the silhouette with subtle cooler tones that keep the
    // orange key light from being the only visible thing.
    scene.environmentIntensity = 0.9;
    let envTexture: THREE.Texture | null = null;
    let rgbeCancelled = false;
    new RGBELoader().load(
      "https://assets.codepen.io/1692350/istockphoto-1314573738-612x612.hdr",
      (tex) => {
        if (rgbeCancelled) {
          tex.dispose();
          return;
        }
        tex.mapping = THREE.EquirectangularReflectionMapping;
        envTexture = tex;
        scene.environment = tex;
      },
      undefined,
      (err) => {
        // eslint-disable-next-line no-console
        console.warn("HeroBlob: HDR load failed", err);
      },
    );

    // ------- Post-processing (bloom only) ------------------------------
    const composer = new EffectComposer(renderer);
    composer.setSize(width, height);
    composer.addPass(new RenderPass(scene, camera));

    // Ferrofluid tuning: the surface is 95% black, so the "bright pixels"
    // that bloom picks up are *only* the specular highlights on the spike
    // tips — exactly what we want glowing. strength=0.9 lets those pips
    // spill into the hero, threshold=0.55 catches secondary rim glints.
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.9, // strength
      0.85, // radius
      0.55, // threshold
    );
    composer.addPass(bloomPass);

    // ------- Animation loop --------------------------------------------
    // Ferrofluid model:
    //   Real ferrofluid spikes follow magnetic field lines — where the
    //   field is strong and roughly radial, the liquid pulls into a sharp
    //   conical peak (the Rosensweig instability). We fake that by
    //   designating N "magnetic pole" directions that drift around the
    //   sphere over time. Every vertex asks: "how aligned am I with each
    //   pole?" and gets extruded proportional to cos(angle)^sharpness.
    //   A high sharpness power turns a soft radial falloff into a narrow
    //   cone — that's the spike shape.
    //
    //   On top of that we add:
    //     - a low-amplitude Perlin base → microscopic surface shimmer so
    //       the flat areas between spikes aren't glassy-perfect
    //     - a global sine pulse → all spikes breathe in/out together,
    //       which reads as "the magnet's strength is oscillating"
    //     - per-pole pulses at different rates → spikes grow/recede
    //       out of sync, more organic and less mechanical.
    const perlin = createPerlin();
    // Smooth slime profile: no sharp spikes, just rounded living blobs.
    const BASE_NOISE_FREQ = 1.7;
    const BASE_NOISE_AMP = 0.08;
    const FLOW_NOISE_FREQ = 2.5;
    const FLOW_NOISE_AMP = 0.11;
    const DETAIL_NOISE_FREQ = 3.8;
    const DETAIL_NOISE_AMP = 0.045;
    const GLOBAL_PULSE_HZ = 1.05;
    const GLOBAL_PULSE_DEPTH = 0.38;
    // Keep deformation inside a stable spherical envelope while preserving
    // animated detail. The soft knee avoids a hard clipping look.
    const MIN_RADIUS = 0.9;
    const MAX_RADIUS = 1.24;
    const LIMIT_KNEE = 0.24;

    const sculptOffsets = new Float32Array(posAttr.count);
    const SCULPT_ANGLE_RADIUS = 0.5; // radians
    const SCULPT_STRENGTH = 0.03;
    const SCULPT_DECAY = 0.985;
    const SCULPT_MAX = 0.22;
    const SCULPT_MIN = -0.08;
    const sculptCosRadius = Math.cos(SCULPT_ANGLE_RADIUS);

    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2();
    const hitLocal = new THREE.Vector3();
    const hitDir = new THREE.Vector3();
    let isPointerDown = false;
    let isSculpting = false;
    let activePointerId: number | null = null;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let userRotX = 0;
    let userRotY = 0;
    let rotTargetX = 0;
    let rotTargetY = 0;
    let motionEnergy = 0;
    let motionBiasX = 0;
    let motionBiasY = 0;
    const ROTATE_SENSITIVITY = 0.0043;
    const ROTATE_SMOOTHING = 0.16;
    const ROTATE_PITCH_LIMIT = 1.0;
    const MOTION_ENERGY_INJECT = 0.05;
    const MOTION_ENERGY_DECAY = 0.955;
    const MOTION_BIAS_DECAY = 0.94;
    const MOTION_MAX = 1.0;
    const MOTION_SHAPE_SCALE = 0.2;
    const MOTION_FLOW_BOOST = 0.6;

    const applySculptAtPoint = (pointWorld: THREE.Vector3, direction = 1) => {
      hitLocal.copy(pointWorld);
      blob.worldToLocal(hitLocal);
      hitDir.copy(hitLocal).normalize();
      for (let i = 0; i < posAttr.count; i++) {
        const i3 = i * 3;
        const bx = basePositions[i3];
        const by = basePositions[i3 + 1];
        const bz = basePositions[i3 + 2];
        const dot = bx * hitDir.x + by * hitDir.y + bz * hitDir.z;
        if (dot <= sculptCosRadius) continue;
        const t = (dot - sculptCosRadius) / (1 - sculptCosRadius);
        const w = t * t * (3 - 2 * t);
        const next = sculptOffsets[i] + direction * SCULPT_STRENGTH * w;
        sculptOffsets[i] = Math.min(SCULPT_MAX, Math.max(SCULPT_MIN, next));
      }
    };

    const pickBlobPoint = (clientX: number, clientY: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointerNdc, camera);
      return raycaster.intersectObject(blob, false)[0] ?? null;
    };

    const onPointerDown = (e: PointerEvent) => {
      activePointerId = e.pointerId;
      isPointerDown = true;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      renderer.domElement.style.cursor = "grabbing";
      renderer.domElement.setPointerCapture(e.pointerId);
      const hit = pickBlobPoint(e.clientX, e.clientY);
      isSculpting = e.altKey && Boolean(hit);
      if (isSculpting) renderer.domElement.style.cursor = "crosshair";
      if (hit && isSculpting) applySculptAtPoint(hit.point, e.shiftKey ? -1 : 1);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isPointerDown || activePointerId !== e.pointerId) return;
      const dx = e.clientX - lastPointerX;
      const dy = e.clientY - lastPointerY;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      rotTargetY += dx * ROTATE_SENSITIVITY;
      rotTargetX += dy * ROTATE_SENSITIVITY;
      rotTargetX = Math.max(-ROTATE_PITCH_LIMIT, Math.min(ROTATE_PITCH_LIMIT, rotTargetX));
      const dragMag = Math.hypot(dx, dy);
      motionEnergy = Math.min(MOTION_MAX, motionEnergy + dragMag * MOTION_ENERGY_INJECT * 0.01);
      motionBiasX = motionBiasX * 0.75 + (dx / (dragMag || 1)) * 0.25;
      motionBiasY = motionBiasY * 0.75 + (dy / (dragMag || 1)) * 0.25;

      if (!isSculpting || !e.altKey) return;
      const hit = pickBlobPoint(e.clientX, e.clientY);
      if (hit) applySculptAtPoint(hit.point, e.shiftKey ? -1 : 1);
    };

    const endPointer = (e: PointerEvent) => {
      if (activePointerId !== e.pointerId) return;
      isPointerDown = false;
      isSculpting = false;
      activePointerId = null;
      renderer.domElement.style.cursor = "grab";
      if (renderer.domElement.hasPointerCapture(e.pointerId)) {
        renderer.domElement.releasePointerCapture(e.pointerId);
      }
    };

    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerup", endPointer);
    renderer.domElement.addEventListener("pointercancel", endPointer);
    renderer.domElement.addEventListener("pointerleave", endPointer);
    renderer.domElement.addEventListener("contextmenu", onContextMenu);

    const deform = (time: number) => {
      const arr = posAttr.array as Float32Array;
      const n = posAttr.count;

      // ---- 1. Global breathing: subtle in/out so it feels alive.
      const globalPulse =
        1 -
        GLOBAL_PULSE_DEPTH +
        GLOBAL_PULSE_DEPTH *
          (0.5 + 0.5 * Math.sin(time * GLOBAL_PULSE_HZ * Math.PI * 2));
      const motionFlowFactor = 1 + motionEnergy * MOTION_FLOW_BOOST;

      // ---- 2. Per-vertex smooth slime displacement.
      for (let i = 0; i < n; i++) {
        const i3 = i * 3;
        const bx = basePositions[i3];
        const by = basePositions[i3 + 1];
        const bz = basePositions[i3 + 2];
        // basePositions are already unit-length (SphereGeometry(1, ...)).

        const base =
          perlin(
            bx * BASE_NOISE_FREQ + time * 0.15,
            by * BASE_NOISE_FREQ + time * 0.12,
            bz * BASE_NOISE_FREQ + time * 0.18,
          ) * BASE_NOISE_AMP;
        const flow =
          perlin(
            bx * FLOW_NOISE_FREQ + time * (0.62 + motionBiasX * 0.14),
            by * FLOW_NOISE_FREQ + time * (0.55 - motionBiasY * 0.14),
            bz * FLOW_NOISE_FREQ + time * 0.48,
          ) * FLOW_NOISE_AMP;
        const detail =
          perlin(
            bx * DETAIL_NOISE_FREQ - time * 0.8,
            by * DETAIL_NOISE_FREQ + time * 0.88,
            bz * DETAIL_NOISE_FREQ - time * 0.72,
          ) * DETAIL_NOISE_AMP;

        sculptOffsets[i] *= SCULPT_DECAY;
        const directionalFlow = bx * motionBiasX - by * motionBiasY;
        const motionShape = directionalFlow * motionEnergy * MOTION_SHAPE_SCALE;
        const rawR =
          1 +
          base +
          (flow + detail) * globalPulse * motionFlowFactor +
          sculptOffsets[i] +
          motionShape;
        // Soft-limit radius so spikes remain lively but never exceed a
        // spherical bound. Below the knee, motion is untouched; above it,
        // additional growth is compressed asymptotically.
        const over = rawR - MAX_RADIUS;
        const limitedUpper =
          over > 0 ? MAX_RADIUS + LIMIT_KNEE * Math.tanh(over / LIMIT_KNEE) : rawR;
        const r = Math.min(MAX_RADIUS, Math.max(MIN_RADIUS, limitedUpper));
        arr[i3] = bx * r;
        arr[i3 + 1] = by * r;
        arr[i3 + 2] = bz * r;
      }
      posAttr.needsUpdate = true;
      geometry.computeVertexNormals();
    };

    // 90 FPS cap. On 60 Hz displays this effectively runs at the native
    // 60 Hz (rAF won't fire faster than the refresh rate). On 120 Hz+
    // displays it tops out around 90 FPS per the threshold. Note: this is
    // 3x the previous 30 FPS cap — if perf becomes an issue again, the
    // biggest single saver is returning the divisor to 30 or 45.
    const FRAME_INTERVAL_MS = 1000 / 90;
    let lastFrame = 0;
    let rafId = 0;
    let running = true;
    const tick = (now: number) => {
      if (!running) return;
      rafId = requestAnimationFrame(tick);
      if (now - lastFrame < FRAME_INTERVAL_MS) return;
      lastFrame = now;
      const t = reducedMotion ? 0 : now * 0.001;
      deform(t);
      const autoRotY = reducedMotion ? 0 : t * 0.16;
      const autoRotX = reducedMotion ? 0 : Math.sin(t * 0.32) * 0.22;
      userRotX += (rotTargetX - userRotX) * ROTATE_SMOOTHING;
      userRotY += (rotTargetY - userRotY) * ROTATE_SMOOTHING;
      motionEnergy *= MOTION_ENERGY_DECAY;
      motionBiasX *= MOTION_BIAS_DECAY;
      motionBiasY *= MOTION_BIAS_DECAY;
      blob.rotation.y = autoRotY + userRotY;
      blob.rotation.x = autoRotX + userRotX;
      composer.render();
    };
    rafId = requestAnimationFrame(tick);

    // ------- Resize ----------------------------------------------------
    const handleResize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
      bloomPass.setSize(w, h);
    };
    const ro = new ResizeObserver(handleResize);
    ro.observe(mount);

    // Pause when scrolled off-screen so we don't burn CPU/GPU under the
    // fold. The noise loop is the single most expensive thing in the
    // component, so skipping it when invisible matters.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          rafId = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0.01 },
    );
    io.observe(mount);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerup", endPointer);
      renderer.domElement.removeEventListener("pointercancel", endPointer);
      renderer.domElement.removeEventListener("pointerleave", endPointer);
      renderer.domElement.removeEventListener("contextmenu", onContextMenu);
      rgbeCancelled = true;
      geometry.dispose();
      material.dispose();
      envTexture?.dispose();
      bloomPass.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Two-layer structure:
  //   outer div -> inherits `className` from the caller (hero.tsx uses
  //     `absolute inset-0`), so it fills its aspect-square slot and also
  //     acts as the positioning context for the inner mount. Crucially we
  //     do NOT override `position` here — that would collapse the outer
  //     to 0×0 content size and the inner would have nothing to offset
  //     against.
  //   inner div (`mountRef`) -> absolutely positioned with negative inset
  //     so the WebGL canvas extends ~25% past the slot on every side. The
  //     hero section's `overflow: hidden` still clips at its own edges, so
  //     the bloom halo can spill into the hero but can't leak into
  //     adjacent sections.
  return (
    <div className={className} aria-hidden="true">
      <div
        ref={mountRef}
        style={{
          position: "absolute",
          inset: "-25%",
          pointerEvents: "auto",
        }}
      />
    </div>
  );
}
