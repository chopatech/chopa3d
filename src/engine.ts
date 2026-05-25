import { Viewport } from './Viewport';
import * as THREE from 'three';

export class Engine {
    public viewport: Viewport;
    private activeMeshes: THREE.Mesh[] = [];

    constructor() {
        this.viewport = new Viewport('viewport-container');
        this.startLoop();
    }

    public spawnPrimitive(type: 'cube' | 'sphere') {
        let geometry: THREE.BufferGeometry;

        if (type === 'cube') {
            geometry = new THREE.BoxGeometry(1, 1, 1);
        } else {
            geometry = new THREE.SphereGeometry(0.6, 32, 32);
        }

        const material = new THREE.MeshStandardMaterial({
            color: 0x3b82f6, // Bright blue workspace mesh
            roughness: 0.3,
            metalness: 0.1
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = type === 'cube' ? 0.5 : 0.6; // Sit perfectly on floor
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        this.viewport.scene.add(mesh);
        this.activeMeshes.push(mesh);
    }

    private startLoop() {
        const tick = () => {
            // Keep rendering viewport changes
            this.viewport.update();

            // Loop infinitely
            requestAnimationFrame(tick);
        };
        tick();
    }
}