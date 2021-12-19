import * as fs from "fs";

const text: string = fs.readFileSync("input/day18_input.txt", "utf-8");

let [stringX, stringY]: string[][] = text
    .split(", ")
    .map((substr) => substr.slice(substr.indexOf("=") + 1))
    .map((coord) => coord.split(".."));
