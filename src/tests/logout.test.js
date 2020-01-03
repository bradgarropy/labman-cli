const conf = require("conf")
const {handler} = require("../cli/logout")

const config = new conf()

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
