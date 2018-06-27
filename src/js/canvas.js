import SnakeState from './snake';
import { GAME_FIELD_CELL_SIZE, 
    ARROW_LEFT_KEY, 
    ARROW_DOWN_KEY, 
    ARROW_RIGHT_KEY, 
    ARROW_UP_KEY, SOUTH, WEST, EAST, NORTH } from './constants';

const gameField = window['canvas-field'];
const context = gameField.getContext('2d');
const columns = 30;
const rows = 18;
let state = SnakeState.initialState(columns, rows);
let score;

const getSnakeBlock = ({ x, y }) => {
    const snakeElem = document.createElement('div');
    snakeElem.className = 'snake-block';
    snakeElem.style.width = getStyleSize();
    snakeElem.style.height = getStyleSize();
    snakeElem.style.left = getStylePosition(x);
    snakeElem.style.top = getStylePosition(y);
    return snakeElem;
};

const draw = () => {
    // draw snake
    const snakeCollection = document.getElementsByClassName('snake-block');
    if (state.crash) {
        reset();
        document.getElementsByClassName('gameover-block')[0].classList.add('shown');
    } else {
        // draw snake
        context.fillStyle = '#444';
        context.fillRect(0, 0, gameField.width, gameField.height);
        console.log(state.snake)
        for (let i = 0; i < state.snake.length; i++) {
            context.fillStyle = '#f5f5dc';
            context.fillRect(state.snake[i].x * GAME_FIELD_CELL_SIZE, state.snake[i].y * GAME_FIELD_CELL_SIZE, GAME_FIELD_CELL_SIZE, GAME_FIELD_CELL_SIZE);
        }
        // redraw food
        context.fillStyle = '#ffff00';
        context.fillRect(state.foodPosition.x * GAME_FIELD_CELL_SIZE, state.foodPosition.y * GAME_FIELD_CELL_SIZE, GAME_FIELD_CELL_SIZE, GAME_FIELD_CELL_SIZE);
        window.score.textContent = score;
    }
};

const drawLoop = startTime => nextTime => {
    if (state.moving && nextTime - startTime > 300) {
        // change state
        state = SnakeState.getNextState(state);
        draw();
        window.requestAnimationFrame(drawLoop(nextTime));
    } else {
        window.requestAnimationFrame(drawLoop(startTime));
    }
};

const mapKeyToMove = key => {
    switch (key) {
        case ARROW_LEFT_KEY: {
            return WEST;
        }
        case ARROW_UP_KEY: {
            return NORTH;
        }
        case ARROW_RIGHT_KEY: {
            return EAST;
        }
        case ARROW_DOWN_KEY: {
            return SOUTH;
        }
    }
};
let animationFrameId;
function keyEventListener(event) {
    const keyCode = event.keyCode;
    if (keyCode >= ARROW_LEFT_KEY && keyCode <= ARROW_DOWN_KEY) {
        state = SnakeState.enqueueMove(state, mapKeyToMove(keyCode));
        if (!state.moving) {
            state.moving = true;
            animationFrameId = animationFrameId || window.requestAnimationFrame(drawLoop(0));
        }
    }
}

function initialize() {
    score = 0;
    document.getElementsByClassName('gameover-block')[0].classList.remove('shown');

    gameField.width = state.columns * GAME_FIELD_CELL_SIZE;
    gameField.height = state.rows * GAME_FIELD_CELL_SIZE;
    draw();
}

function reset() {
    animationFrameId = 0;
    state = SnakeState.initialState(columns, rows);
    window.result.textContent = score;
    window.removeEventListener('keydown', keyEventListener);
}

window.addEventListener('keydown', keyEventListener);

export default { initialize, reset };
