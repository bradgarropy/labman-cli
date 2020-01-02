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

module.exports = {repoPath, repoObject}
