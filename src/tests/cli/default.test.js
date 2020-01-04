const conf = require("conf")
const {handler: logoutHandler} = require("../../cli/logout")
const {handler: defaultHandler} = require("../../cli/default")
const {
    errorTokenNotFound,
    errorInvalidToken,
    errorRepoNotFound,
} = require("../../errors")
const {
    validToken,
    validRepo,
    getLabels,
    deleteLabels,
    createLabels,
} = require("../../github")

jest.mock("../../errors")
jest.mock("../../github")

beforeEach(() => logoutHandler())

const config = new conf()

describe("default", () => {
    test("token not found", async () => {
        const args = {
            source: "bradgarropy/label-source",
            destination: "bradgarropy/label-destination",
            labels: [],
            clobber: false,
        }

        await defaultHandler(args)
        expect(errorTokenNotFound).toHaveBeenCalledTimes(1)
    })

    test("invalid token", async () => {
        validToken.mockImplementation(() => false)

        const stored = {
            username: "bradgarropy",
            token: "123456",
        }

        config.set(stored)

        const args = {
            source: "bradgarropy/label-source",
            destination: "bradgarropy/label-destination",
            labels: [],
            clobber: false,
        }

        await defaultHandler(args)
        expect(errorInvalidToken).toHaveBeenCalledTimes(1)
    })

    test("without owner", async () => {
        validToken.mockImplementation(() => true)
        validRepo.mockImplementation(() => true)

        const stored = {
            username: "bradgarropy",
            token: "123456",
        }

        config.set(stored)

        const args = {
            source: "label-source",
            destination: "label-destination",
            labels: [],
            clobber: false,
        }

        await defaultHandler(args)

        expect(validRepo).toHaveBeenCalledTimes(2)
        expect(validRepo).toHaveBeenCalledWith("bradgarropy/label-source")
        expect(validRepo).toHaveBeenCalledWith("bradgarropy/label-destination")
    })

    test("invalid source", async () => {
        validToken.mockImplementation(() => true)
        validRepo.mockImplementationOnce(() => false)

        const stored = {
            username: "bradgarropy",
            token: "123456",
        }

        config.set(stored)

        const args = {
            source: "bradgarropy/invalid-source",
            destination: "bradgarropy/label-destination",
            labels: [],
            clobber: false,
        }

        await defaultHandler(args)

        expect(validRepo).toHaveBeenCalledTimes(1)
        expect(validRepo).toHaveBeenCalledWith(args.source)
        expect(errorRepoNotFound).toHaveBeenCalledTimes(1)
    })

    test("invalid destination", async () => {
        validToken.mockImplementation(() => true)
        validRepo
            .mockImplementationOnce(() => true)
            .mockImplementationOnce(() => false)

        const stored = {
            username: "bradgarropy",
            token: "123456",
        }

        config.set(stored)

        const args = {
            source: "bradgarropy/label-source",
            destination: "bradgarropy/invalid-destination",
            labels: [],
            clobber: false,
        }

        await defaultHandler(args)

        expect(validRepo).toHaveBeenCalledTimes(2)
        expect(validRepo).toHaveBeenNthCalledWith(2, args.destination)
        expect(errorRepoNotFound).toHaveBeenCalledTimes(1)
    })

    test("with labels", async () => {
        const argLabels = ["bug", "todo"]

        const existingLabels = [
            {name: "bug"},
            {name: "enhance"},
            {name: "explore"},
            {name: "todo"},
        ]

        const newLabels = [{name: "bug"}, {name: "todo"}]

        validToken.mockImplementation(() => true)
        validRepo.mockImplementation(() => true)
        getLabels.mockImplementation(() => existingLabels)

        const stored = {
            username: "bradgarropy",
            token: "123456",
        }

        config.set(stored)

        const args = {
            source: "bradgarropy/label-source",
            destination: "bradgarropy/label-destination",
            labels: argLabels,
            clobber: false,
        }

        await defaultHandler(args)

        expect(getLabels).toHaveBeenCalledTimes(1)
        expect(getLabels).toHaveBeenNthCalledWith(1, args.source)
        expect(createLabels).toHaveBeenCalledTimes(1)
        expect(createLabels).toHaveBeenNthCalledWith(
            1,
            newLabels,
            args.destination,
        )
    })

    test("clobber", async () => {
        const labels = [
            {name: "bug"},
            {name: "enhance"},
            {name: "explore"},
            {name: "todo"},
        ]

        validToken.mockImplementation(() => true)
        validRepo.mockImplementation(() => true)
        getLabels.mockImplementation(() => labels)

        const stored = {
            username: "bradgarropy",
            token: "123456",
        }

        config.set(stored)

        const args = {
            source: "bradgarropy/label-source",
            destination: "bradgarropy/label-destination",
            labels: [],
            clobber: true,
        }

        await defaultHandler(args)

        expect(getLabels).toHaveBeenCalledTimes(2)
        expect(getLabels).toHaveBeenNthCalledWith(1, args.destination)
        expect(deleteLabels).toHaveBeenCalledTimes(1)
        expect(deleteLabels).toHaveBeenNthCalledWith(
            1,
            labels,
            args.destination,
        )
    })
})
