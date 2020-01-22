const config = require("./config")

const repoPath = object => {
    const {owner, repo} = object

    if (!owner || !repo) {
        return ""
    }

    const path = `${owner}/${repo}`
    return path
}

const repoObject = string => {
    const [owner, repo] = string.split("/")

    if (!owner || !repo) {
        return {
            owner: "",
            repo: "",
        }
    }

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

    const owner = config.get("username")

    const autocompleted = `${owner}/${repo}`
    return autocompleted
}

module.exports = {repoPath, repoObject, repoAutocomplete}
