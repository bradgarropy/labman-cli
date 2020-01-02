const {repoObject} = require("../utils")
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

module.exports = {
    validToken,
    validRepo,
}
