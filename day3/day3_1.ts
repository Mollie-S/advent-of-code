import * as fs from "fs";

let text: string = fs.readFileSync("day3/input.txt", "utf8");

const myArray = text.trim().split("\n");

const len = myArray[0].length;
let gammaRate: string = "";
let epsilonRate: string = "";
for (let i = 0; i < len; ++i) {
    let zeroesCounter: number = 0;
    let onesCounter: number = 0;
    myArray.forEach((elem) => {
        if (elem[i] === "0") {
            zeroesCounter++;
        } else {
            onesCounter++;
        }
    });
    // console.log(zeroesCounter);
    // console.log(onesCounter);
    if (zeroesCounter > onesCounter) {
        gammaRate += "0";
        epsilonRate += "1";
    } else {
        gammaRate += "1";
        epsilonRate += "0";
    }
}

const gammaDecimal: number = parseInt(gammaRate, 2);
const epsilonDecimal: number = parseInt(epsilonRate, 2);

const finalAnswer: number = gammaDecimal * epsilonDecimal;
console.log(gammaRate);
console.log(gammaDecimal);
console.log(epsilonRate);
