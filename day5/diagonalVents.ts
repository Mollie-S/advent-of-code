import * as fs from "fs";

let text: string = fs.readFileSync("day5/input.txt", "utf8");

// splitting text into 2 arrays of inputs:
const myArray: string[] = text.trim().split("\n");
let startInput: string[] = [];
let endInput: string[] = [];

myArray.forEach((string) => {
    const searchValue = " -> ";
    let searchValueResult = string.indexOf(searchValue);

    if (searchValueResult != -1) {
        let startCoordinates = string.slice(0, searchValueResult).trim();
        startInput.push(startCoordinates);
        let endCoordinates = string.slice(searchValueResult + 3).trim();
        endInput.push(endCoordinates);
    }
});

//------------// utils:
// GETTING 2 INPUT ARRAYS
// TO REFACTOR - FIND THE SHORTER WAY TO PARSE ARRAY OF STRINGS INTO ARRAY OF NUMBERS: (view tests/parser)

let startInput1: number[][] = startInput.map((str) => {
    let pair: string[] = str.split(",");
    let numPair: number[];
    for (let el in pair) {
        const num1 = parseInt(pair[0], 10);
        const num2 = parseInt(pair[1], 10);
        numPair = [num1, num2];
    }
    return numPair;
});

let endInput1: number[][] = endInput.map((str) => {
    let pair: string[] = str.split(",");
    let numPair: number[];
    for (let el in pair) {
        const num1 = parseInt(pair[0], 10);
        const num2 = parseInt(pair[1], 10);
        numPair = [num1, num2];
    }
    return numPair;
});

//----------------
// COMPARE ARRAYS AND FIND
// HORIZONTAL (Y1 == Y2), VERTICAL (X1 == X2)
//AND DIAGONAL LINES(ENDX - STARTX ==  ENDY - STARTY)
function removeNon45Diagonals() {
    for (let i = 0; i < startInput1.length; ++i) {
        let startX = startInput1[i][0];
        let endX = endInput1[i][0];
        let startY = startInput1[i][1];
        let endY = endInput1[i][1];
        if (
            startX != endX &&
            startY != endY &&
            Math.abs(endX - startX) !== Math.abs(endY - startY)
        ) {
            startInput1[i].length = 0;
            endInput1[i].length = 0;
        }
    }
    let filteredStartInput = startInput1.filter((el) => el.length != 0);
    let filteredEndInput = endInput1.filter((el) => el.length != 0);
    startInput1 = filteredStartInput;
    endInput1 = filteredEndInput;
}
removeNon45Diagonals();

//FIND THE HIGHEST X AND HIGHEST Y AND CREATE AN UNDERWATER SQUARE ARRAY FILLED WITH 0
let highestX: number = 0;
let highestY: number = 0;
function findHighestCoordinates() {
    startInput1.forEach((pair) => {
        if (pair[0] > highestX) {
            highestX = pair[0];
        }
        if (pair[1] > highestY) {
            highestY = pair[1];
        }
    });
    endInput1.forEach((pair) => {
        if (pair[0] > highestX) {
            highestX = pair[0];
        }
        if (pair[1] > highestY) {
            highestY = pair[1];
        }
    });
}
findHighestCoordinates();

let underWaterSurface = Array(highestY + 1)
    .fill(0)
    .map(() => Array(highestX + 1).fill(0));

// ITERATE INPUT ARRAYS (0 index in input == 1 index in underwater array!! and vv)
//AND FILL THE UNDERWATER SQUARE ARRAY(INCREMENT THE VALUE  BY 1)

function fillHorizontalVents(
    row: number,
    startX: number,
    endX: number,
    step: number
) {
    for (let i = startX; i != endX; i += step) {
        underWaterSurface[row][i] += 1;
    }
}
function fillVerticalVents(
    col: number,
    startY: number,
    endY: number,
    step: number
) {
    for (let i = startY; i != endY; i += step) {
        underWaterSurface[i][col] += 1;
    }
}
function fillDiagonalVents(
    startX: number,
    endX: number,
    startY: number,
    endY: number,
    stepX: number,
    stepY: number
) {
    for (
        let [y, x] = [startY, startX];
        y != endY && x != endX;
        y += stepY, x += stepX
    ) {
        underWaterSurface[y][x] += 1;
    }
    underWaterSurface[endY][endX] += 1;
}

function fillUnderWaterSurface() {
    for (let i = 0; i < startInput1.length; ++i) {
        let startY = startInput1[i][1];
        let endY = endInput1[i][1];
        let startX = startInput1[i][0];
        let endX = endInput1[i][0];
        let stepX: number = 1;
        let stepY: number = 1;
        if (startX > endX) stepX = -1;
        if (startY > endY) stepY = -1;
        if (startY === endY) {
            fillHorizontalVents(startY, startX, endX, stepX);
        } else if (startX === endX) {
            fillVerticalVents(startX, startY, endY, stepY);
        }
        fillDiagonalVents(startX, endX, startY, endY, stepX, stepY);
    }
}
fillUnderWaterSurface();

// ITERATE THE UNDERWATER SQUARE ARRAY AND CALCULATE HOW MANY ELEMENTS HAVE MORE THAN 2

let overlapNums = 0;
for (let row of underWaterSurface) {
    for (let el of row) {
        if (el > 1) overlapNums++;
    }
}

// console.log("start:", startInput1);
// console.log("end", endInput1);
// console.log("underWaterSurface", underWaterSurface);
console.log("overlapNums", overlapNums);
