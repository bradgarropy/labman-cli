const labels = require("./labels")
const octokit = require("./octokit")
const validate = require("./validate")

module.exports = {
    ...labels,
    ...octokit,
    ...validate,
}
