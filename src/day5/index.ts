import { create } from "domain";
import { Day } from "../day";

class Day5 extends Day {
    private CRANE_LETTER_MATCHER = new RegExp(/\[([A-Z]{1})\]/i)
    private CRANE_OPERATIONS_MATCHER = new RegExp(/move\s*(\d*)\s*from\s*(\d*)\s*to\s*(\d*).*/i);

    constructor(){
        super(5);
    }

    solveForPartOne(input: string): string {
        const stacks: any = {};
        input.split('\n').forEach(row => {
            if (row.indexOf('[') != -1) {
                // parse stacks
                const numberOfStacks = Math.ceil(row.length / 4); // Crane: [X] + space
                for (let i = 0; i < numberOfStacks; i++) {
                    // Init stack
                    if (stacks[i + 1] === undefined) {
                        stacks[i + 1] = [];
                    }

                    const crane = row.slice(i * 4, (i + 1) * 4).match(this.CRANE_LETTER_MATCHER)?.[1] ?? '';
                    if (crane) {
                        stacks[i + 1].push(crane);
                    }
                }
            }

            const craneOperations = row.match(this.CRANE_OPERATIONS_MATCHER);
            if (craneOperations !== null) {
                const numberOfCrates = parseInt(craneOperations[1] ?? 0);
                const fromStack = craneOperations[2] ?? 0;
                const toStack = craneOperations[3] ?? 0;
                for (let i = 0; i < numberOfCrates; i++) {
                    const crate = stacks[fromStack].shift();
                    stacks[toStack].unshift(crate);
                }
            }
        });
        return Object.keys(stacks).map(stack => stacks[stack][0]).join('');
    }

    solveForPartTwo(input: string): string {
        const stacks: any = {};
        input.split('\n').forEach(row => {
            if (row.indexOf('[') != -1) {
                // parse stacks
                const numberOfStacks = Math.ceil(row.length / 4); // Crane: [X] + space
                for (let i = 0; i < numberOfStacks; i++) {
                    // Init stack
                    if (stacks[i + 1] === undefined) {
                        stacks[i + 1] = [];
                    }

                    const crane = row.slice(i * 4, (i + 1) * 4).match(this.CRANE_LETTER_MATCHER)?.[1] ?? '';
                    if (crane) {
                        stacks[i + 1].push(crane);
                    }
                }
            }

            const craneOperations = row.match(this.CRANE_OPERATIONS_MATCHER);
            if (craneOperations !== null) {
                const numberOfCrates = parseInt(craneOperations[1] ?? 0);
                const fromStack = craneOperations[2] ?? 0;
                const toStack = craneOperations[3] ?? 0;
                const creates = stacks[fromStack].splice(0, numberOfCrates);
                stacks[toStack].unshift(...creates);
            }
        });
        return Object.keys(stacks).map(stack => stacks[stack][0]).join('');
    }
}

export default new Day5;