const conf = require("conf")
const clone = require("./clone")
const {createOctokit} = require("./octokit")

const config = new conf()

const loginHandler = async argv => {
    const {username, token} = argv

    const octokit = createOctokit(token)

    try {
        await octokit.users.getAuthenticated()
        config.set({username, token})
        console.log("Login successful!")
    } catch (error) {
        console.log("Login failed! Please try again.")
    }
}

const cloneHandler = argv => {
    const {token, source, destination} = argv

    createOctokit(token)
    clone(source, destination)
}

module.exports = {loginHandler, cloneHandler}
