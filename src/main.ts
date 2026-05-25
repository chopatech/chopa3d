import { Engine } from './Engine';

// Boot up the 3D application core
const App = new Engine();

// Bind UI actions to our geometric primitive generation
document.getElementById('add-cube')?.addEventListener('click', () => {
    App.spawnPrimitive('cube');
});

document.getElementById('add-sphere')?.addEventListener('click', () => {
    App.spawnPrimitive('sphere');
});