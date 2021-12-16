"use strict";
exports.__esModule = true;
var fs = require("fs");
var text = fs.readFileSync("day4/input.txt", "utf8");
// splitting text into an array of data strings
var myArray = text
    .trim()
    .split("\n\n")
    .map(function (part) { return part.split("\n"); });
// SEparating input data:
var input = myArray.shift();
var input1 = input[0].split(",");
//splitting the strings with numbers inside array of boards into separate strings:
var bingoArray = myArray.map(function (part) {
    return part.map(function (el) { return el.split(" ").filter(function (el) { return el !== ""; }); });
});
// utils checking if the column or the row were filled:
var isRowFilled = function (board, row) {
    return board[row].every(function (num) { return num === "x"; });
};
var isColumnFilled = function (board, col) {
    return board.every(function (line) { return line[col] === "x"; });
};
// calculating the sum of unfilled numbers:
var calcSumofUnfilledNumbers = function (board) {
    var sum = 0;
    board.forEach(function (row) {
        for (var _i = 0, row_1 = row; _i < row_1.length; _i++) {
            var numb = row_1[_i];
            if (numb != "x") {
                sum += parseInt(numb, 10);
            }
        }
    });
    return sum;
};
var hasBoardWon = function (board, num) {
    for (var row = 0; row < board.length; ++row) {
        for (var el = 0; el < board[row].length; ++el) {
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
var lastBoardWon = false;
var lastBoardSum;
var lastNum;
// while (!lastBoardWon) {
for (var _i = 0, input1_1 = input1; _i < input1_1.length; _i++) {
    var num = input1_1[_i];
    for (var board = 0; board < bingoArray.length; ++board) {
        if (hasBoardWon(bingoArray[board], num)) {
            lastBoardSum = calcSumofUnfilledNumbers(bingoArray[board]);
            bingoArray[board].length = 0;
            lastNum = parseInt(num, 10);
        }
    }
}
// }
var finalResult = lastBoardSum * lastNum;
console.log(bingoArray[0]);
console.log("last num", lastNum);
console.log("sum", lastBoardSum);
console.log("final", finalResult);
