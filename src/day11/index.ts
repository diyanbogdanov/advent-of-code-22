import { Day } from "../day";

class Item {
    constructor(private _worryLevel: number) { }

    public reduceWorryLevel = (reduceWorryLevelBy: number = 3, modulus = false) => {
        let result = this.worryLevel / reduceWorryLevelBy;
        if (modulus) {
            result = this.worryLevel % reduceWorryLevelBy;
        }
        this.worryLevel = Math.floor(result);
    }

    public get worryLevel() {
        return this._worryLevel;
    }

    public set worryLevel(level: number) {
        this._worryLevel = level;
    }
}

class Monkey {
    private NUMBER_FILTER_REGEX = new RegExp(/[^0-9]/, 'g');

    private inspectedItemsCount = 0;
    private items: Array<Item> = [];
    private operation: Function = () => {};
    private testDivisibleBy = 1;
    private testTrueMonkey = 0;
    private testFalseMonkey = 0;

    public addItem = (item: Item) => {
        this.items.push(item);
    }

    public inspectedItems = () => {
        return this.inspectedItemsCount;
    }

    public setOperation = (operation: string) => {
        this.operation = new Function('old', `return ${operation.split('=')[1].trim()}`);
    }

    public setTestDivisibleBy = (testDivisibleBy: string) => {
        this.testDivisibleBy = this.getInteger(testDivisibleBy);
    }

    public getTestDivisibleBy = () => {
        return this.testDivisibleBy;
    }

    public setTestTrueMonkey = (testTrueMonkey: string) => {
        this.testTrueMonkey = this.getInteger(testTrueMonkey);
    }

    public setTestFalseMonkey = (testFalseMonkey: string) => {
        this.testFalseMonkey = this.getInteger(testFalseMonkey);
    }

    public play(reduceWorryLevelBy: number, modulus = false): Array<{monkey: number, item: Item}> {
        const res = this.items.map(item => {
            this.inspectedItemsCount++;
            const result = {monkey: this.testTrueMonkey, item };
            item.worryLevel = this.operation.call(this, item.worryLevel);
            item.reduceWorryLevel(reduceWorryLevelBy, modulus);
            if ((item.worryLevel % this.testDivisibleBy) !== 0) {
                result.monkey = this.testFalseMonkey;
            }
            return result;
        });
        this.items = [];
        return res;
    }

    private getInteger = (text: string): number => {
        return parseInt(text.replace(this.NUMBER_FILTER_REGEX, '').trim());
    }
}

class Day11 extends Day {

    constructor(){
        super(11);
    }

    solveForPartOne(input: string): string {
        return this.playGame(input, 3, 20);
    }

    solveForPartTwo(input: string): string {
        return this.playGame(input, 1, 10000);
    }

    private playGame = (input: string, reduceWorryLevelBy = 3, rounds = 20) => {
        const monkeys: Array<Monkey> = this.parseMonkeyInput(input);
        reduceWorryLevelBy = reduceWorryLevelBy === 3 ? reduceWorryLevelBy : monkeys.map(monkey => monkey.getTestDivisibleBy()).reduce((prev, curr) => prev * curr, 1);
        const modulus = reduceWorryLevelBy !== 3;

        for (let i = 0; i < rounds; i++) {
            monkeys.forEach(monkey => {
                monkey.play(reduceWorryLevelBy, modulus).forEach(result=> {
                    monkeys[result.monkey].addItem(result.item);
                });
            });
        }
        monkeys.sort((a, b) => b.inspectedItems() - a.inspectedItems());
        return `${monkeys[0].inspectedItems() * monkeys[1].inspectedItems()}`;
    }

    private parseMonkeyInput = (input: string) => {
        const monkeys: Array<Monkey> = [];
        const rows = input.trim().split('\n');
        const numberOfMonkeys = Math.ceil(rows.length / 7);
        for (let i = 0; i < numberOfMonkeys; i++) {
            const monkey = new Monkey();
            const monkeyDescription = rows.splice(0, 7);
            monkeyDescription[1].replace('Starting items:', '').trim().split(',').forEach(item => {
                monkey.addItem(new Item(parseInt(item.trim())));
            });
            monkey.setOperation(monkeyDescription[2]);
            monkey.setTestDivisibleBy(monkeyDescription[3]);
            monkey.setTestTrueMonkey(monkeyDescription[4]);
            monkey.setTestFalseMonkey(monkeyDescription[5]);
            monkeys.push(monkey);
        }
        return monkeys;
    }
}

export default new Day11;