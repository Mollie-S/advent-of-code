import * as fs from "fs";
import { abort } from "process";

let text: string = fs.readFileSync("day4/input.txt", "utf8");

const myArray = text
    .trim()
    .split("\n\n")
    .map((part) => part.split("\n"));

let input = myArray.shift(); // removing the first part into a separate array
const input1 = input[0].split(",");
let bingoArray = myArray.map((part) => part.map((el) => el.split(",")));

for (let i = 0; i < bingoArray.length; ++i) {
    for (let j = 0; j < bingoArray[i].length; ++j) {
        bingoArray[i][j] = bingoArray[i][j][0].split(" ");
        for (let k = 0; k < bingoArray[i][j].length; ++k) {
            if (bingoArray[i][j][k] === "") {
                bingoArray[i][j].splice(k, 1);
            }
        }
    }
}
// console.log(bingoArray);
let savedCopy = Array.from(bingoArray);
var dup_array = JSON.parse(JSON.stringify(bingoArray)); // A way to create a deep copy of a nested array
let winningBoardNum;
var winningLineNum;
var lastNum;
var breakCheck = false;
input1.forEach((num) => {
    if (breakCheck) abort;
    for (let i = 0; i < bingoArray.length; ++i) {
        if (breakCheck) break;
        for (let j = 0; j < bingoArray[i].length; ++j) {
            for (let k = 0; k < bingoArray[i][j].length; ++k) {
                if (bingoArray[i][j][k] === num) {
                    // console.log("line:", bingoArray[i][j]);
                    // console.log("num to splice: ", num);
                    // console.log("num found:", bingoArray[i][j][k], "\n");
                    lastNum = num;
                    bingoArray[i][j].splice(k, 1);
                    if (bingoArray[i][j].length === 0) {
                        // console.log("line empty!!!", bingoArray[i][j]);
                        // console.log("num to splice: ", num, "\n");

                        // console.log(i);
                        // console.log(j);
                        winningBoardNum = i;
                        winningLineNum = j;
                        breakCheck = true;
                        break;
                    }
                    break;
                }
            }
        }
    }
});

let sum = 0;
for (let i = 0; i < bingoArray[winningBoardNum].length; ++i) {
    for (let j = 0; j < bingoArray[winningBoardNum][i].length; ++j) {
        sum += parseInt(bingoArray[winningBoardNum][i][j], 10);
    }
}

const finalResult = sum * lastNum;

// console.log("input:", input1);
// console.log("copy", savedCopy[winningBoardNum][winningLineNum]); // shallow copy so also empty
// console.log("dup_array", dup_array[winningBoardNum][winningLineNum]);
// console.log(bingoArray[winningBoardNum][winningLineNum]);
// console.log(winningBoardNum);
// console.log(winningLineNum);
// console.log("last num", lastNum);
console.log("sum", sum);
console.log("final", finalResult);
