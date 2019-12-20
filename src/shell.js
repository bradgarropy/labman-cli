const {execSync} = require("child_process")

const shell = (command, options) => {
    const buffer = execSync(command, options)
    const output = buffer.toString()
    console.log(output)

    return output
}

module.exports = shell
