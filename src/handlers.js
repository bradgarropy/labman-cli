const conf = require("conf")
const clone = require("./clone")
const {validToken} = require("./github")
const {createOctokit} = require("./octokit")

const config = new conf()

const loginHandler = async argv => {
    const {username, token, force} = argv
    const storedToken = config.get("token")

    if (!force && storedToken) {
        console.log("\nYou are already logged in!")
        return
    }

    const valid = await validToken(token)

    if (!valid) {
        console.log("Login failed! Please try again.")
        return
    }

    config.set({username, token})
    console.log("Login successful!")

    return
}

const logoutHandler = () => {
    config.clear()
}

const cloneHandler = async argv => {
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

    try {
        await clone(source, destination)
    } catch (error) {
        console.log("\nInvalid token! Please run the 'login' command again.\n")
        console.log("labman login <username> <token>\n")
    }
}

module.exports = {loginHandler, logoutHandler, cloneHandler}
