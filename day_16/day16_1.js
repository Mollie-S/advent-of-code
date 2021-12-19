import * as fs from "fs";
const decodingStr = fs.readFileSync("input/day16_decoder_input.txt", "utf-8");
// parsing decoding string and creating an object of characters and their binary values
const stringDecoder = decodingStr
    .split("\n")
    .map((line) => line.split(" = "))
    .reduce((stringDecoder, [key, value]) => {
    stringDecoder[key] = value;
    return stringDecoder;
}, {});
// console.log(stringDecoder);
const input = fs.readFileSync("input/day16_input.txt", "utf-8");
function decodeInputString() {
    let packet = "";
    for (let char of input) {
        if (stringDecoder.hasOwnProperty(char)) {
            packet += stringDecoder[char];
        }
    }
    return packet;
}
// console.log(input);
const packet = decodeInputString();
function readNumBits(startIndex, num, inputStr) {
    const substr = inputStr.substring(startIndex, num);
    const remainingStr = inputStr.substring(num);
    return [substr, remainingStr];
}
function parsePacketHeader(packetStr) {
    const [header, headlessPacket] = readNumBits(0, 6, packetStr);
    const [packetVersion, typeId] = readNumBits(0, 3, header).map((el) => parseInt(el, 2));
    // console.log("version", packetVersion, "typeId", typeId);
    return [packetVersion, typeId, headlessPacket];
}
function parsePacketCode(typeId, packetStr) {
    let headerLessBitsNum;
    if (typeId === 4) {
        headerLessBitsNum = parseLiteralValue(packetStr);
    }
    else {
        headerLessBitsNum = parseOperatorPacket(packetStr);
    }
    return headerLessBitsNum;
}
function parseLiteralValue(packetStr) {
    const lastGroupLabel = "0";
    let lastGroup = false;
    let literalValue = "";
    let literalValLength = 0;
    while (!lastGroup) {
        literalValue += packetStr.substring(1, 5);
        literalValLength += 5;
        if (packetStr.charAt(0) === lastGroupLabel)
            lastGroup = true;
        packetStr = packetStr.substring(5);
    }
    // console.log("literalValue", literalValue, parseInt(literalValue, 2));
    return literalValLength;
}
function parseOperatorPacket(packetStr) {
    let packetSize = 0;
    const lengthTypeId = packetStr.charAt(0);
    if (lengthTypeId === "0") {
        let lengthInBits = parseInt(packetStr.substring(1, 16), 2);
        packetStr = packetStr.substring(16);
        packetSize = 1 + 15 + lengthInBits;
        while (lengthInBits > 0) {
            let bitsRead = parsePacket(packetStr);
            lengthInBits -= bitsRead;
            packetStr = packetStr.substring(bitsRead);
        }
    }
    else {
        let subPacketsNum = parseInt(packetStr.substring(1, 12), 2); //skipping the first bit and then counting 11 bits
        packetStr = packetStr.substring(12); // skipping bits needed to read the type and number of packages
        let remainingLength = packetStr.length;
        packetSize = 1 + 11;
        while (subPacketsNum > 0) {
            let numBits = parsePacket(packetStr);
            packetSize += numBits;
            subPacketsNum--;
            packetStr = packetStr.substring(numBits);
        }
    }
    return packetSize;
}
let sum = 0;
function parsePacket(packetStr) {
    const [version, typeId, headlessPacket] = parsePacketHeader(packetStr);
    if (!headlessPacket.includes("1")) {
        return 0;
    }
    sum += version;
    let bitsRead = parsePacketCode(typeId, headlessPacket) + 6;
    return bitsRead;
}
const bitsRead = parsePacket(packet);
// console.log("bitsRead", bitsRead);
console.log("sum", sum);
