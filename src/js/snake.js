import {
    equalPoints,
    mod,
    getRandomPositionAtField,
    deepEqualObjects,
}
    from './utils';
import * as constants from './constants';

const initialState = (columns, rows) => ({
    columns,
    rows,
    foodPosition: {
        x: 5,
        y: 10,
    },
    snake: [{ x: 1, y: 1 }],
    moves: [constants.EAST],
    moving: false,
    crash: false,
});

const isValidMove = (state, move) => state.moves[0].x + move.x !== 0 || state.moves[0].y + move.y !== 0;

const enqueueMove = (state, move) => !deepEqualObjects(state.moves[state.moves.length - 1], move) && (state.snake.length === 1 || isValidMove(state, move)) ? Object.assign({}, state, {
    moves: state.moves.concat([move]),
}) : state;

const getNextHead = state => ({
    x: mod(state.columns, state.snake[0].x + state.moves[0].x),
    y: mod(state.rows, state.snake[0].y + state.moves[0].y),
});

const isSnakeWillCrash = state => state.snake.find(el => equalPoints(getNextHead(state), el));
const snakeWillEat = state => equalPoints(getNextHead(state), state.foodPosition);

const getNextSnakeBody = state => {
    const { snake } = state;
    if (isSnakeWillCrash(state)) {
        state.moving = false;
        state.crash = true;
        return initialState(state.columns, state.rows).snake;
    }
    if (snakeWillEat(state)) {
        return [getNextHead(state)].concat(snake);
    }
    return [getNextHead(state)].concat(snake.slice(0, snake.length - 1));
};

const getNextFoodPosition = state => snakeWillEat(state) ? getRandomPositionAtField(state) : state.foodPosition;
const getNextSnake = state => getNextSnakeBody(state);
const getNextMoves = state => state.moves.length > 1 ? state.moves.slice(1, state.moves.length) : state.moves;

const getNextState = state => Object.assign({}, state, {
    foodPosition: getNextFoodPosition(state),
    snake: getNextSnake(state),
    moves: getNextMoves(state),
});

export default { initialState, getNextState, enqueueMove };

