const dotenv = require("dotenv")
const Octokit = require("@octokit/rest")

dotenv.config()

const options = {auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN}
const octokit = new Octokit(options)

module.exports = octokit
