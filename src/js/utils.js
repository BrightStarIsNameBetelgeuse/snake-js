const getRandom = (min, max) => Math.floor(Math.random() * max) + min;
const equalPoints = (p1, p2) => p1.x === p2.x && p1.y === p2.y;
const mod = (n, m) => (m % n + n) % n;
const getRandomPositionAtField = ({ columns, rows }) => ({
    x: getRandom(0, columns - 1),
    y: getRandom(0, rows - 1),
});
const deepEqualObjects = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);

export {
    getRandom,
    equalPoints,
    mod,
    getRandomPositionAtField,
    deepEqualObjects,
};

