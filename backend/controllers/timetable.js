const { DNA } = require("./DNA");
const Section = require("../models/Section");
const Timetable = require("../models/Timetable");

const getData = async () => {
    return Section.find({}, (err, data) => {
        if (err) {
            console.log("error");
        } else {
            return data;
        }
    });
};

async function generateWholeTimeTable(req, res) {
    const data = await getData();

    DNA.setTarget(data);

    let populations = [];
    const populationLength = 25;

    for (let i = 0; i < populationLength; ++i) {
        let population = new DNA();
        populations.push(population);
    }

    let iteration = 1;
    const maxIterations = 50;
    while (iteration < maxIterations) {
        for (let i = 0; i < populationLength; ++i) {
            populations[i].calcFitness();
        }

        populations.sort((p1, p2) => {
            return p2.fitness - p1.fitness;
        });

        let bestTT = populations[0];

        console.log(`Iteration ${iteration} => fitness: ${bestTT.fitness}`);

        if (bestTT.fitness == 1) {
            // time table generated successfully
            const result = bestTT.display();
            let timetable = new Timetable({
                data: result,
            });
            Timetable.deleteMany({}, (err) => {
                if (err) {
                    res.status(404).json({
                        error: "Error in deleting time table",
                    });
                }

                timetable.save((err, timetable) => {
                    if (err || !timetable) {
                        res.status(404).json({
                            error: "Error in saving timetable",
                        });
                    }
                });
            });

            return res.json(result);
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
            let b = parseInt(Math.random() * matingPool.length);
            let partner1 = matingPool[a];
            let partner2 = matingPool[b];

            let child = partner1.crossover(partner2);
            child = child.mutate();

            populations[i] = child;
        }

        iteration++;
    }

    const result = populations[0].display();
    res.json(result);
}

async function getTimeTable(req, res) {
    Timetable.findOne({}, (err, data) => {
        if (err || !data) {
            return res.status(202).json({
                error: "NO Timetable Exist",
            });
        }

        res.json(data);
    });
}

module.exports = { generateWholeTimeTable, getTimeTable };
