const conf = require("conf")
const chalk = require("chalk")

const config = new conf()

const command = "logout"
const description = "Remove GitHub credentials"
const builder = {}

const handler = () => {
    config.clear()
    console.log(chalk.greenBright("\nLogout successful!\n"))

    return
}

module.exports = {
    command,
    description,
    builder,
    handler,
}
