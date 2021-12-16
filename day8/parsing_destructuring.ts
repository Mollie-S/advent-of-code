import * as fs from "fs";

const inputString: string = fs.readFileSync("day8/day8_input1.txt", "utf-8");

const inputs: string[] = inputString.split("\n");

console.log(inputs);
inputs.map((input) => {
    const [signalPatters, digitOutputs] = input.split("|").map((s) => s.trim());

    // console.log(signalPatters, "||");
    console.log(digitOutputs, "||");
    const digitOutput = digitOutputs
        .split(" ")
        .map((s) => s.split("").sort().join(""));
    console.log(digitOutput, "--");
});
