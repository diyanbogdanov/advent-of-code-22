import day1 from './index';

describe('On Day 1', () =>{
    it(`part1 is identity function`, async ()=>{
        expect(day1.solveForPartOne('100\n200\n\n400')).toBe('400');
    })
});