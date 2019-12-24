const conf = require("conf")

const config = new conf()

const command = "logout"
const description = "Remove GitHub credentials"
const builder = {}
const handler = () => config.clear()

module.exports = {
    command,
    description,
    builder,
    handler,
}
