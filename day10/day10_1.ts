import * as fs from "fs";

const inputString: string = fs.readFileSync("day10/day10_input.txt", "utf-8");

const input: string[][] = inputString.split("\n").map((str) => str.split(""));

// .map((s) => s.split("").map(Number));

let symbolsPairs: string[][] = [
    ["(", ")"],
    ["[", "]"],
    ["{", "}"],
    ["<", ">"],
];

const closingValues: { [index: string]: number } = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
};

// console.log(input);
let total = 0;
const openingSymbols: string = "([{<";
const closingSymbols: string = ")]}>";
for (let i = 0; i < input.length; ++i) {
    let openingControlChars: string[] = [];
    let topElement: number = openingControlChars.length - 1;
    let closingChar: string = "";
    let incorrectclosingBracketFound: boolean = false;
    for (let j = 0; j < input[i].length; ++j) {
        if (openingSymbols.includes(input[i][j])) {
            openingControlChars.push(input[i][j]);
            topElement++;
            console.log(openingControlChars);
        } else {
            closingChar = input[i][j];
            for (let k = 0; k < symbolsPairs.length; ++k) {
                if (symbolsPairs[k][0] === openingControlChars[topElement]) {
                    {
                        if (symbolsPairs[k][1] === closingChar) {
                            openingControlChars.pop();
                            topElement--;
                        } else {
                            total += closingValues[closingChar];
                            incorrectclosingBracketFound = true;
                        }
                        break;
                    }
                }
            }
        }
        if (incorrectclosingBracketFound) break;
    }
    // if (i === 0) break;
}

console.log(total);
