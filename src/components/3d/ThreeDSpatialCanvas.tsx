import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { 
  Orbit, 
  Layers, 
  Eye, 
  Maximize2, 
  Minimize2, 
  ChevronDown, 
  ChevronUp,
  Cpu,
  Compass,
  Palette
} from 'lucide-react';

interface ThreeDSpatialCanvasProps {
  isImmersiveMode?: boolean;
  onToggleImmersive?: () => void;
}

interface NodeData {
  id: string;
  name: string;
  category: string;
  description: string;
  targetSection: string;
  position: [number, number, number];
  color: number;
}

const NODES_DATA: NodeData[] = [
  {
    id: 'it-core',
    name: 'IT Diagnostics & Systems',
    category: 'Computer Systems',
    description: 'Hardware diagnostics, OS optimization, registry hygiene, and latency tuning.',
    targetSection: '#skills',
    position: [-4.5, 1.2, -1],
    color: 0xa855f7, // Purple
  },
  {
    id: 'innova-live',
    name: 'Innova Live Startup Core',
    category: 'Cultural Tourism Tech',
    description: 'Interactive cultural storytelling and immersive heritage exploration concept.',
    targetSection: '#projects',
    position: [0, 2.2, -2],
    color: 0x3b82f6, // Electric Blue
  },
  {
    id: 'creative-motion',
    name: 'Creative Motion & Video',
    category: 'Media Production',
    description: 'High-impact mobile video editing, kinetic pacing, and visual storytelling.',
    targetSection: '#ideas-lab',
    position: [4.5, 0.8, -1.5],
    color: 0xec4899, // Pink / Magenta
  },
  {
    id: 'problem-solving',
    name: 'Algorithmic Problem Solving',
    category: 'Technical Strategy',
    description: 'Root-cause analysis, system performance benchmarking, and creative execution.',
    targetSection: '#about',
    position: [-2.2, -2, -0.5],
    color: 0x10b981, // Emerald
  },
  {
    id: 'enactus-media',
    name: 'Enactus Media Leadership',
    category: 'Leadership & Impact',
    description: 'Visual communication, brand cohesion, and digital campaign direction.',
    targetSection: '#achievements',
    position: [2.5, -1.8, -1],
    color: 0xf59e0b, // Amber
  },
];

