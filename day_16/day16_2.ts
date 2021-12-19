import * as fs from "fs";

import { Packet } from "./day16_PacketClass";

const decodingStr: string = fs.readFileSync(
    "input/day16_decoder_input.txt",
    "utf-8"
);

// parsing decoding string and creating an object of characters and their binary values
const stringDecoder: { [key: string]: string } = decodingStr
    .split("\n")
    .map((line) => line.split(" = "))
    .reduce((stringDecoder: { [key: string]: string }, [key, value]) => {
        stringDecoder[key] = value;
        return stringDecoder;
    }, {});
// console.log(stringDecoder);

const input: string = fs.readFileSync("input/day16_input.txt", "utf-8");

function decodeInputString(): string {
    let packet: string = "";
    for (let char of input) {
        if (stringDecoder.hasOwnProperty(char)) {
            packet += stringDecoder[char];
        }
    }
    return packet;
}
// console.log(input);

const packet: string = decodeInputString();

function readNumBits(
    startIndex: number,
    num: number,
    inputStr: string
): string[] {
    const substr: string = inputStr.substring(startIndex, num);
    const remainingStr: string = inputStr.substring(num);
    return [substr, remainingStr];
}

function parsePacketHeader(packetStr: string): [number, number, string] {
    const [header, headlessPacket] = readNumBits(0, 6, packetStr);
    const [packetVersion, typeId] = readNumBits(0, 3, header).map((el) =>
        parseInt(el, 2)
    );
    return [packetVersion, typeId, headlessPacket];
}

function parsePacketCodeDependingOnTypeId(
    typeId: number,
    packetStr: string
): number[] {
    let headerLessBitsNum: number;
    let value: number;
    if (typeId === 4) {
        [headerLessBitsNum, value] = parseLiteralValue(packetStr);
    } else {
        [headerLessBitsNum, value] = parseOperatorPacket(packetStr, typeId);
    }
    // console.log(value);

    return [headerLessBitsNum, value];
}

function parseLiteralValue(packetStr: string): number[] {
    const lastGroupLabel: string = "0";
    let lastGroup = false;
    let literalValue: string = "";
    let literalValLength: number = 0;
    while (!lastGroup) {
        literalValue += packetStr.substring(1, 5);
        literalValLength += 5;
        if (packetStr.charAt(0) === lastGroupLabel) lastGroup = true;
        packetStr = packetStr.substring(5);
    }
    const value: number = parseInt(literalValue, 2);
    // console.log("literalValue", literalValue);
    return [literalValLength, value];
}

const typeIdLookupTable: { [key: string]: (list: number[]) => number } = {
    "0": function (list: number[]): number {
        const sum = list.reduce((prev, next) => prev + next, 0);
        return sum;
    },
    "1": function (list: number[]): number {
        const product = list.reduce((prev, next) => prev * next, 1);
        return product;
    },
    "2": function (list: number[]): number {
        const min = Math.min(...list);
        return min;
    },
    "3": function (list: number[]): number {
        const max = Math.max(...list);
        return max;
    },
    "5": function (list: number[]): number {
        if (list[0] > list[1]) return 1;
        else return 0;
    },
    "6": function (list: number[]): number {
        if (list[0] < list[1]) return 1;
        else return 0;
    },
    "7": function (list: number[]): number {
        if (list[0] === list[1]) return 1;
        else return 0;
    },
};

function parseOperatorPacket(packetStr: string, typeId: number): number[] {
    let packetSize: number = 0;
    let bitsRead: number;
    let value: number;
    let valuesList: number[] = [];
    const lengthTypeId: string = packetStr.charAt(0);
    if (lengthTypeId === "0") {
        let lengthInBits: number = parseInt(packetStr.substring(1, 16), 2);

        packetStr = packetStr.substring(16);
        packetSize = 1 + 15 + lengthInBits;

        while (lengthInBits > 0) {
            [bitsRead, value] = parsePacket(packetStr);
            valuesList.push(value);
            lengthInBits -= bitsRead;
            packetStr = packetStr.substring(bitsRead);
        }
        value = typeIdLookupTable[typeId.toString()](valuesList);
    } else {
        let subPacketsNum: number = parseInt(packetStr.substring(1, 12), 2); //skipping the first bit and then counting 11 bits
        packetStr = packetStr.substring(12); // skipping bits needed to read the type and number of packages
        packetSize = 1 + 11;

        while (subPacketsNum > 0) {
            [bitsRead, value] = parsePacket(packetStr);
            valuesList.push(value);

            packetSize += bitsRead;

            subPacketsNum--;
            packetStr = packetStr.substring(bitsRead);
        }
        value = typeIdLookupTable[typeId.toString()](valuesList);
    }
    return [packetSize, value];
}

function parsePacket(packetStr: string): number[] {
    const [version, typeId, headlessPacket] = parsePacketHeader(packetStr);
    if (!headlessPacket.includes("1")) {
        return [0, 0];
    }
    let bitsRead: number;
    let value: number;
    [bitsRead, value] = parsePacketCodeDependingOnTypeId(
        typeId,
        headlessPacket
    );
    bitsRead += 6;
    return [bitsRead, value];
}

const [bitsRead, value] = parsePacket(packet);

console.log("value:", value);
