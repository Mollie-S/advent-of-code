import * as fs from "fs";

let text: string = fs.readFileSync("day3/input.txt", "utf8");

const myArray = text.trim().split("\n");

const len = myArray[0].length;
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

let filteredArray = myArray;
for (let i = 0; i < len; ++i) {
    let zeroesCounter: number = 0;
    let onesCounter: number = 0;
    filteredArray.forEach((elem) => {
        if (elem[i] === "0") {
            zeroesCounter++;
        } else {
            onesCounter++;
        }
    });
    if (onesCounter >= zeroesCounter) {
        filteredArray = filteredArray.filter((a) => a[i] === "1");
    } else {
        filteredArray = filteredArray.filter((a) => a[i] === "0");
    }
    // console.log("zero:", zeroesCounter);
    // console.log("zero:", onesCounter);
    // console.log(filteredArray);
}

let filteredArray1 = myArray;
for (let i = 0; i < len; ++i) {
    if (filteredArray1.length < 2) {
        break;
    }
    let zeroesCounter: number = 0;
    let onesCounter: number = 0;
    filteredArray1.forEach((elem) => {
        if (elem[i] === "0") {
            zeroesCounter++;
        } else {
            onesCounter++;
        }
    });
    if (zeroesCounter <= onesCounter) {
        filteredArray1 = filteredArray1.filter((a) => a[i] === "0");
    } else {
        filteredArray1 = filteredArray1.filter((a) => a[i] === "1");
    }
    // console.log("zero:", zeroesCounter);
    // console.log("one:", onesCounter);
    // console.log(filteredArray1);
}
// console.log(filteredArray);
// console.log(filteredArray1);
const oxygenGeneratorRating = parseInt(filteredArray[0], 2);
const CO2ScrubberRating = parseInt(filteredArray1[0], 2);
console.log(oxygenGeneratorRating);
console.log(CO2ScrubberRating);
const finalAnswer: number = oxygenGeneratorRating * CO2ScrubberRating;

console.log(finalAnswer);
