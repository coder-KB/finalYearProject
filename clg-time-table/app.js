import {data} from "./data.js"; // remove this and load this data from front-end
import { generateSingleTimeTable } from './singleClass/each_class.js';
import { DNA } from './DNA.js';
import * as fs from 'fs';

generateWholeTimeTable(data);

function generateWholeTimeTable(data) {
    // use genetic algorithm to load the time table
    DNA.setTarget(data);
    const population = new DNA();
    population.calcFitness();
    console.log(population);
    // const result = population.display();
    // fs.writeFile("result.txt", result, (err) => {
    //     if(err) throw err;
    //     console.log('saved');
    // });
}

console.log("hello");