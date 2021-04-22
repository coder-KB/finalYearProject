const { data } = require("./data.js"); // remove this and load this data from front-end
const { generateSingleTimeTable } = require("./singleClass/each_class.js");
const { DNA } = require("./DNA");

function generateWholeTimeTable(req, res) {
  DNA.setTarget(data);

  let populations = [];
  const populationLength = 15;

  for (let i = 0; i < populationLength; ++i) {
    let population = new DNA();
    populations.push(population);
  }

  let iteration = 1;
  const maxIterations = 100;
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
    for (let i = 1; i < populationLength; ++i) {
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
  return res.json(result);
}

module.exports = { generateWholeTimeTable };
