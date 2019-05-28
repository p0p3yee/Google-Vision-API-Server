const jsonFile = require("jsonfile");
const ctc = jsonFile.readFileSync("./ctc.json");

module.exports = {
    get: num => ctc[String(num)]
}