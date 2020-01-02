#!/usr/bin/env node

const yargs = require("yargs")
const {name} = require("../../package.json")

yargs
    .scriptName(name)
    .command(require("./login"))
    .command(require("./logout"))
    .command(require("./default"))
    .help()
    .alias("help", "h")
    .alias("version", "v").argv
