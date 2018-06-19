import SnakeState from './snake';
import * as constants from './constants';
import 'normalize.css';
import '@/styles/snake.css';

const gameField = window['game-field'];
const columns = 30;
const rows = 18;
let state = SnakeState.initialState(columns, rows);
let score;

const getStylePosition = coord => `${coord * constants.GAME_FIELD_CELL_SIZE}px`;
const getStyleSize = () => `${constants.GAME_FIELD_CELL_SIZE}px`;

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
        gameOver();
    } else {
        if (snakeCollection.length < state.snake.length) {
            gameField.insertBefore(getSnakeBlock(state.snake[0]), snakeCollection[0]);
            // redraw food
            const foodBlock = document.getElementsByClassName('food-block')[0];
            foodBlock.style.left = getStylePosition(state.foodPosition.x);
            foodBlock.style.top = getStylePosition(state.foodPosition.y);
            score += state.moving;
        } else if (snakeCollection.length === 1) {
            // just change coords
            snakeCollection[0].style.left = getStylePosition(state.snake[0].x);
            snakeCollection[0].style.top = getStylePosition(state.snake[0].y);
        } else {
            // swap head and tail
            const snakeTail = gameField.removeChild(snakeCollection[snakeCollection.length - 1]);
            snakeTail.style.left = getStylePosition(state.snake[0].x);
            snakeTail.style.top = getStylePosition(state.snake[0].y);
            gameField.insertBefore(snakeTail, snakeCollection[0]);
        }
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
        case constants.ARROW_LEFT_KEY: {
            return constants.WEST;
        }
        case constants.ARROW_UP_KEY: {
            return constants.NORTH;
        }
        case constants.ARROW_RIGHT_KEY: {
            return constants.EAST;
        }
        case constants.ARROW_DOWN_KEY: {
            return constants.SOUTH;
        }
    }
};
let animationFrameId;
function keyEventistener(event) {
    const keyCode = event.keyCode;
    if (keyCode >= constants.ARROW_LEFT_KEY && keyCode <= constants.ARROW_DOWN_KEY) {
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
    gameField.style.width = getStylePosition(state.columns);
    gameField.style.height = getStylePosition(state.rows);

    const foodBlock = document.getElementsByClassName('food-block')[0];
    foodBlock.style.width = getStyleSize();
    foodBlock.style.height = getStyleSize();
    foodBlock.style.left = getStylePosition(state.foodPosition.x);
    foodBlock.style.top = getStylePosition(state.foodPosition.y);
    draw();
}

function gameOver() {
    state = SnakeState.initialState(columns, rows);
    [].slice.call(gameField.getElementsByClassName('snake-block')).forEach(el => {
        gameField.removeChild(el);
    });
    window.result.textContent = score;
    document.getElementsByClassName('gameover-block')[0].classList.add('shown');
}

window.addEventListener('keydown', keyEventistener, 300);
window.restart.addEventListener('click', initialize);

export default { initialize };
