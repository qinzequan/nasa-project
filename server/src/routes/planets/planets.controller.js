const { getPlanets } = require("../../models/planets.model");

async function httpGetPlanets(req, res) {
  // res.setHeader('Access-Control-Allow-Origin', '*');
  return res.send(await getPlanets());
}

module.exports = {
  httpGetPlanets,
};
