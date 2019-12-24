const conf = require("conf")
const chalk = require("chalk")
const {validToken} = require("../github")

const config = new conf()

const command = "login <username> <token>"
const description = "Persist GitHub credentials"

const builder = {
    force: {
        alias: "f",
        type: "boolean",
        default: false,
        description: "Force login",
    },
}

const handler = async argv => {
    const {username, token, force} = argv
    const storedToken = config.get("token")

    if (!force && storedToken) {
        console.log("\nYou are already logged in!\n")
        return
    }

    const valid = await validToken(token)

    if (!valid) {
        console.log(`\n${chalk.redBright("Login failed!")} Please try again.\n`)
        return
    }

    config.set({username, token})
    console.log(chalk.greenBright("\nLogin successful!\n"))

    return
}

module.exports = {
    command,
    description,
    builder,
    handler,
}
