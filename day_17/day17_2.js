import * as fs from "fs";
const text = fs.readFileSync("input/day17_testinput_arr.txt", "utf-8");
let arr = text.split("\n").map((el) => el.split(" "));
console.log(arr);
