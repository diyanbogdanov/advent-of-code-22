import { Day } from "../day";

interface File {
    name: string;
    size: number;
}

class Directory {
    private subDirectories: Map<string, Directory> = new Map();
    private files: File[] = [];

    constructor(private name: string, private parentDirectory: Directory | null = null) { }

    public totalSize(): number {
        const fileSize = this.files.reduce((total, file) => total + file.size, 0);
        const dirSize = [...this.subDirectories.values()].reduce((totalSize, dir) => totalSize + dir.totalSize(), 0);

        return fileSize + dirSize;
    }

    public getDirectory(name: string): Directory | null {
        return this.subDirectories.get(name) ?? null;
    }

    public addDirectory(name: string) {
        this.subDirectories.set(name, new Directory(name, this));
    }

    public addFile(name: string, size: number) {
        this.files.push({name, size});
    }

    public getSubdirectories(): Directory[] {
        return [...this.subDirectories.values()];
    }

    public getParentDirectory(): Directory | null {
        return this.parentDirectory;
    }
}

class Day7 extends Day {

    constructor(){
        super(7);
    }

    solveForPartOne(input: string): string {
        const fileSystem = this.parseFileSystem(input);
        let totalSize = 0;
        const directories = [fileSystem];
        while (directories.length > 0) {
            const dir = directories.shift();
            if (dir) {
                if (dir.totalSize() < 100000) {
                    totalSize += dir.totalSize();
                }
                directories.push(...dir?.getSubdirectories());
            }
        }
        return totalSize.toString();
    }

    solveForPartTwo(input: string): string {
        const fileSystem = this.parseFileSystem(input);
        let totalSize = 0;
        const directories = [fileSystem];
        let totalSizes = [];
        while (directories.length > 0) {
            const dir = directories.shift();
            if (dir) {
                totalSize += dir.totalSize();
                totalSizes.push(dir.totalSize());
                directories.push(...dir?.getSubdirectories());
            }
        }
        const freeSpace = 70000000 - fileSystem.totalSize();
        const requiredMinToFree = 30000000 - freeSpace;
        totalSizes = totalSizes.sort((a, b) => a - b);
        for (let i = 0; i < totalSizes.length; i++) {
            if (totalSizes[i] >= requiredMinToFree) {
                return totalSizes[i].toString();
            }
        }
        return '0';
    }

    private parseFileSystem(input: string): Directory {
        const fileSystem: Directory = new Directory('/');
        let currentDir: Directory | null = fileSystem;
        input.trim().split('\n').forEach(i => {
            const row = i.trim();
            if (row.startsWith('$')) {
                const command = row.replace('$ ', '');
                if (command.startsWith('cd')) {
                    const targetDir = command.replace('cd', '').trim();
                    if (targetDir === '/') {
                        currentDir = fileSystem;
                    } else if (targetDir.startsWith('..')) {
                        currentDir = currentDir?.getParentDirectory() ?? null;
                    } else {
                        currentDir = currentDir?.getDirectory(targetDir) ?? null;
                    }
                }
            } else {
                if (row.startsWith('dir')) {
                    const dirName = row.replace('dir', '').trim();
                    currentDir?.addDirectory(dirName);
                } else {
                    const fileProps = row.split(' ');
                    currentDir?.addFile(fileProps[1], parseInt(fileProps[0]));
                }
            }
            if (currentDir === null) {
                console.log(row);
            }
        });
        return fileSystem;
    }
}

export default new Day7;