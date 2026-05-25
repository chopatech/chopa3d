import { GUI } from 'lil-gui';
import * as THREE from 'three';

export class PropertiesPanel {
    private gui: GUI;
    private container: HTMLElement;
    private currentFolder: any = null;

    constructor(containerId: string) {
        this.container = document.getElementById(containerId) as HTMLElement;
        
        // Initialize the control panel inside our specific properties sidebar div
        this.gui = new GUI({
            container: this.container,
            title: 'Transform Component'
        });
        
        this.clearPanel();
    }

    public inspectObject(mesh: THREE.Mesh | null) {
        this.clearPanel();

        if (!mesh) return;

        // Create UI bindings for Position
        const posFolder = this.gui.addFolder('Position');
        posFolder.add(mesh.position, 'x').min(-10).max(10).step(0.01).name('Location X');
        posFolder.add(mesh.position, 'y').min(0).max(10).step(0.01).name('Location Y');
        posFolder.add(mesh.position, 'z').min(-10).max(10).step(0.01).name('Location Z');

        // Create UI bindings for Scale
        const scaleFolder = this.gui.addFolder('Scale');
        scaleFolder.add(mesh.scale, 'x').min(0.1).max(5).step(0.1).name('Scale X');
        scaleFolder.add(mesh.scale, 'y').min(0.1).max(5).step(0.1).name('Scale Y');
        scaleFolder.add(mesh.scale, 'z').min(0.1).max(5).step(0.1).name('Scale Z');
        
        // Open folders by default
        posFolder.open();
        scaleFolder.open();
    }

    private clearPanel() {
        // Destroy existing controls to refresh cleanly when switching objects
        const folders = [...this.gui.folders];
        folders.forEach(f => f.destroy());
        
        // Simple display info when nothing is active
        this.gui.title = 'No Object Selected';
    }
}