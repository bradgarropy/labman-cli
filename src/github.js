const chalk = require("chalk")
const {repoPath, repoObject} = require("./utils")
const {createOctokit, getOctokit} = require("./octokit")
const {errorRepoNotFound, errorLabelExists} = require("./errors")

const validToken = async token => {
    const octokit = createOctokit(token)

    try {
        await octokit.users.getAuthenticated()
    } catch (error) {
        return false
    }

    return true
}

const validRepo = async repo => {
    const octokit = getOctokit()
    const parameters = repoObject(repo)

    try {
        await octokit.repos.get(parameters)
    } catch (error) {
        return false
    }

    return true
}

const getLabels = async repo => {
    const octokit = getOctokit()

    const parameters = repoObject(repo)
    const response = await octokit.issues.listLabelsForRepo(parameters)

    const labels = response.data
    return labels
}

const deleteLabels = async (labels, repo) => {
    console.log()
    console.log(`Deleting labels from ${chalk.cyanBright(repo)}`)
    console.log()

    const octokit = getOctokit()

    labels.forEach(label => {
        const {name} = label
        console.log(` ${chalk.bold.redBright("-")} ${name}`)

        const parameters = {
            ...repoObject(repo),
            name,
        }

        octokit.issues.deleteLabel(parameters)
    })
}

const createLabels = async (labels, repo) => {
    console.log()
    console.log(`Creating labels in ${chalk.cyanBright(repo)}`)
    console.log()

    const octokit = getOctokit()

    labels.forEach(async label => {
        const {name, color, description} = label

        const parameters = {
            ...repoObject(repo),
            name,
            color,
            description,
        }

        try {
            await octokit.issues.createLabel(parameters)
            console.log(` ${chalk.bold.greenBright("+")} ${name}`)
        } catch (error) {
            const {status} = error

            switch (status) {
                case 404:
                    errorRepoNotFound(repo)
                    process.exit()
                    break

                case 422:
                    errorLabelExists(name)
                    break
            }
        }
    })
}

module.exports = {
    validToken,
    validRepo,
    getLabels,
    deleteLabels,
    createLabels,
}
