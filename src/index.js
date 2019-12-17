const {getRateLimit, getLabels, deleteLabels, createLabels} = require("./api")

const cloneLabels = async (source, destination) => {
    // check rate limit
    await getRateLimit()

    // delete existing labels
    const oldLabels = await getLabels("bradgarropy", destination)
    await deleteLabels(oldLabels, "bradgarropy", destination)

    // create new labels
    const newLabels = await getLabels("bradgarropy", source)
    await createLabels(newLabels, "bradgarropy", destination)
}

cloneLabels("adobe-lunch", "labman")
