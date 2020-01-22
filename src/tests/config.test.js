const config = require("../config")
const {name} = require("../../package.json")

describe("config", () => {
    test("config", () => {
        expect(config).toHaveProperty("path", expect.stringContaining(name))
    })
})
