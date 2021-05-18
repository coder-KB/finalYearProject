const { DNA } = require("./DNA.js");
const { DNA78 } = require("./DNA78.js");

function generateSingleTimeTable(subject_teacher, sectionName) {
    let useDNA = DNA;
    if (sectionName.startsWith("7") || sectionName.startsWith("8")) {
        useDNA = DNA78;
    }

    // setting the target value
    useDNA.setTarget(subject_teacher);

    let populations = [];
    let populationLength = 100;
    for (let i = 0; i < populationLength; ++i) {
        let population = new useDNA();
        populations.push(population);
    }

    let iteration = 1;
    let maxIterations = 100;

    while (iteration < maxIterations) {
        for (let i = 0; i < populationLength; ++i) {
            populations[i].calcFitness();
        }

        populations.sort((p1, p2) => {
            return p2.fitness - p1.fitness;
        });

        let bestTT = populations[0];
        if (bestTT.fitness == 1) {
            // time table generated successfully
            return bestTT.display();
        }

        let matingPool = [];
        populations.forEach((population) => {
            const n = parseInt(population.fitness * 100);
            for (let j = 0; j < n; ++j) {
                matingPool.push(population);
            }
        });

        let start = parseInt(populationLength * 0.1);
        for (let i = start; i < populationLength; ++i) {
            let a = parseInt(Math.random() * matingPool.length);
            let partner = matingPool[a];

            let child = partner.crossover();
            child = child.mutate();

            populations[i] = child;
        }

        iteration++;
    }

    // console.log("Error in generating time table");
    return null;
}

module.exports = { generateSingleTimeTable };
