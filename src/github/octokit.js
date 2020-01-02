const Octokit = require("@octokit/rest")

let octokit

const createOctokit = token => {
    const options = {auth: token}
    octokit = new Octokit(options)
    return octokit
}

const getOctokit = () => octokit

module.exports = {
    getOctokit,
    createOctokit,
}
