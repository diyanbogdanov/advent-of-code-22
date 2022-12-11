import { Day } from "../day";

class Tree {
    private _maxLeft: number = -1;
    private _maxTop: number = -1;
    private _maxRight: number = -1;
    private _maxBottom: number = -1;
    private _vdLeft: number = 0;
    private _vdTop: number = 0;
    private _vdRight: number = 0;
    private _vdBottom: number = 0;

    constructor(private treeHight: number) { }

    public set maxLeft(maxLeft: number) {
        this._maxLeft = maxLeft;
    }

    public set maxTop(maxTop: number) {
        this._maxTop = maxTop;
    }

    public set maxRight(maxRight: number) {
        this._maxRight = maxRight;
    }

    public set vdBottom(vdBottom: number) {
        if (this.treeHight > this._maxBottom) {
            this._vdBottom = vdBottom + 1;
        } else if (this.treeHight === this._maxBottom) {
            this._vdBottom = 1;
        }
    }

    public set vdLeft(vdLeft: number) {
        if (this.treeHight > this._maxLeft) {
            this._vdLeft = vdLeft + 1;
        } else if (this.treeHight === this._maxLeft) {
            this._vdLeft = 1;
        }
    }

    public set vdTop(vdTop: number) {
        if (this.treeHight > this._maxTop) {
            this._vdTop = vdTop + 1;
        } else if (this.treeHight === this._maxTop) {
            this._vdTop = 1;
        }
    }

    public set vdRight(vdRight: number) {
        if (this.treeHight > this._maxRight) {
            this._vdRight = vdRight + 1;
        } else if (this.treeHight === this._maxRight) {
            this._vdRight = 1;
        }
    }

    public set maxBottom(maxBottom: number) {
        this._maxBottom = maxBottom;
    }

    public get maxLeft() {
        return Math.max(this._maxLeft, this.treeHight);
    }

    public get maxTop() {
        return Math.max(this._maxTop, this.treeHight);
    }

    public get maxRight() {
        return Math.max(this._maxRight, this.treeHight);
    }

    public get maxBottom() {
        return Math.max(this._maxBottom, this.treeHight);
    }

    public get vdRight() {
        return this._maxRight > this.treeHight ? this._vdRight : this._maxRight === this.treeHight ? 1 : 0;
    }

    public get vdLeft() {
        return this._maxLeft > this.treeHight ? this._vdLeft : this._maxLeft === this.treeHight ? 1 : 0;
    }

    public get vdTop() {
        return this._maxTop > this.treeHight ? this._vdTop : this._maxTop === this.treeHight ? 1 : 0;
    }

    public get vdBottom() {
        return this._maxBottom > this.treeHight ? this._vdBottom : this._maxBottom === this.treeHight ? 1 : 0;
    }

    public isTreeVisible(): boolean {
        return this.treeHight > this._maxLeft ||
            this.treeHight > this._maxTop ||
            this.treeHight > this._maxRight ||
            this.treeHight > this._maxBottom;
    }

    public scenicScore(): number {
        return this._vdBottom * this._vdLeft * this._vdRight * this._vdTop;
    }
}

class Day8 extends Day {

    constructor(){
        super(8);
    }

    solveForPartOne(input: string): string {
        const forest: Array<Array<Tree>> = [];
        input.trim().split('\n').forEach((row, rowIndex) => {
            forest.push([]);
            row.trim().split('').forEach((col, colIndex) => {
                const tree = new Tree(parseInt(col));
                if ((colIndex - 1) >= 0 && (rowIndex - 1) >= 0) {
                    const prevTopTree = forest[rowIndex - 1][colIndex];
                    const prevLeftTree = forest[rowIndex][colIndex - 1];
                    tree.maxTop = prevTopTree.maxTop;
                    tree.maxLeft = prevLeftTree.maxLeft;
                }
                forest[rowIndex].push(tree);
            });
        });
        let visibleTrees = 0;
        for (let rowIndex = forest.length - 2; rowIndex > 0; rowIndex--) { 
            for (let colIndex = forest[rowIndex].length - 2; colIndex > 0; colIndex--) {
                const tree = forest[rowIndex][colIndex];
                if ((colIndex + 1) < forest[rowIndex].length && (rowIndex + 1) < forest.length) {
                    const prevBottomTree = forest[rowIndex + 1][colIndex];
                    const prevRightTree = forest[rowIndex][colIndex + 1];
                    tree.maxBottom = prevBottomTree.maxBottom;
                    tree.maxRight = prevRightTree.maxRight;
                }
                if (tree.isTreeVisible()) {
                    visibleTrees++;
                }
            }
        }
        visibleTrees += 2 * (forest.length + forest[0].length - 2);
        return visibleTrees.toString();
    }

    private calculateScore = (trees: number[][], x: number, y: number) => {
        const height = trees[x][y];

        let top = 0;
        for (let i = x - 1; i >= 0; i--) {
            top++;
            if (trees[i][y] >= height) {
                break;
            }
        }

        let left = 0;
        for (let i = y - 1; i >= 0; i--) {
            left++;
            if (trees[x][i] >= height) {
                break;
            }
        }

        let bottom = 0;
        for (let i = x + 1; i < trees.length; i++) {
            bottom++;
            if (trees[i][y] >= height) {
                break;
            }
        }

        let right = 0;
        for (let i = y + 1; i < trees[x].length; i++) {
            right++;
            if (trees[x][i] >= height) {
                break;
            }
        }

        return top * right * bottom * left;
    }

    solveForPartTwo(input: string): string {
        const trees = input.trim().split('\n').map(row => row.trim().split('').map(val => parseInt(val)));

        let maxScore = 1;
        for (let row = 0; row < trees.length; row++) {
            for (let col = 0; col < trees[0].length; col++) {
                maxScore = Math.max(maxScore, this.calculateScore(trees, row, col));
            }
        }

        return maxScore.toString();
    }
}

export default new Day8;