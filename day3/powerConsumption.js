"use strict";
exports.__esModule = true;
var fs = require("fs");
var text = fs.readFileSync("day3/input.txt", "utf8");
var myArray = text.trim().split("\n");
var len = myArray[0].length;
// let gammaRate: string = "";
// let epsilonRate: string = "";
// for (let i = 0; i < len; ++i) {
//     let zeroesCounter: number = 0;
//     let onesCounter: number = 0;
//     myArray.forEach((elem) => {
//         if (elem[i] === "0") {
//             zeroesCounter++;
//         } else {
//             onesCounter++;
//         }
//     });
//     // console.log(zeroesCounter);
//     // console.log(onesCounter);
//     if (zeroesCounter > onesCounter) {
//         gammaRate += "0";
//         epsilonRate += "1";
//     } else {
//         gammaRate += "1";
//         epsilonRate += "0";
//     }
// }
//
// const gammaDecimal: number = parseInt(gammaRate, 2);
// const epsilonDecimal: number = parseInt(epsilonRate, 2);
//
// const finalAnswer: number = gammaDecimal * epsilonDecimal;
// console.log(gammaRate);
// console.log(gammaDecimal);
// console.log(epsilonRate);
var filteredArray = myArray;
var _loop_1 = function (i) {
    var zeroesCounter = 0;
    var onesCounter = 0;
    filteredArray.forEach(function (elem) {
        if (elem[i] === "0") {
            zeroesCounter++;
        }
        else {
            onesCounter++;
        }
    });
    if (onesCounter >= zeroesCounter) {
        filteredArray = filteredArray.filter(function (a) { return a[i] === "1"; });
    }
    else {
        filteredArray = filteredArray.filter(function (a) { return a[i] === "0"; });
    }
};
for (var i = 0; i < len; ++i) {
    _loop_1(i);
}
var filteredArray1 = myArray;
var _loop_2 = function (i) {
    if (filteredArray1.length < 2) {
        return "break";
    }
    var zeroesCounter = 0;
    var onesCounter = 0;
    filteredArray1.forEach(function (elem) {
        if (elem[i] === "0") {
            zeroesCounter++;
        }
        else {
            onesCounter++;
        }
    });
    if (zeroesCounter <= onesCounter) {
        filteredArray1 = filteredArray1.filter(function (a) { return a[i] === "0"; });
    }
    else {
        filteredArray1 = filteredArray1.filter(function (a) { return a[i] === "1"; });
    }
};
for (var i = 0; i < len; ++i) {
    var state_1 = _loop_2(i);
    if (state_1 === "break")
        break;
}
// console.log(filteredArray);
// console.log(filteredArray1);
var oxygenGeneratorRating = parseInt(filteredArray[0], 2);
var CO2ScrubberRating = parseInt(filteredArray1[0], 2);
console.log(oxygenGeneratorRating);
console.log(CO2ScrubberRating);
var finalAnswer = oxygenGeneratorRating * CO2ScrubberRating;
console.log(finalAnswer);
