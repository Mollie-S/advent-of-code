"use strict";
exports.__esModule = true;
var fs = require("fs");
var text = fs.readFileSync("day5/input.txt", "utf8");
// splitting text into 2 arrays of inputs:
var myArray = text.trim().split("\n");
var startInput = [];
var endInput = [];
myArray.forEach(function (string) {
    var searchValue = " -> ";
    var searchValueResult = string.indexOf(searchValue);
    if (searchValueResult != -1) {
        var startCoordinates = string.slice(0, searchValueResult).trim();
        startInput.push(startCoordinates);
        var endCoordinates = string.slice(searchValueResult + 3).trim();
        endInput.push(endCoordinates);
    }
});
//------------// utils:
// GETTING 2 INPUT ARRAYS
// TO REFACTOR - FIND THE SHORTER WAY TO PARSE ARRAY OF STRINGS INTO ARRAY OF NUMBERS:
var startInput1 = startInput.map(function (str) {
    var pair = str.split(",");
    var numPair;
    for (var el in pair) {
        var num1 = parseInt(pair[0], 10);
        var num2 = parseInt(pair[1], 10);
        numPair = [num1, num2];
    }
    return numPair;
});
var endInput1 = endInput.map(function (str) {
    var pair = str.split(",");
    var numPair;
    for (var el in pair) {
        var num1 = parseInt(pair[0], 10);
        var num2 = parseInt(pair[1], 10);
        numPair = [num1, num2];
    }
    return numPair;
});
//----------------
// COMPARE ARRAYS AND FIND
// HORIZONTAL (Y1 == Y2), VERTICAL (X1 == X2)
//AND DIAGONAL LINES(ENDX - STARTX ==  ENDY - STARTY)
function removeNon45Diagonals() {
    for (var i = 0; i < startInput1.length; ++i) {
        // swapCoordinates(1, i, 0);
        // swapCoordinates(0, i, 1);
        var startX = startInput1[i][0];
        var endX = endInput1[i][0];
        var startY = startInput1[i][1];
        var endY = endInput1[i][1];
        if (
            startX != endX &&
            startY != endY &&
            endX - startX !== endY - startY &&
            endX - startX !== -(endY - startY)
        ) {
            startInput1[i].length = 0;
            endInput1[i].length = 0;
        }
    }
    var filteredStartInput = startInput1.filter(function (el) {
        return el.length != 0;
    });
    var filteredEndInput = endInput1.filter(function (el) {
        return el.length != 0;
    });
    startInput1 = filteredStartInput;
    endInput1 = filteredEndInput;
}
removeNon45Diagonals();
//FIND THE HIGHEST X AND HIGHEST Y AND CREATE AN UNDERWATER SQUARE ARRAY FILLED WITH 0
var highestX = 0;
var highestY = 0;
function findHighestCoordinates() {
    startInput1.forEach(function (pair) {
        if (pair[0] > highestX) {
            highestX = pair[0];
        }
        if (pair[1] > highestY) {
            highestY = pair[1];
        }
    });
    endInput1.forEach(function (pair) {
        if (pair[0] > highestX) {
            highestX = pair[0];
        }
        if (pair[1] > highestY) {
            highestY = pair[1];
        }
    });
}
findHighestCoordinates();
var underWaterSurface = Array(highestY + 1)
    .fill(0)
    .map(function () {
        return Array(highestX + 1).fill(0);
    });
// ITERATE INPUT ARRAYS (0 index in input == 1 index in underwater array!! and vv)
//AND FILL THE UNDERWATER SQUARE ARRAY(INCREMENT THE VALUE  BY 1)
function fillHorizontalVents(row, startX, endX, step) {
    for (var i = startX; i != endX; i += step) {
        underWaterSurface[row][i] += 1;
    }
}
function fillVerticalVents(col, startY, endY, step) {
    for (var i = startY; i != endY; i += step) {
        underWaterSurface[i][col] += 1;
    }
}
function fillDiagonalVents(startX, endX, startY, endY, stepX, stepY) {
    for (
        var _a = [startY, startX], y = _a[0], x = _a[1];
        y != endY && x != endX;
        y += stepY, x += stepX
    ) {
        underWaterSurface[y][x] += 1;
    }
    underWaterSurface[endY][endX] += 1;
}
function fillUnderWaterSurface() {
    for (var i = 0; i < startInput1.length; ++i) {
        var startY = startInput1[i][1];
        var endY = endInput1[i][1];
        var startX = startInput1[i][0];
        var endX = endInput1[i][0];
        var stepX = 1;
        var stepY = 1;
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
// const filtered = underWaterSurface.filter((row) => row.filter((el) => el > 1)); // how to filter a nested array???
// const overlapNums = filtered.length;
var overlapNums = 0;
for (
    var _i = 0, underWaterSurface_1 = underWaterSurface;
    _i < underWaterSurface_1.length;
    _i++
) {
    var row = underWaterSurface_1[_i];
    for (var _a = 0, row_1 = row; _a < row_1.length; _a++) {
        var el = row_1[_a];
        if (el > 1) overlapNums++;
    }
}
// console.log("start:", startInput1);
// console.log("end", endInput1);
// console.log("underWaterSurface", underWaterSurface);
// console.log("filtered", filtered);
console.log("overlapNums", overlapNums);
