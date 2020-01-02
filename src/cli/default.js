const conf = require("conf")
const {repoAutocomplete} = require("../utils")
const {
    errorTokenNotFound,
    errorInvalidToken,
    errorRepoNotFound,
} = require("../errors")
const {
    createOctokit,
    validToken,
    validRepo,
    getLabels,
    deleteLabels,
    createLabels,
} = require("../github")

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

    const source = repoAutocomplete(argv.source)
    const destination = repoAutocomplete(argv.destination)

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
    const {labels, clobber} = argv

    // delete existing labels
    if (clobber) {
        const oldLabels = await getLabels(destination)
        await deleteLabels(oldLabels, destination)
    }

    // get new labels
    const sourceLabels = await getLabels(source)

    const newLabels = labels.length
        ? sourceLabels.filter(label => labels.includes(label.name))
        : sourceLabels

    // create new labels
    await createLabels(newLabels, destination)
}

module.exports = {
    command,
    description,
    builder,
    handler,
}
