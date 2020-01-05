const {createOctokit, getOctokit} = require("../../github")

describe("octokit", () => {
    test("create", () => {
        const octokit = createOctokit("123456")

        const keys = Object.keys(octokit)

        expect(keys).toContainEqual("users")
        expect(keys).toContainEqual("repos")
        expect(keys).toContainEqual("issues")
    })

    test("get", () => {
        const octokit = getOctokit()

        const keys = Object.keys(octokit)

        expect(keys).toContainEqual("users")
        expect(keys).toContainEqual("repos")
        expect(keys).toContainEqual("issues")
    })
})
