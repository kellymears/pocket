#!/usr/bin/env node

const { realpath } = require('fs')
const chalk = require('chalk')
const execa = require('execa')
const meow = require('meow')

/**
 * Description
 */
const info = `
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
    },
  },
}

/**
 * Console
 */
const out = {
  log: msg => {
    console.log(msg)

    process.exit()
  },

  err: err => {
    console.error(chalk.red(err))

    process.exit()
  },
}

/**
 * Pocket
 */
const pocket = meow(info, options)

const args = {
  from: pocket.input[0] ? pocket.input[0] : null,
  dest: pocket.input[1] ? pocket.input[1] : null,
}

const flags = (() => {
  return ! (pocket.flags.hard) ? `-s` : ``
})()

const validate = ({ from, dest }) => {
  if (! (from && dest)) {
    out.log(info)

    return false;
  }

  return true
}

validate(args) && (async () => {
  try {
    await execa.command(`mv ${args.from} ${args.dest}`)
    await execa.command(`ln ${flags} ${args.dest} ${args.from}`)
  } catch (err) {
    out.err(err)
  }
})()
