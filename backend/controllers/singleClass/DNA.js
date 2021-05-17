class DNA {
    static target = null;
    static mutationRate = 0.01;
    static totalSize = 54;
    static maxScore = 9; // 3 for saturday evening, and 6 for each day
    static arr = null;
    static initialGene = null;
    static labs = null;
    static teacherToSubject = new Map();
    static subjectToTeacher = new Map();
    static subjectToTeacher2 = new Map();

    constructor() {
        this.genes = DNA.initialGene;
        let shuffledArr = shuffle(DNA.arr);
        let i = 0,
            j = 0;
        while (i < shuffledArr.length && j < this.genes.length) {
            if (this.genes[j] != "z") j += 3;
            else {
                this.genes[j++] = shuffledArr[i++];
            }
        }
    }

    static setTarget(data) {
        // clear all data
        DNA.maxScore = 9;
        DNA.totalSize = 54;
        DNA.subjectToTeacher = new Map();
        DNA.teacherToSubject = new Map();
        DNA.subjectToTeacher2 = new Map();

        // DNA.maxScore += data.length;
        DNA.target = data;
        DNA.initialGene = new Array(DNA.totalSize);
        DNA.labs = new Set();
        // z indicated blank, not assigned
        for (let i = 0; i < DNA.totalSize; ++i) {
            DNA.initialGene[i] = "z";
        }

        let val = 97; // starts from 'a'
        data.forEach((d) => {
            if (d.isLab) {
                let ch = String.fromCharCode(val++);
                DNA.teacherToSubject.set(ch, d.subjectCode);
                DNA.subjectToTeacher.set(d.subjectCode, ch);
                DNA.totalSize -= 3;
                for (let i = 0; i < 3; ++i) {
                    DNA.initialGene[i + d.startSlot] = ch;
                }
                DNA.labs.add(ch);
            }
        });

        for (let i = 0; i < 3; ++i) {
            DNA.initialGene[DNA.initialGene.length - i - 1] = " ";
        }
        DNA.totalSize -= 3;

        // setup arr
        DNA.arr = new Array(DNA.totalSize);
        let ind = 0; // ind value for setting arr

        data.forEach((d) => {
            if (!d.isLab) {
                let ch = String.fromCharCode(val++);
                DNA.teacherToSubject.set(ch, d.subjectCode);
                DNA.subjectToTeacher.set(d.subjectCode, ch);
                DNA.subjectToTeacher2.set(ch, d.teacherName);

                for (let i = 0; i < d.credits; ++i) {
                    DNA.arr[ind++] = ch;
                }

                // increase the maxScore
                DNA.maxScore++;
            }
        });

        while (ind < DNA.totalSize) DNA.arr[ind++] = " ";

        DNA.teacherToSubject.set(" ", " ");
        DNA.subjectToTeacher.set("BREAK", " "); // this can be removed

        // console.log(DNA.teacherToSubject);
        // console.log(DNA.subjectToTeacher);

        // this prints elements has to be remove
        // console.log(DNA.arr);
        // shuffle
        // console.log(shuffle(DNA.arr));
        // console.log(DNA.teacherToSubject);
        // console.log(DNA.subjectToTeacher);
        // console.log(DNA.labs);
    }

    calcFitness() {
        this.score = 0;
        // Saturday afternoon no class
        for (let i = 1; i < 4; ++i) {
            if (this.genes[this.genes.length - i] == " ") {
                this.score++;
            }
        }
        // maxScore -> 3

        // for each subject
        DNA.target.forEach((sub) => {
            if (sub.isLab) return;
            let requiredVal = DNA.subjectToTeacher.get(sub.subjectCode);
            let positions = this.getPositions(requiredVal);

            let days = new Set();
            positions.forEach((pos) => {
                days.add(parseInt(pos / 9));
            });

            if (days.size === positions.length) {
                this.score++;
            }

            // maxScore += 1
        });

        // for each day, check breaks between two classes
        for (let day = 0; day < 6; ++day) {
            let start = day * 9;
            let end = start + 8;

            while (start <= end && this.genes[start] == " ") ++start;
            while (end >= start && this.genes[end] == " ") --end;

            let breakInBetween = false;
            while (start < end) {
                if (this.genes[start] == " ") {
                    breakInBetween = true;
                    break;
                }
                start++;
            }

            if (!breakInBetween) {
                this.score++;
            }
        }

        // console.log(this.score, DNA.maxScore);
        this.fitness = parseFloat(this.score) / DNA.maxScore;
    }

    crossover() {
        let child = new DNA();
        child.genes = [...this.genes];

        // also swap some classes
        const someChanges = 100;
        for (let i = 0; i < someChanges; ++i) {
            // write code for swapping two days or two classes
            let a = parseInt(Math.random() * 51);
            let b = parseInt(Math.random() * 51);
            if (
                !DNA.labs.has(child.genes[a]) &&
                !DNA.labs.has(child.genes[b])
            ) {
                [child.genes[a], child.genes[b]] = [
                    child.genes[b],
                    child.genes[a],
                ];
            }
        }

        // try do remove breakInBetween
        for (let day = 0; day < 6; ++day) {
            let start = day * 9;
            let end = start + 8;

            while (start <= end && child.genes[start] == " ") ++start;
            while (end >= start && child.genes[end] == " ") --end;

            // write code to remove breakInBetween
            let moveLeft = 1; // move all spaces to left
            if (Math.random() < 0.5) moveLeft = 0;

            let breakPositions = [];
            for (let i = start + 1; i < end; ++i) {
                if (child.genes[i] == " ") {
                    breakPositions.push(i);
                }
            }

            if (breakPositions.length == 0) continue;

            if (moveLeft) {
                let breakIndex = 0;
                while (
                    breakIndex < breakPositions.length &&
                    end > breakPositions[breakIndex]
                ) {
                    if (DNA.labs.has(child.genes[end])) {
                        end -= 3;
                    } else if (child.genes[end] != " ") {
                        [
                            child.genes[breakPositions[breakIndex]],
                            child.genes[end],
                        ] = [
                            child.genes[end],
                            child.genes[breakPositions[breakIndex]],
                        ];
                        end--;
                        breakIndex++;
                    } else end--;
                }
            } else {
                let breakIndex = breakPositions.length - 1;
                while (breakIndex >= 0 && start < breakPositions[breakIndex]) {
                    if (DNA.labs.has(child.genes[start])) {
                        start += 3;
                    } else if (child.genes[start] != " ") {
                        [
                            child.genes[breakPositions[breakIndex]],
                            child.genes[start],
                        ] = [
                            child.genes[start],
                            child.genes[breakPositions[breakIndex]],
                        ];
                        start++;
                        breakIndex--;
                    } else start++;
                }
            }
        }

        return child;
    }

    mutate() {
        // return an new DNA
        if (Math.random() < DNA.mutationRate) {
            return new DNA();
        } else {
            return this;
        }
    }

    getRndInteger() {
        return DNA.arr[Math.floor(Math.random() * DNA.arr.length)];
    }

    getPositions(key) {
        var pos = [];
        let i = -1;
        while ((i = this.genes.indexOf(key, i + 1)) > -1) {
            pos.push(i);
        }
        return pos;
    }

    display() {
        let timeTable = [];
        this.genes.forEach((g) => {
            timeTable.push([
                DNA.teacherToSubject.get(g),
                DNA.subjectToTeacher2.get(g),
            ]);
        });
        return timeTable;
    }
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

module.exports = { DNA };
