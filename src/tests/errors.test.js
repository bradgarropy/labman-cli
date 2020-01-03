const {
    errorTokenNotFound,
    errorInvalidToken,
    errorLoginFailed,
    errorRepoNotFound,
    errorLabelExists,
} = require("../errors")

let logs
const consoleLog = console.log

beforeEach(() => {
    logs = []
    console.log = message => logs.push(message)
})

afterEach(() => (console.log = consoleLog))

describe("token", () => {
    test("not found", () => {
        errorTokenNotFound()
        expect(logs).toMatchSnapshot()
    })

    test("invalid", () => {
        errorInvalidToken()
        expect(logs).toMatchSnapshot()
    })
})

describe("login ", () => {
    test("failed", () => {
        errorLoginFailed()
        expect(logs).toMatchSnapshot()
    })
})

describe("repo not found", () => {
    test("with string", () => {
        errorRepoNotFound("bradgarropy/labman-cli")
        expect(logs).toMatchSnapshot()
    })

    test("without string", () => {
        errorRepoNotFound("")
        expect(logs).toMatchSnapshot()
    })
})

describe("label exists", () => {
    test("with string", () => {
        errorLabelExists("todo")
        expect(logs).toMatchSnapshot()
    })

    test("without string", () => {
        errorLabelExists("")
        expect(logs).toMatchSnapshot()
    })
})
