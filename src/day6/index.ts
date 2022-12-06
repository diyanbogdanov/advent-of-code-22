import { Day } from "../day";

class Day6 extends Day {

    constructor(){
        super(6);
    }

    solveForPartOne(input: string): string {
        return this.detectPacket(input, 4);
    }

    solveForPartTwo(input: string): string {
        return this.detectPacket(input, 14);
    }

    private detectPacket = (input: string, length: number) => {
        let startIndex = 0;
        let chars: { [key: string]: number } = {};
        for (let i = 0; i < input.length && (i - startIndex) < length; i++) {
            const currentChar = input[i];
            if (chars[currentChar] && (i - chars[currentChar] + 1) < length && chars[currentChar] >= startIndex) {
                startIndex = chars[currentChar];
            }
            chars[currentChar] = i + 1;
        }
        return (startIndex + length).toString();
    }
}

export default new Day6;