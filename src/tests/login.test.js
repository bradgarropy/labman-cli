const conf = require("conf")
const {validToken} = require("../github")
const {errorLoginFailed} = require("../errors")
const {handler: loginHandler} = require("../cli/login")
const {handler: logoutHandler} = require("../cli/logout")

jest.mock("../errors")
jest.mock("../github")

beforeEach(() => {
    logoutHandler()
    jest.clearAllMocks()
})

const config = new conf()

describe("login", () => {
    test("valid token", async () => {
        validToken.mockImplementation(() => true)

        const args = {
            username: "bradgarropy",
            token: "123456",
            force: false,
        }

        await loginHandler(args)

        expect(validToken.mock.calls.length).toEqual(1)
        expect(errorLoginFailed.mock.calls.length).toEqual(0)
        expect(config.get("username")).toEqual(args.username)
        expect(config.get("token")).toEqual(args.token)
    })

    test("invalid token", async () => {
        validToken.mockImplementation(() => false)

        const args = {
            username: "bradgarropy",
            token: "123456",
            force: false,
        }

        await loginHandler(args)

        expect(validToken.mock.calls.length).toEqual(1)
        expect(errorLoginFailed.mock.calls.length).toEqual(1)
        expect(config.get("username")).toEqual(undefined)
        expect(config.get("token")).toEqual(undefined)
    })

    test("existing token", async () => {
        const stored = {
            username: "bradgarropy",
            token: "456789",
        }

        config.set(stored)

        const args = {
            username: "bradgarropy",
            token: "123456",
            force: false,
        }

        await loginHandler(args)

        expect(validToken.mock.calls.length).toEqual(0)
        expect(errorLoginFailed.mock.calls.length).toEqual(0)
        expect(config.get("username")).toEqual(stored.username)
        expect(config.get("token")).toEqual(stored.token)
    })

    test("force", async () => {
        validToken.mockImplementation(() => true)

        const stored = {
            username: "bradgarropy",
            token: "456789",
        }

        config.set(stored)

        const args = {
            username: "bradgarropy",
            token: "123456",
            force: true,
        }

        await loginHandler(args)

        expect(validToken.mock.calls.length).toEqual(1)
        expect(errorLoginFailed.mock.calls.length).toEqual(0)
        expect(config.get("username")).toEqual(args.username)
        expect(config.get("token")).toEqual(args.token)
    })
})
