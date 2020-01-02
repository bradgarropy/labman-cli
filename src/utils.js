const conf = require("conf")

const repoPath = object => {
    const {owner, repo} = object
    const path = `${owner}/${repo}`

    return path
}

const repoObject = string => {
    const [owner, repo] = string.split("/")

    const object = {
        owner,
        repo,
    }

    return object
}

const repoAutocomplete = repo => {
    if (repo.includes("/")) {
        return repo
    }

    const config = new conf()
    const owner = config.get("username")

    const autocompleted = `${owner}/${repo}`
    return autocompleted
}

module.exports = {repoPath, repoObject, repoAutocomplete}
