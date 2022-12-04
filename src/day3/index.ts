import { Day } from "../day";

class Day3 extends Day {
    constructor(){
        super(3);
    }

    solveForPartOne(input: string): string {
        const items = input.trim().split('\n').flatMap(row => {
            const rucksack = row.trim();
            const compartmentSize = Math.floor(rucksack.length / 2);
            const compartmentOne = rucksack.slice(0, compartmentSize);
            const compartmentTwo = rucksack.slice(compartmentSize, rucksack.length);
            const commonItems = (compartmentOne.match(new RegExp('[' + compartmentTwo + ']', 'g')) || []);
            return [...new Set(commonItems).values()];
        });

        return this.calculateScore(items);
    }

    solveForPartTwo(input: string): string {
        const rucksacks = input.trim().split('\n');
        const numberOfGroups = Math.floor(rucksacks.length / 3);

        const items: string[] = [];
        for (let i = 0; i < numberOfGroups; i++) {
            const firstRucksack = rucksacks[i * 3].trim();
            const secondRucksack = rucksacks[i * 3 + 1].trim();
            const thirdRucksack = rucksacks[i * 3 + 2].trim();
            const firstTwoCommonItems = (firstRucksack.match(new RegExp('[' + secondRucksack + ']', 'g')) || []).join('');
            const allThreeCommonItems = (thirdRucksack.match(new RegExp('[' + firstTwoCommonItems + ']', 'g')) || []);
            items.push(...new Set(allThreeCommonItems).values());
        }

        return this.calculateScore(items);
    }

    private calculateScore = (items: string[]) => {
        return items.reduce((total, item: string) => {
            const itemCharIndex = item.charCodeAt(0);
            const reIndex = itemCharIndex >= 'a'.charCodeAt(0) ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0) - 26;
            total += (itemCharIndex - reIndex + 1);
            return total;
        }, 0).toString();
    };
}

export default new Day3;