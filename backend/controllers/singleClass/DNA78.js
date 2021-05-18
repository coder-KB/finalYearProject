class DNA78 {
    static target = null;
    static mutationRate = 0.01;
    static totalSize = 54;
    static maxScore = 2; // and 2 for each day friday and saturday
    static arr = null;
    static initialGene = null;
    static labs = null;
    static teacherToSubject = new Map();
    static subjectToTeacher = new Map();
    static subjectToTeacher2 = new Map();

    constructor() {
        this.genes = DNA78.initialGene;
        let shuffledArr = shuffle(DNA78.arr);
        let i = 0,
            j = 36;
        while (i < shuffledArr.length && j < this.genes.length) {
            if (this.genes[j] != "z") j += 3;
            else {
                this.genes[j++] = shuffledArr[i++];
            }
        }
    }

    static setTarget(data) {
        // clear all data
        DNA78.maxScore = 2;
        DNA78.totalSize = 54;
        DNA78.subjectToTeacher = new Map();
        DNA78.teacherToSubject = new Map();
        DNA78.subjectToTeacher2 = new Map();

        // DNA78.maxScore += data.length;
        DNA78.target = data;
        DNA78.initialGene = new Array(DNA78.totalSize);
        DNA78.labs = new Set();
        // z indicated blank, not assigned
        for (let i = 0; i < DNA78.totalSize; ++i) {
            DNA78.initialGene[i] = "z";
        }

        let val = 97; // starts from 'a'
        data.forEach((d) => {
            if (d.isLab) {
                let ch = String.fromCharCode(val++);
                DNA78.teacherToSubject.set(ch, d.subjectCode);
                DNA78.subjectToTeacher.set(d.subjectCode, ch);
                DNA78.totalSize -= 3;
                for (let i = 0; i < 3; ++i) {
                    DNA78.initialGene[i + d.startSlot] = ch;
                }
                DNA78.labs.add(ch);
            }
        });

        for (let i = 0; i < 3; ++i) {
            DNA78.initialGene[DNA78.initialGene.length - i - 1] = " ";
        }
        DNA78.totalSize -= 3;

        // setup arr
        DNA78.arr = new Array(18);
        let ind = 0; // ind value for setting arr

        data.forEach((d) => {
            if (!d.isLab) {
                let ch = String.fromCharCode(val++);
                DNA78.teacherToSubject.set(ch, d.subjectCode);
                DNA78.subjectToTeacher.set(d.subjectCode, ch);
                DNA78.subjectToTeacher2.set(ch, d.teacherName);

                for (let i = 0; i < d.credits; ++i) {
                    DNA78.arr[ind++] = ch;
                }

                // increase the maxScore
                DNA78.maxScore++;
            }
        });

        while (ind < 18) DNA78.arr[ind++] = " ";

        DNA78.teacherToSubject.set(" ", " ");
        DNA78.subjectToTeacher.set("BREAK", " "); // this can be removed

        // console.log(DNA78.teacherToSubject);
        // console.log(DNA78.subjectToTeacher);

        // this prints elements has to be remove
        // console.log(DNA78.arr);
        // shuffle
        // console.log(shuffle(DNA78.arr));
        // console.log(DNA78.teacherToSubject);
        // console.log(DNA78.subjectToTeacher);
        // console.log(DNA78.labs);
    }

    calcFitness() {
        this.score = 0;

        // for each subject
        DNA78.target.forEach((sub) => {
            if (sub.isLab) return;
            let requiredVal = DNA78.subjectToTeacher.get(sub.subjectCode);
            let positions = this.getPositions(requiredVal);

            let days = new Map();
            positions.forEach((pos) => {
                let day = parseInt(pos / 9);
                let value = days.get(day);
                if (!value) value = 0;
                days.set(day, value + 1);
            });

            let ok = 1;
            days.forEach((day) => {
                if (day > 2) {
                    ok = 0;
                }
            });

            this.score++;
            // maxScore += 1
        });

        // for each day, check breaks between two classes
        // only check on friday and saturday
        for (let day = 4; day < 6; ++day) {
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

        // console.log(this.score, DNA78.maxScore);
        this.fitness = parseFloat(this.score) / DNA78.maxScore;
    }

    crossover() {
        let child = new DNA78();
        child.genes = [...this.genes];

        // try do remove breakInBetween
        // day 4 because only friday and saturday class
        for (let day = 4; day < 6; ++day) {
            let start = day * 9;
            let end = start + 8;

            while (start <= end && child.genes[start] == " ") ++start;
            while (end >= start && child.genes[end] == " ") --end;

            // write code to remove breakInBetween
            let moveLeft = 0; // move all spaces to right

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
                    if (DNA78.labs.has(child.genes[end])) {
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
                    if (DNA78.labs.has(child.genes[start])) {
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
        // return an new DNA78
        if (Math.random() < DNA78.mutationRate) {
            return new DNA78();
        } else {
            return this;
        }
    }

    getRndInteger() {
        return DNA78.arr[Math.floor(Math.random() * DNA78.arr.length)];
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
                DNA78.teacherToSubject.get(g),
                DNA78.subjectToTeacher2.get(g),
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

module.exports = { DNA78 };
