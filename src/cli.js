#!/usr/bin/env node

const yargs = require("yargs")
const {name} = require("../package.json")
const {loginHandler, logoutHandler, cloneHandler} = require("./handlers")

yargs
    .scriptName(name)
    .command(
        "login <username> <token>",
        "Persist GitHub credentials.",
        {},
        loginHandler,
    )
    .command("logout", "Remove GitHub credentials.", {}, logoutHandler)
    .command(
        "clone <source> <destination>",
        "Clone issue labels from one repo to another.",
        {},
        cloneHandler,
    )
    .help()
    .alias("help", "h")
    .alias("version", "v").argv
