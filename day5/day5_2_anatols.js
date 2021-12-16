const fs = require("fs");

const input = fs.readFileSync("day5/input1.txt").toString();

const points = input
    .split("\n")
    .map((s) => {
        const m = s.match(/(\d+),(\d+)\s*\->\s*(\d+),(\d+)/);
        return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3]), parseInt(m[4])];
    })
    .reduce((points, [x1, y1, x2, y2]) => {
        const markPoint = (x, y) => {
            const key = `${x},${y}`;
            if (key in points) {
                points[key]++;
            } else {
                points[key] = 1;
            }
        };

        const stepX = x1 < x2 ? 1 : x1 > x2 ? -1 : 0;
        const stepY = y1 < y2 ? 1 : y1 > y2 ? -1 : 0;
        let x = x1;
        let y = y1;
        while (true) {
            markPoint(x, y);
            if (x === x2 && y === y2) {
                break;
            }
            x += stepX;
            y += stepY;
        }
        return points;
    }, {});

console.log(points);

const intersections = Object.values(points).reduce(
    (count, point) => (point > 1 ? count + 1 : count),
    0
);

console.log("Result:", intersections);
