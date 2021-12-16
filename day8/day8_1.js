"use strict";
exports.__esModule = true;
var fs = require("fs");
var str = fs.readFileSync("day8/day8_input.txt", "utf-8");
var input1 = str.split("\n").map(function (s) { return s.split("|"); });
// const input: string[][] = str.split("\n").map((s) => {
// });
// console.log(input1);
var input = input1.map(function (el) {
    return el[1].split(" ");
});
console.log(input);
// let counter: number[] = Array(4).fill(0);
var one = 0;
var four = 0;
var seven = 0;
var eight = 0;
for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
    var str_2 = input_1[_i];
    for (var _a = 0, str_1 = str_2; _a < str_1.length; _a++) {
        var word = str_1[_a];
        if (word.length === 2)
            one++;
        else if (word.length === 4)
            four++;
        else if (word.length === 3)
            seven++;
        else if (word.length === 7)
            eight++;
    }
}
var result = one + four + seven + eight;
console.log(result);
