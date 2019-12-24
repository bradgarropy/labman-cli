const {getLabels, deleteLabels, createLabels} = require("./github")

const copy = async (source, destination, labels = [], clobber = false) => {
    const [sourceOwner, sourceRepo] = source.split("/")
    const [destinationOwner, destinationRepo] = destination.split("/")

    // delete existing labels
    if (clobber) {
        const oldLabels = await getLabels(destinationOwner, destinationRepo)
        await deleteLabels(oldLabels, destinationOwner, destinationRepo)
    }

    // create new labels
    const sourceLabels = await getLabels(sourceOwner, sourceRepo)

    const newLabels = labels.length
        ? sourceLabels.filter(label => labels.includes(label.name))
        : sourceLabels

    await createLabels(newLabels, destinationOwner, destinationRepo)
}

module.exports = copy
