const octokit = require("./octokit")

const getRateLimit = async () => {
    const response = await octokit.rateLimit.get()
    const {limit, remaining} = response.data.resources.core

    console.log(`${remaining}/${limit} remaining`)
    return
}

const getLabels = async (owner, repo) => {
    const parameters = {
        owner,
        repo,
    }

    const response = await octokit.issues.listLabelsForRepo(parameters)

    const labels = response.data
    return labels
}

const deleteLabels = async (labels, owner, repo) => {
    console.log("\nDeleting")

    labels.forEach(label => {
        console.log(label.name)

        const parameters = {
            owner,
            repo,
            name: label.name,
        }

        octokit.issues.deleteLabel(parameters)
    })

    return
}

const createLabels = async (labels, owner, repo) => {
    console.log("\nCreating")

    labels.forEach(label => {
        console.log(label.name)

        const parameters = {
            owner,
            repo,
            name: label.name,
            color: label.color,
            description: label.description,
        }

        octokit.issues.createLabel(parameters)
    })

    return
}

module.exports = {
    getRateLimit,
    getLabels,
    deleteLabels,
    createLabels,
}
