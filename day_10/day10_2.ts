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
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
};

// console.log(input);

let scores: number[] = [];

const openingSymbols: string = "([{<";
const closingSymbols: string = ")]}>";
for (let i = 0; i < input.length; ++i) {
    let total = 0;
    let openingControlChars: string[] = [];
    let topElement: number = openingControlChars.length - 1;
    let closingChar: string = "";
    let incompleteLine: boolean = true;
    for (let j = 0; j < input[i].length; ++j) {
        if (openingSymbols.includes(input[i][j])) {
            openingControlChars.push(input[i][j]);
            topElement++;
        } else {
            closingChar = input[i][j];
            for (let k = 0; k < symbolsPairs.length; ++k) {
                if (symbolsPairs[k][0] === openingControlChars[topElement]) {
                    {
                        if (symbolsPairs[k][1] === closingChar) {
                            openingControlChars.pop();
                            topElement--;
                        } else {
                            // total += closingValues[closingChar];
                            incompleteLine = false;
                        }
                        break;
                    }
                }
            }
        }
        if (!incompleteLine) break;
    }
    if (incompleteLine) {
        console.log(openingControlChars);

        while (topElement >= 0)
            for (let k = 0; k < symbolsPairs.length; ++k) {
                if (symbolsPairs[k][0] === openingControlChars[topElement]) {
                    {
                        console.log("value", closingValues[symbolsPairs[k][1]]);

                        total = total * 5 + closingValues[symbolsPairs[k][1]];
                        openingControlChars.pop();
                        topElement--;
                        break;
                    }
                }
            }
        scores.push(total);
    }
}

const sorted: number[] = scores.sort((a, b) => a - b);

const middleIndex: number = sorted.length / 2 - 0.5;

const middleScore = sorted[middleIndex];
console.log(middleScore);
