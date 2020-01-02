const conf = require("conf")
const chalk = require("chalk")
const {validToken} = require("../github")
const {errorLoginFailed} = require("../errors")

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
        console.log()
        console.log("You are already logged in!")
        return
    }

    const valid = await validToken(token)

    if (!valid) {
        errorLoginFailed()
        return
    }

    config.set({username, token})

    console.log()
    console.log(chalk.greenBright("Login successful!"))

    return
}

module.exports = {
    command,
    description,
    builder,
    handler,
}
