const conf = require("conf")
const chalk = require("chalk")
const copy = require("../copy")
const {createOctokit} = require("../octokit")

const config = new conf()

const command = "* <source> <destination> [labels...]"
const description = "Copy issue labels from one repo to another"

const builder = {
    clobber: {
        alias: "c",
        type: "boolean",
        default: false,
        description: "Clobber destination labels",
    },
}

const handler = async argv => {
    const {source, destination, labels, clobber} = argv
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
        await copy(source, destination, labels, clobber)
    } catch (error) {
        console.log(
            `\n${chalk.redBright(
                "Invalid token!",
            )} Please run the ${chalk.cyanBright("login")} command again.\n`,
        )
        console.log(chalk.cyanBright("labman login <username> <token>\n"))
    }
}

module.exports = {
    command,
    description,
    builder,
    handler,
}
