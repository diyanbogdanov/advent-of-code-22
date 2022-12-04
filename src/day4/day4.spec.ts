import day4 from './index';

describe('On Day 4', () =>{
    it(`part1 is calculated correctly`, ()=>{
        expect(day4.solveForPartOne(`
        2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8`)).toBe('2');
    });

    it(`part2 is calculated correctly`, ()=>{
        expect(day4.solveForPartTwo(`
        2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8`)).toBe('4');
    });
});