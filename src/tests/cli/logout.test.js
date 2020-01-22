const config = require("../../config")
const {handler} = require("../../cli/logout")

describe("logout", () => {
    test("logout", () => {
        const stored = {
            username: "bradgarropy",
            token: "456789",
        }

        config.set(stored)

        handler()
        expect(config.get("username")).toBeUndefined()
        expect(config.get("token")).toBeUndefined()
    })
})
