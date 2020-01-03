const chalk = require("chalk")

const errorTokenNotFound = () => {
    const commandText = chalk.cyanBright("login")

    console.log()
    console.log(`You are not logged in, please run the ${commandText} command.`)
    console.log()
    console.log(chalk.cyanBright("labman login <username> <token>"))
}

const errorInvalidToken = () => {
    const errorText = chalk.redBright("Invalid token!")
    const commandText = chalk.cyanBright("login")

    console.log()
    console.log(`${errorText} Please run the ${commandText} command again.`)
    console.log()
    console.log(chalk.cyanBright("labman login <username> <token>"))
}

const errorLoginFailed = () => {
    const errorText = chalk.redBright("Login failed!")

    console.log()
    console.log(`${errorText} Please try again.`)
}

const errorRepoNotFound = repo => {
    const repoText = repo ? chalk.bold.cyanBright(` ${repo} `) : " "
    const errorText = chalk.bold.redBright(
        `Repository${repoText}does not exist!`,
    )

    console.log()
    console.log(errorText)
}

const errorLabelExists = label => {
    const labelText = label ? chalk.bold.cyanBright(` ${label} `) : " "
    const errorText = chalk.bold.redBright(
        ` x Label${labelText}already exists!`,
    )

    console.log(errorText)
}

module.exports = {
    errorTokenNotFound,
    errorInvalidToken,
    errorLoginFailed,
    errorRepoNotFound,
    errorLabelExists,
}
