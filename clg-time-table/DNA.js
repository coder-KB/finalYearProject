import { generateSingleTimeTable } from './singleClass/each_class.js';

export class DNA {

    static target = null;
    static mutationRate = 0.1; // try with different values
    static maxScore = 54;  // for all 6 days, 9 classes

    constructor() { 
        this.genes = new Array();
        DNA.target.forEach(d => {
            this.genes.push(generateSingleTimeTable(d.subject_teacher));
        })
    }

    static setTarget(data) {
        DNA.target = data;
    }

    calcFitness() {
        this.score = 0;
        
        // for each class time
        for(let t = 0; t < 54; ++t) {
            let st = new Set();
            let ok = true;
            // for all sections
            this.genes.forEach(cls => {
                const teacher = cls[t][1];
                if(teacher) {
                    if(st.has(teacher)) ok = false;
                    st.add(teacher);
                }
            })

            if(ok) {
                this.score++;
            }
        }

        // console.log(this.score, DNA.maxScore);
        this.fitness = parseFloat(this.score) / DNA.maxScore;
    }

    crossover(partner) {
        let child = new DNA();
    
        const crossOverRate = Math.floor(Math.random() * partner.genes.length);

        for(let i = 0; i < partner.genes.length; ++i) {
            if(i < crossOverRate) {
                child.genes[i] = this.genes[i];
            } else {
                child.genes[i] = partner.genes[i];
            }
        }

        return child;
    }

    mutate()  {
        // return an new DNA
        if(Math.random() < DNA.mutationRate) {
            return new DNA();
        }
        else {
            return this;
        }
    }

    display() {
        // this has to be changed
        let timeTable = "";
        for(let i = 0; i  < DNA.target.length; ++i) {
            timeTable += DNA.target[i].class;
            timeTable += "\n";
 
            for(let j = 0; j < 54; ++j) {
                if(j && j % 9 == 0) {
                    timeTable += "\n";
                }

                const arr = [...this.genes[i][j]];
                if(!arr[1]) {
                    arr[1] = "";
                }
                timeTable += `${arr[0]}:${arr[1]} `;
            }

            timeTable += "\n";
        }
        return timeTable;
    }
}