#!/usr/bin/env node

const chalk = require('chalk')
const meow = require('meow')
const execa = require('execa')

/**
 * About template
 */
const about = `
  ${chalk.yellow(`🐹  Pocket`)}
  ${chalk.italic(`A simple symlink utility command.`)}

  ${chalk.cyan(`Usage`)}
    ${chalk.white(`$ pocket <from-file> <to-file>`)}

  ${chalk.cyan(`Options`)}
    ${chalk.blueBright(`--hard, -h`)}  ${chalk.white(`Make a hard link`)}

  ${chalk.cyan(`Example`)}
    ${chalk.white(`$ pocket ~/.zshrc ~/.dotfiles/.zshrc`)}`

/**
 * Options
 */
const options = {
  autoHelp: true,
  version: '1.0.0',
  flags: {
		hard: {
      alias: 'h',
      default: false,
			type: 'boolean',
		}
	},
}

/**
 * Pocket
 */
const pocket = meow(about, options)

const hasInputs = () => pocket.input[0] && pocket.input[1]
const lnFlags = () => {
  if (! pocket.flags[`hard`]) {
    return;
  }

  return `-s`;
}

! hasInputs() ? console.log(about) : (
  async () => {
    try {
      await execa.command(
        `mv ${pocket.input[0]} ${pocket.input[1]}`
      )

      await execa.command(
        `ln ${lnFlags()} ${pocket.input[1]} ${pocket.input[0]}`
      )
    } catch (err) {
      console.log(`${chalk.red(err)}`)
      process.exit()
    }
  }
)()
