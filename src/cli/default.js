const conf = require("conf")
const copy = require("../copy")
const {createOctokit} = require("../octokit")
const {validToken, validRepo} = require("../github")
const {
    errorTokenNotFound,
    errorInvalidToken,
    errorRepoNotFound,
} = require("../errors")

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

    // validate token
    if (!token) {
        errorTokenNotFound()
        return
    }

    const isValidToken = await validToken(token)

    // validate token
    if (!isValidToken) {
        errorInvalidToken()
        return
    }

    const isValidSource = await validRepo(source)

    // validate source
    if (!isValidSource) {
        errorRepoNotFound(source)
        return
    }

    const isValidDestination = await validRepo(destination)

    // validate destination
    if (!isValidDestination) {
        errorRepoNotFound(destination)
        return
    }

    createOctokit(token)
    await copy(source, destination, labels, clobber)
}

module.exports = {
    command,
    description,
    builder,
    handler,
}
