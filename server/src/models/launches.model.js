const axios = require("axios").default;
const launchesModel = require("./launches.mango");

const SPACEX_LAUNCHES_URL = "https://api.spacexdata.com/v4/launches/query";

// const launch = {
//   flightNumber: 100,
//   launchDate: new Date("December 27,2030"),
//   mission: "Kepler Exploration X",
//   rocket: "Explorer IS1",
//   target: "Kepler-1652 b",
//   customers: ["ZTM", "NASA"],
//   upcoming: true,
//   success: true,
// };

// launches.set(launch.flightNumber, launch);
// async function insertFirstLaunch() {
//   await launchesModel.updateOne({ flightNumber: launch.flightNumber }, launch, {
//     upsert: true,
//   });
//   console.log("insert first launch");
// }

async function loadSpaceXLaunches() {
  const firstLauch = await launchesModel.findOne({
    flightNumber: 1,
    mission: "FalconSat",
  });
  if (firstLauch) {
    console.log("launch data already loaded!");
  } else {
    await populateLaunches();
  }
}

async function populateLaunches() {
  const response = await axios.post(SPACEX_LAUNCHES_URL, {
    query: {},
    options: {
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
      pagination: false,
    },
  });
  const launches = response.data.docs;
  launches.forEach(async (l) => {
    const customers = l.payloads.flatMap((p) => p.customers);
    const launch = {
      flightNumber: l.flight_number,
      launchDate: new Date(l.date_local),
      mission: l.name,
      rocket: l.rocket.name,
      customers,
      upcoming: l.upcoming,
      success: l.success,
    };
    await launchesModel.create(launch);
  });
  console.log("SpaceX Launches load success");
}

async function getLaunches(pagination) {
  const { skip, limit } = pagination;
  return await launchesModel
    .find({}, { _id: 0, __v: 0 })
    .sort({ flightNumber: 1 })
    .skip(skip)
    .limit(limit);
}

async function getFlightNumber() {
  const launch = await launchesModel.findOne().sort({ flightNumber: -1 });
  return launch ? launch.flightNumber + 1 : 100;
}

async function createLaunch(launch) {
  const flightNumber = await getFlightNumber();
  const newLaunch = {
    flightNumber,
    customers: ["ZTM", "NASA"],
    upcoming: true,
    success: true,
    ...launch,
  };

  await launchesModel.create(newLaunch);

  return newLaunch;
}

async function isLaunchIdExist(flightNumber) {
  return await launchesModel.findOne({ flightNumber });
}

async function abortLaunch(flightNumber) {
  const abort = await launchesModel.updateOne(
    { flightNumber },
    { upcoming: false, success: false }
  );
  return abort.matchedCount === 1 && abort.modifiedCount === 1;
}

module.exports = {
  loadSpaceXLaunches,
  getLaunches,
  createLaunch,
  isLaunchIdExist,
  abortLaunch,
};
