import * as fs from "fs";

let input = fs.readFileSync("day5/input1.txt", "utf-8");

let coordinates: number[][] = input.split("\n").map((str) => {
    const obj = str.match(/(\d+),(\d+)\s*\->\s*(\d+),(\d)/);
    let coordinatesArray = [
        parseInt(obj[1]),
        parseInt(obj[2]),
        parseInt(obj[3]),
        parseInt(obj[4]),
    ];
    console.log(coordinatesArray);

    return coordinatesArray;
});
