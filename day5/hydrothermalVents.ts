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
// TO REFACTOR - FIND THE SHORTER WAY TO PARSE ARRAY OF STRINGS INTO ARRAY OF NUMBERS:

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

// COMPARE ARRAYS AND REMOVE DIAGONAL LINES (WHERE EITHER X1!=X2 OR Y1!=Y2)
function removeDiagonals() {
    for (let i = 0; i < startInput1.length; ++i) {
        if (
            startInput1[i][0] != endInput1[i][0] &&
            startInput1[i][1] != endInput1[i][1]
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
removeDiagonals();

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

function fillHorizontalVents(row: number, startX: number, endX: number) {
    // swap if start > end:
    if (startX > endX) {
        let temp = startX;
        startX = endX;
        endX = temp;
    }
    for (let i = startX; i <= endX; ++i) {
        underWaterSurface[row][i] += 1;
    }
}
function fillVerticalVents(col: number, startY: number, endY: number) {
    // swap if start > end:
    if (startY > endY) {
        let temp = startY;
        startY = endY;
        endY = temp;
    }
    for (let i = startY; i <= endY; ++i) {
        underWaterSurface[i][col] += 1;
    }
}

function fillUnderWaterSurface() {
    for (let i = 0; i < startInput1.length; ++i) {
        let startY = startInput1[i][1];
        let endY = endInput1[i][1];
        let startX = startInput1[i][0];
        let endX = endInput1[i][0];
        if (startY === endY) {
            fillHorizontalVents(startY, startX, endX);
        } else if (startX === endX) {
            fillVerticalVents(startX, startY, endY);
        }
    }
}
fillUnderWaterSurface();

// TODO: ITERATE THE UNDERWATER SQUARE ARRAY AND CALCULATE HOW MANY ELEMENTS HAVE MORE THAN 2

// const filtered = underWaterSurface.filter((row) => row.filter((el) => el > 1)); // how to filter a nested array???
// const overlapNums = filtered.length;

let overlapNums = 0;
for (let row of underWaterSurface) {
    for (let el of row) {
        if (el > 1) overlapNums++;
    }
}

// console.log("start:", startInput1);
// console.log("end", endInput1);
// console.log("underWaterSurface", underWaterSurface);
// console.log("filtered", filtered);
console.log("overlapNums", overlapNums);
