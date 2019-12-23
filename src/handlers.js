const conf = require("conf")
const chalk = require("chalk")
const clone = require("./clone")
const {validToken} = require("./github")
const {createOctokit} = require("./octokit")

const config = new conf()

const loginHandler = async argv => {
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

const logoutHandler = () => {
    config.clear()
}

const cloneHandler = async argv => {
    const {source, destination, labels} = argv
    const token = config.get("token")

    if (!token) {
        console.log(
            `\nYou are not logged in, please run the ${chalk.cyanBright(
                "login",
            )} command.\n`,
        )

        console.log(chalk.cyanBright("labman login <username> <token>\n"))
        return
    }

    createOctokit(token)

    try {
        await clone(source, destination, labels)
    } catch (error) {
        console.log(
            `\n${chalk.redBright(
                "Invalid token!",
            )} Please run the ${chalk.cyanBright("login")} command again.\n`,
        )
        console.log(chalk.cyanBright("labman login <username> <token>\n"))
    }
}

module.exports = {loginHandler, logoutHandler, cloneHandler}
