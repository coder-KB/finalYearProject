import {  DNA} from "./DNA.js";
import {teacher_subject_data} from "./data.js"

console.log("working");
DNA.setTarget(teacher_subject_data); // this is very imp!!! first function to be called

let  test = new DNA();
test.calcFitness();
console.log(test);
loadTableData(test.display());


const btn = document.getElementById("generate");

btn.addEventListener('click', () => {
    // const target = document.getElementById("target").value;
    // if(!target) return;

    // DNA.setTarget(target);

    let populations = [];
    let populationLength = 50;
    for(let i = 0; i < populationLength; ++i) {
        let population = new DNA();
        populations.push(population);
    }


    let iteration = 1;
    let maxIterations = 100;

    const runAlways = setInterval(() => {
        console.log("Iteration ", iteration);
        if(iteration == maxIterations) {
            clearInterval(runAlways);
        }

        // document.getElementById("iteration").innerText = iteration;
        // let lst = document.getElementById("genes");
        // lst.innerHTML = '';

        for(let i = 0; i < populationLength; ++i) {
            populations[i].calcFitness(); 
        }

        populations.sort((p1, p2) => {
            return p2.fitness - p1.fitness;
        })

        let bestPhrase = populations[0];
        loadTableData(bestPhrase.display());
        console.log(bestPhrase);
        // populations.forEach(p => {
        //     const li = document.createElement('li');
        //     li.innerText = p.genes;
        //     lst.appendChild(li);
        // })

        // document.getElementById("best-phrase").innerText = bestPhrase.genes;
        if(bestPhrase.fitness == 1) {
            clearInterval(runAlways);
            console.log("done and dusted");
            console.log(bestPhrase);
        }    

        let matingPool = [];
        populations.forEach(population => {
            const n = parseInt(population.fitness * 100);
            for(let j = 0; j < n; ++j) {
                matingPool.push(population);
            }
        })

        // make changes to old last 90%
        let start = parseInt(populationLength * 0.1);
        for(let i = 0; i < populationLength; ++i) {
            let a = parseInt(Math.random() * matingPool.length);
            let partner = matingPool[a];

            let child = partner.crossover();
            child = child.mutate();

            populations[i] = child;
        }

        ++iteration;

    }, 100);

})

function loadTableData(timeTable) {
    const table = document.getElementById("tableBody");
    table.innerHTML = "";
    for(let i = 0; i < 6; ++i) {
        let row = table.insertRow();
        for(let j = 0; j < 9; ++j) {
            let cell = row.insertCell(j);
            cell.innerHTML = timeTable[i * 9 + j];
        }
    }
}