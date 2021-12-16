import * as fs from "fs";

const inputString: string = fs.readFileSync("input/day14_input.txt", "utf-8");

let [polymerTemplateString, rulesString] = inputString
    .split("\n\n")
    .map((str) => str.split("\n"));

const polymerTemplate: string[] = polymerTemplateString[0].split("");

// console.log(polymerTemplate);

// using regex to parse the input:
const rules: string[][] = rulesString.map((str) => {
    const m = str.match(/(\w+)\s*\->\s(\w)$/);
    if (m !== null) return [m[1], m[2]];
});

let polymer = [...polymerTemplate];

for (let i = 1; i <= 2; ++i) {
    let temp: string[] = [];
    for (let j = 0; j < polymer.length - 1; ++j) {
        const first = polymer[j];
        const second = polymer[j + 1];
        const lastIndex = polymer.length - 1;
        const last = polymer[lastIndex];
        temp.push(first);
        for (let rule of rules) {
            if (first + second === rule[0]) {
                temp.push(rule[1]);
                if (j + 1 === lastIndex) temp.push(last);
                break;
            }
        }
    }
    polymer = [...temp];
}

let charsMap = new Map<string, number>();

polymer.forEach((char: string) => {
    let count: number = 0;
    if (!charsMap.has(char)) {
        let count = polymer.reduce(
            (total, el) => (el === char ? (total += 1) : total),
            0
        );
        charsMap.set(char, count);
    }
});

let polymerCharsNumber: number[] = [...charsMap.values()];
// console.log(polymerCharsNumber);

const sorted = polymerCharsNumber.sort((a, b) => a - b);

console.log(sorted);

const result: number = sorted[sorted.length - 1] - sorted[0];
console.log(result);
