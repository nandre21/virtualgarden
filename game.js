// Constants
const maxGrowthStage = 3;
const growthInterval = 2000; // milliseconds

// Plant growth interval IDs
let growthIntervals = {};

// Function to grow the plant
function growPlant(plant) {
    const plantData = plants.find(p => p.id === plant.id);
    if (plantData.growthStage < maxGrowthStage) {
        clearInterval(growthIntervals[plant.id]);
        plantData.growthStage++;
        plant.classList.add('grow');
        plant.getElementsByClassName('tooltip')[0].innerHTML = `${plantData.name} - Stage ${plantData.growthStage}`;
        growthIntervals[plant.id] = setInterval(() => growPlant(plant), growthInterval);
    }
}

// Function to water the plants
function waterPlants() {
    for (const plant of plants) {
        const plantElement = document.getElementById(plant.id);
        if (plantElement.classList.contains('grow')) {
            plantElement.classList.remove('grow');
        }
        plantElement.getElementsByClassName('tooltip')[0].innerHTML = plant.name;
        plant.growthStage = 0;
        clearInterval(growthIntervals[plant.id]);
    }
}

// Attach event listeners
document.addEventListener("DOMContentLoaded", () => {
    const plantElements = document.getElementsByClassName("plant");
    for (const plantElement of plantElements) {
        plantElement.addEventListener("click", () => growPlant(plantElement));
    }

    const wateringCanElement = document.getElementById("watering-can");
    wateringCanElement.addEventListener("click", waterPlants);
});
