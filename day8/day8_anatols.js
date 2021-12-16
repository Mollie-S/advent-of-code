const fs = require("fs");

const inputs = fs.readFileSync("day8_input.txt").toString().split("\n");

const total = inputs.reduce((total, input) => {
  const [signals_string, values_string] = input
    .toString()
    .split("|")
    .map((s) => s.trim());

  const signals = signals_string.split(" ").map((s) => s.split("").sort().join(""));
  const values = values_string.split(" ").map((s) => s.split("").sort().join(""));

  const sl2 = signals.filter((s) => s.length === 2);
  const sl3 = signals.filter((s) => s.length === 3);
  const sl4 = signals.filter((s) => s.length === 4);
  const sl5 = signals.filter((s) => s.length === 5);
  const sl6 = signals.filter((s) => s.length === 6);
  const sl7 = signals.filter((s) => s.length === 7);

  function sample_contains(sample, needle) {
    const needle_array = needle.split("");
    return needle_array.every((c) => sample.includes(c));
  }

  function pop_one_that_contains(haystack, needle) {
    for (let i = 0; i < haystack.length; i++) {
      if (sample_contains(haystack[i], needle)) {
        return haystack.splice(i, 1)[0];
      }
    }
    console.log("Shouldn't end up here");
  }

  const w1 = sl2[0];
  const w4 = sl4[0];
  const w7 = sl3[0];
  const w8 = sl7[0];

  const w9 = pop_one_that_contains(sl6, w4); // 4 contained in 9. 0 and 6 remain in sl6
  const w0 = pop_one_that_contains(sl6, w1); // 1 contained in 0. 6 remains in sl6
  const w6 = sl6[0];

  const w3 = pop_one_that_contains(sl5, w1); // 1 contained in 3. 2 and 5 remain in sl5
  let w2;
  let w5;
  if (sample_contains(w6, sl5[0])) {
    // 5 contained in 6
    w5 = sl5[0];
    w2 = sl5[1];
  } else {
    w5 = sl5[1];
    w2 = sl5[0];
  }

  const wiring = {};
  wiring[w0] = "0";
  wiring[w1] = "1";
  wiring[w2] = "2";
  wiring[w3] = "3";
  wiring[w4] = "4";
  wiring[w5] = "5";
  wiring[w6] = "6";
  wiring[w7] = "7";
  wiring[w8] = "8";
  wiring[w9] = "9";

  // console.log(signals);
  // console.log(sl2, sl3, sl4, sl5, sl6, sl7);
  // console.log(wiring);
  // console.log(values);

  const value = parseInt(values.map((v) => wiring[v]).join(""));
  console.log(value);
  return total + value;
}, 0);

console.log("Solution: ", total);