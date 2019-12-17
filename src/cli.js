const yargs = require("yargs")
const {cloneLabels} = require("./clone")

const args = yargs
    .command(
        "clone <source> <destination>",
        "Clone issue labels from one repo to another.",
    )
    .help()
    .alias("help", "h")
    .alias("version", "v").argv

const {source, destination} = args
console.log(source, destination)

cloneLabels(source, destination)
