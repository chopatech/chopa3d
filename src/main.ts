import { Engine } from './Engine';
import { PropertiesPanel } from './UI';

// Wait until the browser layout engine completes its passes
window.addEventListener('load', () => {
    const App = new Engine();
    const Inspector = new PropertiesPanel('gui-container');

    App.onSelectionChanged((selectedMesh) => {
        Inspector.inspectObject(selectedMesh);
    });

    document.getElementById('add-cube')?.addEventListener('click', () => {
        App.spawnPrimitive('cube');
    });

    document.getElementById('add-sphere')?.addEventListener('click', () => {
        App.spawnPrimitive('sphere');
    });
    
    // Explicitly command a viewport size calculation recalculation pass
    setTimeout(() => {
        App.viewport.resize();
    }, 100);
});