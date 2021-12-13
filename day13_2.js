var fs = require("fs");
var text = fs.readFileSync("./input.txt").toString('utf-8');

let [dotsString, inputString] =  text.split("\n\n").map(str => str.split("\n"));

let dots = dotsString.map(coordinate => coordinate.split(",").map(el => parseInt(el, 10)));
let instructions = []
inputString.forEach(str => {
    let equalsSignIndex = str.indexOf("=");
    instructions.push([str.charAt(equalsSignIndex - 1), parseInt(str.substring(equalsSignIndex + 1),10)])
    // another option - to do it with regex:
    // let m = str.match(/(\w)\W(\d+)$/);
    // instructions1.push([m[1],parseInt(m[2], 10)])
});

    
instructions.forEach(foldingInstruction => {

    let foldingAxis;
    if (foldingInstruction[0] === "x") foldingAxis = 0;
    else foldingAxis = 1;
    const foldingLineNumber = foldingInstruction[1];

    dots = dots.filter((coordinate,idx) => {
        if(coordinate[foldingAxis] > foldingLineNumber){
            const newCoord = foldingLineNumber - (coordinate[foldingAxis] - foldingLineNumber);
            coordinate[foldingAxis] = newCoord;
        }
        const [x,y]  = [coordinate[0], coordinate[1]];

        let stupidCount = 0;
        for (let i = 0; i < idx; ++i){
            if (dots[i][0]=== x && dots[i][1]=== y){
                stupidCount += 1;
                break;
            } else stupidCount += 0;
        }
        if (stupidCount === 0)
        return [x,y]
    })
})


let xSize = 0;
let ySize = 0;

dots.forEach(dot => {
    if (dot[0] > xSize) xSize = dot[0];
    if (dot[1] > ySize) ySize = dot[1];
})
xSize++;
ySize++;
// console.log(xSize);
// console.log(ySize);

let matrix = Array(ySize).fill(" ").map(y => Array(xSize).fill(" "))

for (let y = 0; y < matrix.length; ++y){
    for (let x = 0; x < matrix[y].length; ++x ){
        dots.forEach(dot => {
            if (x === dot[0] && y === dot[1]){
                matrix[y][x] = "$";
            }
        })
    }
}
    
// console.log(dots);
// console.log(dots.length);

// console.log(matrix);
let stringMatrix = matrix.map(y => { 
    let str = y.join("");
    return str
})
stringMatrix.forEach(y => console.log(y))
