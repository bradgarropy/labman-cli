const axios = require("axios")
const express = require("express")
const {oauthLoginUrl} = require("@octokit/oauth-login-url")
const shell = require("./shell")

const GITHUB_CLIENT_ID = "da3378aa731213ef5cfa"
const GITHUB_CLIENT_SECRET = "3983ffe81bbb36864f11d31d76b85f27560c47f3"

const app = express()
const port = 8080

const server = app.listen(port, () => console.log(`Listening on port ${port}!`))

app.get("/", async (req, res) => {
    console.log(req.query)

    const code = req.query.code
    const token = await getToken(code)

    console.log(token)

    res.end()
    server.close()
})

const {url} = oauthLoginUrl({
    clientId: GITHUB_CLIENT_ID,
    scopes: ["repo"],
})

shell(`open '${url}'`)

const getToken = async code => {
    const parameters = {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
    }

    const config = {
        headers: {Accept: "application/json"},
    }

    const {data} = await axios.post(
        "https://github.com/login/oauth/access_token",
        parameters,
        config,
    )

    console.log(data)

    const token = data.access_token
    return token
}
