"use strict";
exports.__esModule = true;
var fs = require("fs");
var str = fs.readFileSync("day7/input1.txt", "utf-8");
var crabPositions = str.split(",").map(function (el) { return parseInt(el, 10); });
var largestPosition = crabPositions.reduce(function (prev, next) { return (next > prev ? next : prev); }, 0);
var positionsList = Array(largestPosition + 1).fill(0);
for (var i = 0; i < positionsList.length; ++i) {
    for (var _i = 0, crabPositions_1 = crabPositions; _i < crabPositions_1.length; _i++) {
        var crab = crabPositions_1[_i];
        if (crab === i) {
            positionsList[i]++;
        }
    }
}
function calcFuel(steps) {
    var fuel = 0;
    if (steps > 0) {
        fuel += calcFuel(steps - 1);
        console.log(fuel);
    }
    return fuel;
}
var densityMap = [];
for (var i = 0; i < positionsList.length; ++i) {
    var fuel = 0;
    var totalFuel = 0;
    var steps = 0;
    for (var j = 0; j < positionsList.length; ++j) {
        if (positionsList[j] != 0) {
            steps = Math.abs(j - i);
            fuel = calcFuel(steps);
            totalFuel += fuel * positionsList[j];
        }
        // console.log(
        //     ": ",
        //     i,
        //     " | ",
        //     j,
        //     "steps: ",
        //     steps,
        //     "| fuel:",
        //     fuel,
        //     "| totalFuel: ",
        //     totalFuel
        // );
    }
    densityMap.push(totalFuel);
    // if (i === 6) break;
}
var lowestFuel = densityMap.reduce(function (prev, next) {
    return prev < next ? prev : next;
});
// console.log(positionsList);
// console.log(densityMap);
console.log(lowestFuel);
