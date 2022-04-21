const {
  getLaunches,
  createLaunch,
  isLaunchIdExist,
  abortLaunch,
} = require("../../models/launches.model");

const { getPagination } = require("../../services/query");

async function httpGetLaunches(req, res) {
  const pagination = getPagination(req.query);
  const launches = await getLaunches(pagination);
  return res.status(200).json(launches);
}

async function httpCreateLaunch(req, res) {
  let launch = { ...req.body };
  if (
    !launch.launchDate ||
    !launch.mission ||
    !launch.rocket ||
    !launch.target
  ) {
    return res
      .status(400)
      .json({ error: "Launch missing required attributes" });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (launch.launchDate.toString() === "Invalid Date") {
    return res.status(400).json({ error: "Date format error" });
  }

  res.status(201).json(await createLaunch(launch));
}

async function httpAbortLaunch(req, res) {
  const id = Number(req.params.id);
  const isExist = await isLaunchIdExist(id);
  if (!isExist) {
    return res.status(404).json({ error: "Launch id not exist" });
  }
  const abort = await abortLaunch(id);
  return res.status(200).json({ abort });
}

module.exports = {
  httpGetLaunches,
  httpCreateLaunch,
  httpAbortLaunch,
};
