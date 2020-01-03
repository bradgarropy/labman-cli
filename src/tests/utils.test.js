const conf = require("conf")
const {repoPath, repoObject, repoAutocomplete} = require("../utils")

const config = new conf()

describe("repo path", () => {
    test("object", () => {
        const object = {
            owner: "bradgarropy",
            repo: "labman-cli",
        }

        const path = repoPath(object)
        expect(path).toEqual("bradgarropy/labman-cli")
    })

    test("empty object", () => {
        const object = {}

        const path = repoPath(object)
        expect(path).toEqual("")
    })

    test("no owner", () => {
        const object = {
            owner: "",
            repo: "labman-cli",
        }

        const path = repoPath(object)
        expect(path).toEqual("")
    })

    test("no repo", () => {
        const object = {
            owner: "bradgarropy",
            repo: "",
        }

        const path = repoPath(object)
        expect(path).toEqual("")
    })
})

describe("repo object", () => {
    test("string", () => {
        const expected = {
            owner: "bradgarropy",
            repo: "labman-cli",
        }

        const object = repoObject("bradgarropy/labman-cli")
        expect(object).toEqual(expected)
    })

    test("empty string", () => {
        const expected = {
            owner: "",
            repo: "",
        }

        const object = repoObject("")
        expect(object).toEqual(expected)
    })

    test("no owner", () => {
        const expected = {
            owner: "",
            repo: "",
        }

        const object = repoObject("")
        expect(object).toEqual(expected)
    })

    test("no repo", () => {
        const expected = {
            owner: "",
            repo: "",
        }

        const object = repoObject("")
        expect(object).toEqual(expected)
    })
})

describe("repo autocomplete", () => {
    const stored = {
        username: "bradgarropy",
        token: "123456",
    }

    config.set(stored)

    test("with owner", () => {
        const repo = repoAutocomplete("bradgarropy/labman-cli")
        expect(repo).toEqual("bradgarropy/labman-cli")
    })

    test("without owner", () => {
        const repo = repoAutocomplete("labman-cli")
        expect(repo).toEqual("bradgarropy/labman-cli")
    })
})
