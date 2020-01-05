const {getOctokit} = require("../../github/octokit")
const {getLabels, deleteLabels, createLabels} = require("../../github/labels")

jest.mock("../../github/octokit")

describe("labels", () => {
    test("get", async () => {
        const expectedLabels = [
            {name: "bug"},
            {name: "enhance"},
            {name: "todo"},
        ]

        getOctokit.mockImplementation(() => ({
            issues: {
                listLabelsForRepo: () => {
                    const labels = {data: expectedLabels}
                    return labels
                },
            },
        }))

        const labels = await getLabels("bradgarropy/label-source")

        expect(labels).toEqual(expectedLabels)
    })

    test("delete", async () => {
        getOctokit.mockImplementation(() => ({
            issues: {
                deleteLabel: jest.fn(),
            },
        }))

        const actual = await deleteLabels(
            ["bug", "enhance", "todo"],
            "bradgarropy/label-destination",
        )

        expect(actual).toBeUndefined()
    })

    test("create", async () => {
        getOctokit.mockImplementation(() => ({
            issues: {
                createLabel: jest.fn(),
            },
        }))

        const actual = await createLabels(
            ["bug", "enhance", "todo"],
            "bradgarropy/label-destination",
        )

        expect(actual).toBeUndefined()
    })

    test("label exists", async () => {
        getOctokit.mockImplementation(() => ({
            issues: {
                createLabel: () => {
                    throw "Label exists!"
                },
            },
        }))

        const actual = await createLabels(
            ["bug", "enhance", "todo"],
            "bradgarropy/label-destination",
        )

        expect(actual).toBeUndefined()
    })
})