export const ThreeDSpatialCanvas: React.FC<ThreeDSpatialCanvasProps> = ({
  isImmersiveMode = false,
  onToggleImmersive,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [activePreset, setActivePreset] = useState<'orbit' | 'nodes' | 'cyber'>('orbit');
  const [isControlsCollapsed, setIsControlsCollapsed] = useState(false);

  // Mutable refs for Three.js instances to prevent teardowns during state changes
  const threeState = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    nodeGroups: Map<string, THREE.Group>;
    materials: THREE.Material[];
    targetCameraPos: THREE.Vector3;
    targetLookAt: THREE.Vector3;
    currentLookAt: THREE.Vector3;
    pointer: THREE.Vector2;
    raycaster: THREE.Raycaster;
    interactiveObjects: THREE.Object3D[];
    isSoftwareGl: boolean;
  } | null>(null);

  const initScene = useCallback(() => {
    if (!mountRef.current) return;

    // 1. Detect Software-WebGL guard as specified in threejs skill
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = mountRef.current.clientWidth || window.innerWidth;
    const height = mountRef.current.clientHeight || (isImmersiveMode ? window.innerHeight : 600);

    // 2. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08080b, 0.035);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Clear previous canvas
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    mountRef.current.appendChild(renderer.domElement);

    // 3. Studio Environment Reflections via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Lighting Rig (Warm Key Light + Cool Hemisphere Fill)
    const keyLight = new THREE.DirectionalLight(0xffeedd, 2.4);
    keyLight.position.set(6, 8, 7);
    keyLight.castShadow = !isSoftwareGl;
    scene.add(keyLight);

    const hemiLight = new THREE.HemisphereLight(0x7c3aed, 0x08080b, 1.8);
    scene.add(hemiLight);

    const purplePoint = new THREE.PointLight(0xa855f7, 3, 20);
    purplePoint.position.set(-6, 3, 2);
    scene.add(purplePoint);

    const cyanPoint = new THREE.PointLight(0x06b6d4, 2.5, 20);
    cyanPoint.position.set(6, -3, 2);
    scene.add(cyanPoint);

    // 5. Procedural 3D Particles Galaxy (1,000 Points)
    const particleCount = isSoftwareGl ? 350 : 1000;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorA = new THREE.Color(0xa855f7);
    const colorB = new THREE.Color(0x3b82f6);
    const colorC = new THREE.Color(0xec4899);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const radius = 3 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.8;

      positions[idx] = radius * Math.cos(theta) * Math.cos(phi);
      positions[idx + 1] = radius * Math.sin(phi);
      positions[idx + 2] = radius * Math.sin(theta) * Math.cos(phi) - 2;

      const mixed = (i % 3 === 0) ? colorA : (i % 3 === 1 ? colorB : colorC);
      colors[idx] = mixed.r;
      colors[idx + 1] = mixed.g;
      colors[idx + 2] = mixed.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 6. Interactive 3D Nodes: Composite Procedural 3D Models (THREE.Group)
    const nodeGroups = new Map<string, THREE.Group>();
    const interactiveObjects: THREE.Object3D[] = [];
    const materials: THREE.Material[] = [particleMaterial];

    NODES_DATA.forEach((node) => {
      const group = new THREE.Group();
      group.position.set(...node.position);
      group.userData = { ...node };

      // Core PBR Physical Material with high metallic finish & clearcoat
      const coreMat = new THREE.MeshPhysicalMaterial({
        color: node.color,
        metalness: 0.85,
        roughness: 0.18,
        clearcoat: 0.9,
        clearcoatRoughness: 0.1,
      });
      materials.push(coreMat);

      const wireMat = new THREE.MeshBasicMaterial({
        color: node.color,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      materials.push(wireMat);

      let primaryMesh: THREE.Mesh;
      let secondaryMesh: THREE.Mesh;
      let accentRings: THREE.Group = new THREE.Group();

      if (node.id === 'it-core') {
        // Dodecahedron with inner wireframe octahedron
        primaryMesh = new THREE.Mesh(new THREE.DodecahedronGeometry(0.7, 0), coreMat);
        secondaryMesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.9, 0), wireMat);
      } else if (node.id === 'innova-live') {
        // Torus Knot with satellite ring
        primaryMesh = new THREE.Mesh(new THREE.TorusKnotGeometry(0.5, 0.18, 64, 16), coreMat);
        secondaryMesh = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.02, 16, 64), wireMat);
      } else if (node.id === 'creative-motion') {
        // Icosahedron with outer crystalline ring
        primaryMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(0.72, 0), coreMat);
        secondaryMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(0.95, 1), wireMat);
      } else if (node.id === 'problem-solving') {
        // Triple Gyro Rings
        primaryMesh = new THREE.Mesh(new THREE.SphereGeometry(0.4, 24, 24), coreMat);
        secondaryMesh = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.03, 16, 48), wireMat);
        const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.025, 16, 48), wireMat);
        ring2.rotation.x = Math.PI / 3;
        accentRings.add(ring2);
      } else {
        // Octahedron with orbital ring
        primaryMesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.65, 0), coreMat);
        secondaryMesh = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.02, 16, 48), wireMat);
      }

      primaryMesh.castShadow = !isSoftwareGl;
      primaryMesh.receiveShadow = !isSoftwareGl;
      primaryMesh.userData = { nodeId: node.id };

      group.add(primaryMesh);
      group.add(secondaryMesh);
      group.add(accentRings);

      // Contact grounding glow ring beneath node
      const groundGlowMat = new THREE.MeshBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide,
      });
      materials.push(groundGlowMat);
      const groundRing = new THREE.Mesh(new THREE.RingGeometry(0.4, 0.9, 32), groundGlowMat);
      groundRing.rotation.x = Math.PI / 2;
      groundRing.position.y = -1.1;
      group.add(groundRing);

      scene.add(group);
      nodeGroups.set(node.id, group);
      interactiveObjects.push(primaryMesh);
    });

    // 7. Subtle Perspective Floor Plane
    const gridHelper = new THREE.GridHelper(30, 30, 0x7c3aed, 0x1f1f2e);
    gridHelper.position.y = -3.5;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.35;
    scene.add(gridHelper);

    // State container
    const targetCameraPos = new THREE.Vector3(0, 0, 8.5);
    const targetLookAt = new THREE.Vector3(0, 0, 0);
    const currentLookAt = new THREE.Vector3(0, 0, 0);
    const pointer = new THREE.Vector2(-999, -999);
    const raycaster = new THREE.Raycaster();

    threeState.current = {
      scene,
      camera,
      renderer,
      nodeGroups,
      materials,
      targetCameraPos,
      targetLookAt,
      currentLookAt,
      pointer,
      raycaster,
      interactiveObjects,
      isSoftwareGl,
    };

    // 8. Animation & Render Loop
    let frameId = 0;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const tick = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Rotate background particles
      particles.rotation.y = elapsed * 0.035;
      particles.rotation.x = elapsed * 0.015;

      // Animate composite 3D nodes
      nodeGroups.forEach((group, id) => {
        const primary = group.children[0] as THREE.Mesh;
        const secondary = group.children[1] as THREE.Mesh;
        const accent = group.children[2] as THREE.Group;

        // Distinct rotations per node
        primary.rotation.y += delta * 0.45;
        primary.rotation.x += delta * 0.25;

        secondary.rotation.y -= delta * 0.35;
        secondary.rotation.z += delta * 0.2;

        if (accent) {
          accent.rotation.x += delta * 0.3;
          accent.rotation.y += delta * 0.4;
        }

        // Floating hover oscillation
        const basePos = NODES_DATA.find((n) => n.id === id)?.position || [0, 0, 0];
        group.position.y = basePos[1] + Math.sin(elapsed * 1.8 + basePos[0]) * 0.15;
      });

      // Smooth camera interpolation
      camera.position.lerp(targetCameraPos, delta * 3.0);
      currentLookAt.lerp(targetLookAt, delta * 3.0);
      camera.lookAt(currentLookAt);

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    if (isSoftwareGl) {
      afterDraw(tick);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    // Window Resize Handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth || window.innerWidth;
      const h = mountRef.current.clientHeight || (isImmersiveMode ? window.innerHeight : 600);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);

      // Clean disposal of geometries and materials
      particleGeometry.dispose();
      gridHelper.geometry.dispose();
      materials.forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, [isImmersiveMode]);

  useEffect(() => {
    const cleanup = initScene();
    return () => {
      if (cleanup) cleanup();
    };
  }, [initScene]);

  // Pointer move raycasting for node hover
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!threeState.current || !mountRef.current) return;
    const { camera, raycaster, pointer, interactiveObjects } = threeState.current;

    const rect = mountRef.current.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    // Slight parallax drift based on pointer
    if (activePreset === 'orbit') {
      threeState.current.targetCameraPos.x = pointer.x * 1.2;
      threeState.current.targetCameraPos.y = pointer.y * 0.8;
    }

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(interactiveObjects);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      const nodeId = hit.userData.nodeId;
      const data = NODES_DATA.find((n) => n.id === nodeId);
      if (data) {
        setHoveredNode(data);
      }
    } else {
      setHoveredNode(null);
    }
  };

  // Pointer click for selecting a node and flying camera
  const handlePointerClick = () => {
    if (hoveredNode && threeState.current) {
      setSelectedNode(hoveredNode);
      // Smooth camera transition to inspected node
      threeState.current.targetCameraPos.set(
        hoveredNode.position[0],
        hoveredNode.position[1],
        hoveredNode.position[2] + 2.8
      );
      threeState.current.targetLookAt.set(...hoveredNode.position);
    } else if (threeState.current && selectedNode) {
      // Reset view to overview
      setSelectedNode(null);
      threeState.current.targetCameraPos.set(0, 0, 8.5);
      threeState.current.targetLookAt.set(0, 0, 0);
    }
  };

  // Toggle wireframe mode
  const toggleWireframe = () => {
    setWireframeMode(!wireframeMode);
    if (threeState.current) {
      threeState.current.materials.forEach((mat) => {
        if ('wireframe' in mat) {
          (mat as any).wireframe = !wireframeMode;
        }
      });
    }
  };

  // Camera presets
  const applyPreset = (preset: 'orbit' | 'nodes' | 'cyber') => {
    setActivePreset(preset);
    setSelectedNode(null);
    if (!threeState.current) return;

    if (preset === 'orbit') {
      threeState.current.targetCameraPos.set(0, 0, 8.5);
      threeState.current.targetLookAt.set(0, 0, 0);
    } else if (preset === 'nodes') {
      threeState.current.targetCameraPos.set(0, 2.8, 5.5);
      threeState.current.targetLookAt.set(0, 0.5, -1);
    } else if (preset === 'cyber') {
      threeState.current.targetCameraPos.set(-4.5, 1.2, 2.5);
      threeState.current.targetLookAt.set(-4.5, 1.2, -1);
    }
  };

  return (
    <div 
      className={`relative w-full overflow-hidden transition-all duration-500 ${
        isImmersiveMode 
          ? 'fixed inset-0 z-40 bg-[#08080b]' 
          : 'h-[460px] sm:h-[540px] rounded-3xl border border-purple-500/25 bg-[#08080b]/90 shadow-[0_0_50px_rgba(168,85,247,0.15)] my-12'
      }`}
    >
      {/* 3D WebGL Canvas Mounting Container (Isolated ref as required by Three.js architecture) */}
      <div
        ref={mountRef}
        onPointerMove={handlePointerMove}
        onClick={handlePointerClick}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Top Header Overlay: Minimal Spec Badge */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 pointer-events-none flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-purple-950/70 border border-purple-500/40 text-purple-300 backdrop-blur-md shadow-lg flex items-center gap-2">
          <Orbit className="w-4 h-4 text-purple-400 animate-spin" style={{ animationDuration: '10s' }} />
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-white">
            3D Spatial Universe
          </span>
        </div>
        <span className="hidden sm:inline-block px-2.5 py-1 text-[11px] font-mono text-zinc-400 bg-black/60 border border-zinc-800 rounded-lg backdrop-blur-md">
          Uiverse.io 3D & Three.js Studio Engine
        </span>
      </div>

      {/* Top Right: Fullscreen / Immersive Toggle */}
      {onToggleImmersive && (
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
          <button
            type="button"
            onClick={onToggleImmersive}
            className="p-2.5 rounded-xl bg-[#0e0e16]/80 hover:bg-purple-950/80 border border-purple-500/40 text-purple-200 hover:text-white transition-all backdrop-blur-md shadow-lg flex items-center gap-2 text-xs font-mono"
            aria-label={isImmersiveMode ? 'Exit Immersive 3D Space' : 'Enter Immersive 3D Space'}
          >
            {isImmersiveMode ? (
              <>
                <Minimize2 className="w-4 h-4 text-purple-400" />
                <span className="hidden sm:inline">Exit 3D View</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4 text-purple-400" />
                <span className="hidden sm:inline">Expand 3D Universe</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Interactive Node Hover Tooltip Card */}
      {hoveredNode && !selectedNode && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-all duration-200">
          <div className="px-4 py-2.5 rounded-xl bg-[#0c0c16]/95 border border-purple-500/50 shadow-[0_0_25px_rgba(168,85,247,0.4)] backdrop-blur-md text-center max-w-sm">
            <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400">
              {hoveredNode.category}
            </span>
            <p className="text-sm font-bold text-white tracking-tight">
              {hoveredNode.name}
            </p>
            <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">
              {hoveredNode.description}
            </p>
            <span className="text-[10px] font-mono text-purple-300 mt-1 block">
              Click node to inspect & fly camera
            </span>
          </div>
        </div>
      )}

      {/* Inspected Node Detail Card */}
      {selectedNode && (
        <div className="absolute top-20 right-6 z-30 max-w-sm w-full animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="p-5 rounded-2xl bg-[#0e0e16]/95 border border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.3)] backdrop-blur-md text-left space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/40">
                {selectedNode.category}
              </span>
              <button
                onClick={() => {
                  setSelectedNode(null);
                  if (threeState.current) {
                    threeState.current.targetCameraPos.set(0, 0, 8.5);
                    threeState.current.targetLookAt.set(0, 0, 0);
                  }
                }}
                className="text-xs text-zinc-400 hover:text-white"
              >
                Reset Camera
              </button>
            </div>
            <h4 className="text-base font-bold text-white tracking-tight">
              {selectedNode.name}
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {selectedNode.description}
            </p>
            <div className="pt-2 flex items-center gap-2">
              <a
                href={selectedNode.targetSection}
                className="w-full py-2 px-3 text-center text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors block"
              >
                Go to Section ({selectedNode.targetSection.replace('#', '')})
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Unified Bottom Control Dock (Compliant with Three.js Skill Architecture Directive) */}
      <div 
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-full max-w-2xl px-4 transition-all duration-300 ${
          isControlsCollapsed ? 'translate-y-14' : 'translate-y-0'
        }`}
      >
        <div className="relative">
          {/* Collapse / Expand Toggle Button */}
          <div className="flex justify-center -mb-2">
            <button
              type="button"
              onClick={() => setIsControlsCollapsed(!isControlsCollapsed)}
              className="px-3 py-1 rounded-t-lg bg-[#0e0e16]/90 border-t border-x border-purple-500/30 text-zinc-400 hover:text-purple-300 text-[11px] font-mono flex items-center gap-1 backdrop-blur-md shadow-md"
            >
              {isControlsCollapsed ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" />
                  <span>Show 3D Controls</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" />
                  <span>Collapse</span>
                </>
              )}
            </button>
          </div>

          {/* Dock Controls Body */}
          <div className="p-2.5 sm:p-3 rounded-2xl bg-[#0c0c14]/90 border border-purple-500/30 backdrop-blur-md shadow-2xl flex items-center justify-between gap-3 flex-wrap">
            
            {/* Camera Presets */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-mono text-zinc-400 uppercase mr-1">Views:</span>
              <button
                type="button"
                onClick={() => applyPreset('orbit')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  activePreset === 'orbit'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-zinc-800/80 text-zinc-300 hover:text-white'
                }`}
              >
                Overview
              </button>
              <button
                type="button"
                onClick={() => applyPreset('nodes')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  activePreset === 'nodes'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-zinc-800/80 text-zinc-300 hover:text-white'
                }`}
              >
                Upper Orbit
              </button>
              <button
                type="button"
                onClick={() => applyPreset('cyber')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  activePreset === 'cyber'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-zinc-800/80 text-zinc-300 hover:text-white'
                }`}
              >
                IT Core
              </button>
            </div>

            {/* Wireframe and Node Jump Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleWireframe}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                  wireframeMode
                    ? 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'bg-zinc-800/80 text-zinc-400 hover:text-zinc-200'
                }`}
                title="Toggle Wireframe Shaders"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Wireframe</span>
              </button>

              <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
                Hover & Click Nodes
              </span>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};
