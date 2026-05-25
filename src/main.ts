import { Engine } from './Engine';
import { PropertiesPanel } from './UI';

// 1. Initialize Engine Core
const App = new Engine();

// 2. Initialize Properties Layout Panel
const Inspector = new PropertiesPanel('gui-container');

// 3. Connect Engine events to UI updates
App.onSelectionChanged((selectedMesh) => {
    Inspector.inspectObject(selectedMesh);
});

// 4. Bind Add Buttons
document.getElementById('add-cube')?.addEventListener('click', () => {
    App.spawnPrimitive('cube');
});

document.getElementById('add-sphere')?.addEventListener('click', () => {
    App.spawnPrimitive('sphere');
});