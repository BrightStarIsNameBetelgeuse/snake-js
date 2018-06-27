import DomGame from 'js/game';
import CanvasGame from 'js/canvas';
import 'normalize.css';
import '@/styles/snake.css';

let animationFrameId;

window.onload = () => {
    DomGame.initialize();
    const appContainer = document.getElementsByClassName('app-container')[0];

    dom.addEventListener('click', function() {
        if (!appContainer.classList.contains('dom')) {
            CanvasGame.reset();
            appContainer.classList.remove('canvas');
            appContainer.classList.add('dom');
            DomGame.initialize();
        }
    });
    
    canvas.addEventListener('click', function() {
        if (!appContainer.classList.contains('canvas')) {
            DomGame.reset();
            appContainer.classList.remove('dom');
            appContainer.classList.add('canvas');
            CanvasGame.initialize();
        }
    });
};