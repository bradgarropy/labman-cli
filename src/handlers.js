const clone = require("./clone")
const {createOctokit} = require("./octokit")

const loginHandler = argv => {
    const {username, token} = argv
    console.log("loginHandler")
    console.log(username, token)
}

const cloneHandler = argv => {
    const {token, source, destination} = argv

    createOctokit(token)
    clone(source, destination)
}

module.exports = {loginHandler, cloneHandler}
