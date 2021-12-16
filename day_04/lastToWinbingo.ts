import * as fs from "fs";
import { abort } from "process";

let text: string = fs.readFileSync("day4/input.txt", "utf8");

// splitting text into an array of data strings
const myArray = text
    .trim()
    .split("\n\n")
    .map((part) => part.split("\n"));

// SEparating input data:
let input = myArray.shift()!;
const input1: string[] = input[0].split(",");

//splitting the strings with numbers inside array of boards into separate strings:
let bingoArray = myArray.map((part) =>
    part.map((el) => el.split(" ").filter((el) => el !== ""))
);

// utils checking if the column or the row were filled:
let isRowFilled = (board: string[][], row: number): boolean => {
    return board[row].every((num) => num === "x");
};

let isColumnFilled = (board: string[][], col: number): boolean => {
    return board.every((line) => line[col] === "x");
};

// calculating the sum of unfilled numbers:
let calcSumofUnfilledNumbers = (board: string[][]): number => {
    let sum: number = 0;
    board.forEach((row) => {
        for (let numb of row) {
            if (numb != "x") {
                sum += parseInt(numb, 10);
            }
        }
    });
    return sum;
};

let hasBoardWon = (board: string[][], num: string): boolean => {
    for (let row = 0; row < board.length; ++row) {
        for (let el = 0; el < board[row].length; ++el) {
            if (board[row][el] === num) {
                board[row][el] = "x";
            }
            if (isColumnFilled(board, el) || isRowFilled(board, row)) {
                return true;
            }
        }
    }
    return false;
};

let lastBoardSum: number;
let lastNum: number;

for (let num of input1) {
    for (let board = 0; board < bingoArray.length; ++board) {
        if (hasBoardWon(bingoArray[board], num)) {
            lastBoardSum = calcSumofUnfilledNumbers(bingoArray[board]);
            bingoArray[board].length = 0;
            lastNum = parseInt(num, 10);
        }
    }
}

const finalResult = lastBoardSum * lastNum;

console.log(bingoArray[0]);
console.log("last num", lastNum);

console.log("sum", lastBoardSum);
console.log("final", finalResult);
