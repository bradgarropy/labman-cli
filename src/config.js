const conf = require("conf")
const {name} = require("../package.json")

const options = {
    projectName: name,
}

const config = new conf(options)

module.exports = config
