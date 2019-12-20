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

const logoutHandler = () => {
    config.clear()
}

const cloneHandler = argv => {
    const {source, destination} = argv
    const token = config.get("token")

    if (!token) {
        console.log(
            "\nYou are not logged in! Please run the 'login' command.\n",
        )

        console.log("labman login <username> <token>\n")
        return
    }

    createOctokit(token)
    clone(source, destination)
}

module.exports = {loginHandler, logoutHandler, cloneHandler}
