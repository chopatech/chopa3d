import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Viewport {
    public scene!: THREE.Scene;
    public camera!: THREE.PerspectiveCamera;
    public renderer!: THREE.WebGLRenderer;
    private controls!: OrbitControls;
    private container: HTMLElement;

    constructor(containerId: string) {
        this.container = document.getElementById(containerId) as HTMLElement;
        this.initThree();
        this.addEnvironment();
    }

    private initThree() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x242424); // Dark neutral view canvas

        this.camera = new THREE.PerspectiveCamera(60, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
        this.camera.position.set(4, 4, 6);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        
        this.container.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;

        window.addEventListener('resize', () => this.resize());
    }

    private addEnvironment() {
        // Blender grid floor
        const grid = new THREE.GridHelper(20, 20, 0x4f4f4f, 0x353535);
        grid.position.y = -0.01; // Slightly below 0 to avoid z-fighting
        this.scene.add(grid);

        // Standard 3-point studio lighting
        const ambient = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambient);

        const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
        mainLight.position.set(5, 10, 7);
        mainLight.castShadow = true;
        this.scene.add(mainLight);

        const fillLight = new THREE.DirectionalLight(0x90b0ff, 0.3); // Soft blue bounce light
        fillLight.position.set(-5, 3, -5);
        this.scene.add(fillLight);
    }

    public resize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    public update() {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}