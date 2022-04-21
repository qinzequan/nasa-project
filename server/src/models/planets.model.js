const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

const planetModel = require("./planets.mongo");

// const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

const loadPlanets = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(parse({ comment: "#", columns: true }))
      .on("data", (planet) => {
        if (isHabitablePlanet(planet)) {
          insert(planet);
        }
      })
      .on("end", async () => {
        const planets = await getPlanets();
        console.log(`insert ${planets.length} the planet data`);
        resolve();
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

async function insert(planet) {
  await planetModel.updateOne(
    { kepler_name: planet.kepler_name },
    { kepler_name: planet.kepler_name },
    { upsert: true }
  );
}

async function getPlanets() {
  return await planetModel.find({});
}

module.exports = {
  loadPlanets,
  getPlanets,
};
