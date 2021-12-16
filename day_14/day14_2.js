import * as fs from "fs";
const inputString = fs.readFileSync("day14/day14_input.txt", "utf-8");
const tempinput = inputString.split("\n\n");
// getting our starting polymer template and the map(object) with inserting rules:
const polymerTemplate = tempinput.slice(0, 1).join(""); // another option is to use shift()
const rulesString = tempinput[1].split("\n");
const rules = {};
rulesString.forEach((str) => {
    const pair = str.split(" -> ");
    rules[pair[0]] = pair[1];
});
// splitting the starting template into the list of pairing characters and pushing it to the map of pairs counts
let combinationsCounter = {};
for (let current = 0; current < polymerTemplate.length - 1; ++current) {
    const firstChar = polymerTemplate[current];
    const secondChar = polymerTemplate[current + 1];
    const key = firstChar + secondChar;
    combinationsCounter[key] = 1;
}
function addCombination(to, combination, count) {
    if (combination in to) {
        to[combination] += count;
    }
    else {
        to[combination] = count;
    }
}
console.log(combinationsCounter);
// filling the combinationsCounter: calculating how many times the combination has appeared
for (let i = 1; i <= 40; ++i) {
    let temp = {};
    // console.log(combinationsCounter);
    for (let combination of Object.keys(combinationsCounter)) {
        if (!(combination in rules)) {
            console.log(combination, "!");
            addCombination(temp, combination, combinationsCounter[combination]);
            // temp[combination] = combinationsCounter[combination];
        }
        else {
            const [firstChar, secondChar] = combination;
            const newFirstCombination = firstChar + rules[combination];
            const newSecondCombination = rules[combination] + secondChar;
            console.log(combination, "->", newFirstCombination, newSecondCombination);
            addCombination(temp, newFirstCombination, combinationsCounter[combination]);
            addCombination(temp, newSecondCombination, combinationsCounter[combination]);
            // const newCombinations = [newFirstCombination, newSecondCombination];
            // newCombinations.forEach((el) => {
            //     if (el in combinationsCounter) {
            //         temp[el] = 1 + combinationsCounter[el];
            //     } else temp[el] = 1;
            // });
        }
        console.log(temp);
    }
    combinationsCounter = temp;
    console.log(combinationsCounter);
}
// console.log(rules);
let uniqueCharsNumber = {};
for (const [combination, value] of Object.entries(combinationsCounter)) {
    const key = combination[0];
    if (key in uniqueCharsNumber) {
        uniqueCharsNumber[key] += value;
    }
    else {
        uniqueCharsNumber[key] = value;
    }
}
// adding the last character:
const lastChar = polymerTemplate[polymerTemplate.length - 1];
if (lastChar in uniqueCharsNumber) {
    uniqueCharsNumber[lastChar] += 1;
}
else {
    uniqueCharsNumber[lastChar] = 1;
}
console.log(uniqueCharsNumber);
const sorted = Object.values(uniqueCharsNumber).sort((a, b) => a - b);
console.log(sorted);
const result = sorted[sorted.length - 1] - sorted[0];
console.log(result);
