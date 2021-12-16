import * as fs from "fs";

const str: string = fs.readFileSync("day8/day8_input.txt", "utf-8");

const input1: string[][] = str.split("\n").map((s) => s.split("|"));
let input: string[][] = input1.map((el) => {
    el[0] = el[0].trim();
    el[1] = el[1].trim();
    return el;
});

const signalPatterns: string[][] = input.map((el) => el[0].split(" "));
const digitOutput: string[][] = input.map((el) => el[1].split(" "));

let outputArray: number[] = [];

for (let i = 0; i < signalPatterns.length; ++i) {
    let symbols: string[] = new Array(7).fill("x");
    let digits: string[] = new Array(10);
    let zero: string = "x";
    let one: string = "x";
    let two: string = "x";
    let three: string = "x";
    let four: string = "x";
    let five: string = "x";
    let six: string = "x";
    let seven: string = "x";
    let eight: string = "x";
    let nine: string = "x";
    for (let digit of signalPatterns[i]) {
        if (digit.length === 2) {
            one = digit;
            digits[1] = digit;
        } else if (digit.length === 3) {
            seven = digit;
            digits[7] = digit;
        } else if (digit.length === 4) {
            four = digit;
            digits[4] = digit;
        } else if (digit.length === 7) {
            eight = digit;
            digits[8] = digit;
        }
    }

    // defining 0, 6 and 9
    let sixLinedDigit: string[] = signalPatterns[i].filter(
        (digit) => digit.length === 6
    );

    let absent: string[] = new Array(3);

    for (let char of eight) {
        if (!sixLinedDigit[0].includes(char)) absent[0] = char;
        if (!sixLinedDigit[1].includes(char)) absent[1] = char;
        if (!sixLinedDigit[2].includes(char)) absent[2] = char;
    }

    absent.forEach((el) => {
        // to define 0:
        if (!one.includes(el) && !seven.includes(el) && four.includes(el)) {
            symbols[3] = el;
            zero = eight.replace(el, "");
            digits[0] = zero;
        } else if (
            one.includes(el) &&
            seven.includes(el) &&
            four.includes(el)
        ) {
            // to define 6:
            symbols[2] = el;
            six = eight.replace(el, "");
            digits[6] = six;
            if (one[0] === el) symbols[5] = one[1];
            else symbols[5] = one[0];
        } else {
            // to define 9:
            symbols[4] = el;
            nine = eight.replace(el, "");
            digits[9] = nine;
        }
    });

    for (let char of seven) {
        if (char !== symbols[2] && char != symbols[5]) {
            symbols[0] = char;
            break;
        }
    }
    for (let symbol of four) {
        if (!symbols.includes(symbol)) symbols[1] = symbol;
    }
    for (let symbol of eight) {
        if (!symbols.includes(symbol)) symbols[6] = symbol;
    }

    two = symbols[0] + symbols[2] + symbols[3] + symbols[4] + symbols[6];
    digits[2] = two;
    three = symbols[0] + symbols[2] + symbols[3] + symbols[5] + symbols[6];
    digits[3] = three;
    five = symbols[0] + symbols[1] + symbols[3] + symbols[5] + symbols[6];
    digits[5] = five;

    console.log("symbols", symbols);

    console.log(
        "| 0:",
        zero,
        "1:",
        one,
        "| 2:",
        two,
        "| 3:",
        three,
        "| 4:",
        four,
        "| 5:",
        five,
        "| 6:",
        six,
        "| 7:",
        seven,
        "| 8:",
        eight,
        "| 9:",
        nine
    );

    console.log("digitOutput -  ", i, digitOutput[i]);
    // console.log("signalPatterns -  ", i, signalPatterns[i]);

    let numb: string = "";
    digitOutput[i].forEach((output) => {
        let index = -1;
        for (let j = 0; j < digits.length; ++j) {
            console.log("digit:", digits[j], "index", j);
            let doesIncludeAll: boolean = false;
            if (output.length === digits[j].length) {
                for (let symbol of digits[j]) {
                    if (output.includes(symbol)) {
                        doesIncludeAll = true;
                    } else {
                        doesIncludeAll = false;
                        break;
                    }
                }
            }
            if (doesIncludeAll) {
                index = j;
                break;
            }
        }
        numb += index.toString();
    });
    console.log("numb: ", numb);

    outputArray.push(parseInt(numb, 10));
}
console.log(outputArray);

const sum = outputArray.reduce((prev, next) => prev + next, 0);
console.log(sum);
