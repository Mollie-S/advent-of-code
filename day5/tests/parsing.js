"use strict";
exports.__esModule = true;
var fs = require("fs");
var input = fs.readFileSync("day5/input1.txt", "utf-8");
var coordinates = input.split("\n").map(function (str) {
    var obj = str.match(/(\d+),(\d+)\s*\->\s*(\d+),(\d)/);
    var coordinatesArray = [
        parseInt(obj[1]),
        parseInt(obj[2]),
        parseInt(obj[3]),
        parseInt(obj[4]),
    ];
    console.log(coordinatesArray);
    return coordinatesArray;
});
