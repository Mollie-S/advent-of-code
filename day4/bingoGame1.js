"use strict";
exports.__esModule = true;
var fs = require("fs");
var process_1 = require("process");
var text = fs.readFileSync("day4/input.txt", "utf8");
var myArray = text
    .trim()
    .split("\n\n")
    .map(function (part) { return part.split("\n"); });
var input = myArray.shift(); // removing the first part into a separate array
var input1 = input[0].split(",");
var bingoArray = myArray.map(function (part) { return part.map(function (el) { return el.split(","); }); });
for (var i = 0; i < bingoArray.length; ++i) {
    for (var j = 0; j < bingoArray[i].length; ++j) {
        bingoArray[i][j] = bingoArray[i][j][0].split(" ");
        for (var k = 0; k < bingoArray[i][j].length; ++k) {
            if (bingoArray[i][j][k] === "") {
                bingoArray[i][j].splice(k, 1);
            }
        }
    }
}
// console.log(bingoArray);
var savedCopy = Array.from(bingoArray);
var dup_array = JSON.parse(JSON.stringify(bingoArray)); // A way to create a deep copy of a nested array
var winningBoardNum;
var winningLineNum;
var lastNum;
var breakCheck = false;
input1.forEach(function (num) {
    if (breakCheck)
        process_1.abort;
    for (var i = 0; i < bingoArray.length; ++i) {
        if (breakCheck)
            break;
        for (var j = 0; j < bingoArray[i].length; ++j) {
            for (var k = 0; k < bingoArray[i][j].length; ++k) {
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
var sum = 0;
for (var i = 0; i < bingoArray[winningBoardNum].length; ++i) {
    for (var j = 0; j < bingoArray[winningBoardNum][i].length; ++j) {
        sum += parseInt(bingoArray[winningBoardNum][i][j], 10);
    }
}
var finalResult = sum * lastNum;
// console.log("input:", input1);
// console.log("copy", savedCopy[winningBoardNum][winningLineNum]); // shallow copy so also empty
// console.log("dup_array", dup_array[winningBoardNum][winningLineNum]);
// console.log(bingoArray[winningBoardNum][winningLineNum]);
// console.log(winningBoardNum);
// console.log(winningLineNum);
// console.log("last num", lastNum);
console.log("sum", sum);
console.log("final", finalResult);
