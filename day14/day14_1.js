import * as fs from "fs";
const inputString = fs.readFileSync("day14/day14_input1.txt", "utf-8");
let [polymerTemplateString, rulesString] = inputString
    .split("\n\n")
    .map((str) => str.split("\n"));
const polymerTemplate = polymerTemplateString[0].split("");
// console.log(polymerTemplate);
const rules = rulesString.map((str) => {
    const m = str.match(/(\w+)\s*\->\s(\w)$/);
    if (m !== null)
        return [m[1], m[2]];
});
let polymer = [...polymerTemplate];
for (let i = 1; i <= 2; ++i) {
    let temp = [];
    for (let j = 0; j < polymer.length - 1; ++j) {
        const first = polymer[j];
        const second = polymer[j + 1];
        const lastIndex = polymer.length - 1;
        const last = polymer[lastIndex];
        temp.push(first);
        for (let rule of rules) {
            if (first + second === rule[0]) {
                temp.push(rule[1]);
                if (j + 1 === lastIndex)
                    temp.push(last);
                break;
            }
        }
    }
    polymer = [...temp];
}
let charsMap = new Map();
polymer.forEach((char) => {
    let count = 0;
    if (!charsMap.has(char)) {
        let count = polymer.reduce((total, el) => (el === char ? (total += 1) : total), 0);
        charsMap.set(char, count);
    }
});
let polymerCharsNumber = [...charsMap.values()];
// console.log(polymerCharsNumber);
const sorted = polymerCharsNumber.sort((a, b) => a - b);
console.log(sorted);
const result = sorted[sorted.length - 1] - sorted[0];
console.log(result);
