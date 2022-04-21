const http = require("http");

require("dotenv").config();

const app = require("./app");
const { mongoConnect } = require("./services/mongo");
const { loadPlanets } = require("./models/planets.model");
const { loadSpaceXLaunches } = require("./models/launches.model");

//node src/server.js --PORT=3000 windows系统传参
// const PORT = require('minimist')(process.argv.slice(2)).PORT || 8000;

//windows系统不能这样传参
//PORT=3000 node src/server.js
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadPlanets();
  await loadSpaceXLaunches();
  server.listen(PORT, () => {
    console.log(`server start with listen ${PORT}`);
  });
}

startServer();

// loadPlanets().then(() => {
//   server.listen(PORT, () => {
//     console.log(`server start with listen ${PORT}`);
//   });
// });
// require('./models/planets.model');
