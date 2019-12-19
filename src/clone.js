const {getLabels, deleteLabels, createLabels} = require("./github")

const clone = async (source, destination) => {
    console.log(source, destination)
    const [sourceOwner, sourceRepo] = source.split("/")
    const [destinationOwner, destinationRepo] = destination.split("/")

    // delete existing labels
    const oldLabels = await getLabels(destinationOwner, destinationRepo)
    await deleteLabels(oldLabels, destinationOwner, destinationRepo)

    // create new labels
    const newLabels = await getLabels(sourceOwner, sourceRepo)
    await createLabels(newLabels, destinationOwner, destinationRepo)
}

module.exports = clone
