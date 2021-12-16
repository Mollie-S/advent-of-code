const fs = require("fs");

const input = fs.readFileSync("day7/input1.txt").toString();

const positions = input.split(",").map((x) => parseInt(x));

positions.sort((a, b) => a - b); // important sort

let x = positions[0]; // current position

let crab_index = 0; // index of crab at current position

// fuel needed to move all crabs left of current position to current positions
let fuel_left = 0;

// fuel needed to move all crabs right of current position to current positions
let fuel_right = positions.reduce((acc, p) => acc + (p - positions[0]), 0);

let fuel_needed = fuel_right;
console.log(positions);

while (true) {
    while (positions[crab_index] == x && crab_index < positions.length) {
        crab_index++;
    }
    if (crab_index >= positions.length) {
        break;
    }

    // crab index here also means 'how many crabs are on the left',
    // for each crab on the left we burn 1 fuel on each increment of x.
    // note that the value is never decreasing.
    fuel_left += crab_index;

    // similarly for crabs on the right we burn less fuel on each increment of x
    // note tha the value is never increasing.
    fuel_right -= positions.length - crab_index;

    const new_fuel_needed = fuel_left + fuel_right;

    console.log("x", x);
    console.log("crab", crab_index);
    console.log(
        "fuel l, r, l+r, nfn",
        fuel_left,
        fuel_right,
        fuel_left + fuel_right,
        new_fuel_needed
    );

    // since the fuel on the left is always increasing, and the fuel on the right
    // is decreasing, there will be a natural minimum in their sum. so we can stop
    // if fuel requirement goes up - we're past the minimum at that point, so don't
    // increase x.
    if (new_fuel_needed > fuel_needed) {
        break;
    }
    x++;
    fuel_needed = new_fuel_needed;
}

console.log("Solution: ", fuel_needed);
