const {validToken, validRepo} = require("../../github/validate")
const {createOctokit, getOctokit} = require("../../github/octokit")

jest.mock("../../github/octokit")

describe("validate", () => {
    test("valid token", async () => {
        createOctokit.mockImplementation(() => ({
            users: {
                getAuthenticated: () => true,
            },
        }))

        const isValidToken = await validToken("123456")
        expect(isValidToken).toBeTruthy()
    })

    test("invalid token", async () => {
        createOctokit.mockImplementation(() => ({
            users: {
                getAuthenticated: () => {
                    throw "Invalid token!"
                },
            },
        }))

        const isValidToken = await validToken("123456")
        expect(isValidToken).not.toBeTruthy()
    })

    test("valid repo", async () => {
        getOctokit.mockImplementation(() => ({
            repos: {
                get: () => true,
            },
        }))

        const isValidRepo = await validRepo("bradgarropy/labman-cli")
        expect(isValidRepo).toBeTruthy()
    })

    test("invalid repo", async () => {
        getOctokit.mockImplementation(() => ({
            repos: {
                get: () => {
                    throw "Invalid token!"
                },
            },
        }))

        const isValidRepo = await validRepo("bradgarropy/invalid-repo")
        expect(isValidRepo).not.toBeTruthy()
    })
})
