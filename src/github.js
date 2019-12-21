const chalk = require("chalk")
const {createOctokit, getOctokit} = require("./octokit")

const validToken = async token => {
    const octokit = createOctokit(token)

    try {
        await octokit.users.getAuthenticated()
    } catch (error) {
        return false
    }

    return true
}

const getLabels = async (owner, repo) => {
    const parameters = {
        owner,
        repo,
    }

    const octokit = getOctokit()
    const response = await octokit.issues.listLabelsForRepo(parameters)

    const labels = response.data
    return labels
}

const deleteLabels = async (labels, owner, repo) => {
    console.log(
        `\nDeleting labels from ${chalk.cyanBright(`${owner}/${repo}`)}\n`,
    )

    const octokit = getOctokit()

    labels.forEach(label => {
        console.log(` ${chalk.bold.redBright("-")} ${label.name}`)

        const parameters = {
            owner,
            repo,
            name: label.name,
        }

        octokit.issues.deleteLabel(parameters)
    })
}

const createLabels = async (labels, owner, repo) => {
    console.log(
        `\nCreating labels in ${chalk.cyanBright(`${owner}/${repo}`)}\n`,
    )

    const octokit = getOctokit()

    labels.forEach(label => {
        console.log(` ${chalk.bold.greenBright("+")} ${label.name}`)

        const parameters = {
            owner,
            repo,
            name: label.name,
            color: label.color,
            description: label.description,
        }

        octokit.issues.createLabel(parameters)
    })
}

module.exports = {
    validToken,
    getLabels,
    deleteLabels,
    createLabels,
}
