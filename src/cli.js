#!/usr/bin/env node

const yargs = require("yargs")
const {cloneLabels} = require("./clone")

const args = yargs
    .command(
        "clone <token> <source> <destination>",
        "Clone issue labels from one repo to another.",
    )
    .help()
    .alias("help", "h")
    .alias("version", "v").argv

const {token, source, destination} = args
console.log(token, source, destination)

cloneLabels(source, destination)
