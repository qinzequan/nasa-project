const mongoose = require("mongoose");

const planetSchema = new mongoose.Schema({ kepler_name: String });

const planetModel = mongoose.model("Planet", planetSchema);

module.exports = planetModel;
