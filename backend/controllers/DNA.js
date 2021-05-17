const { generateSingleTimeTable } = require("./singleClass/each_class.js");

class DNA {
    static target = null;
    static mutationRate = 0.1; // try with different values
    static maxScore = 54; // for all 6 days, 9 classes

    constructor() {
        this.genes = new Array();
        DNA.target.forEach((d) => {
            let res = null;
            while (res == null) {
                res = generateSingleTimeTable(d.subjects);
            }
            this.genes.push(res);
        });
    }

    static setTarget(data) {
        DNA.target = data;
    }

    calcFitness() {
        this.score = 0;

        // for each class time
        for (let t = 0; t < 54; ++t) {
            let st = new Set();
            let ok = true;
            // for all sections
            this.genes.forEach((cls) => {
                const teacher = cls[t][1];
                if (teacher) {
                    if (st.has(teacher)) {
                        ok = false;
                    }
                    st.add(teacher);
                }
            });

            if (ok) {
                this.score++;
            }
        }

        // console.log(this.score, DNA.maxScore);
        this.fitness = parseFloat(this.score) / DNA.maxScore;
    }

    crossover(partner) {
        let child = new DNA();

        const crossOverRate = 0.5;

        for (let i = 0; i < partner.genes.length; ++i) {
            if (Math.random() < crossOverRate) {
                child.genes[i] = this.genes[i];
            } else {
                child.genes[i] = partner.genes[i];
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

    display() {
        // this has to be changed
        let timeTable = [];
        for (let i = 0; i < DNA.target.length; ++i) {
            timeTable.push({
                className: DNA.target[i].name,
                result: this.genes[i],
            });
        }

        return timeTable;
    }
}

module.exports = { DNA };
