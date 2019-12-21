const {createOctokit, getOctokit} = require("./octokit")

const getRateLimit = async () => {
    const octokit = getOctokit()
    const response = await octokit.rateLimit.get()
    const {limit, remaining} = response.data.resources.core

    console.log(`${remaining}/${limit} remaining`)
}

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
    console.log(`\nDeleting labels from ${owner}/${repo}`)

    const octokit = getOctokit()

    labels.forEach(label => {
        console.log(` - ${label.name}`)

        const parameters = {
            owner,
            repo,
            name: label.name,
        }

        octokit.issues.deleteLabel(parameters)
    })
}

const createLabels = async (labels, owner, repo) => {
    console.log(`\nCreating labels in ${owner}/${repo}`)

    const octokit = getOctokit()

    labels.forEach(label => {
        console.log(` - ${label.name}`)

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
    getRateLimit,
    validToken,
    getLabels,
    deleteLabels,
    createLabels,
}
