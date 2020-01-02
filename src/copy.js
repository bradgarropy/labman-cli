const {getLabels, deleteLabels, createLabels} = require("./github")

const copy = async (source, destination, labels = [], clobber = false) => {
    // delete existing labels
    if (clobber) {
        const oldLabels = await getLabels(destination)
        await deleteLabels(oldLabels, destination)
    }

    // create new labels
    const sourceLabels = await getLabels(source)

    const newLabels = labels.length
        ? sourceLabels.filter(label => labels.includes(label.name))
        : sourceLabels

    await createLabels(newLabels, destination)
}

module.exports = copy
