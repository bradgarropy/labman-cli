#!/usr/bin/env node

const yargs = require("yargs")
const clone = require("./clone")
const {createOctokit} = require("./octokit")

const args = yargs
    .command(
        "clone <token> <source> <destination>",
        "Clone issue labels from one repo to another.",
    )
    .help()
    .alias("help", "h")
    .alias("version", "v").argv

const {token, source, destination} = args

createOctokit(token)
clone(source, destination)
