import * as fs from "fs";
import { nextTick } from "process";

const inputString: string = fs.readFileSync("day9/day9_input.txt", "utf-8");

const highlevelMap: number[][] = inputString
    .split("\n")
    .map((s) => s.split("").map(Number)); // //TIL:  <- map((el) => parseInt(el, 10) replaced by Number to parse chars into numbers

// console.log(highlevelMap);
