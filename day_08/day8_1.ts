import * as fs from "fs";

const str: string = fs.readFileSync("day8/day8_input.txt", "utf-8");

const input1: string[][] = str.split("\n").map((s) => s.split("|"));

let input = input1.map((el) => {
    return el[1].split(" ");
});
console.log(input);

let one = 0;
let four = 0;
let seven = 0;
let eight = 0;
for (let str of input) {
    for (let word of str) {
        if (word.length === 2) one++;
        else if (word.length === 4) four++;
        else if (word.length === 3) seven++;
        else if (word.length === 7) eight++;
    }
}

const result = one + four + seven + eight;

console.log(result);
