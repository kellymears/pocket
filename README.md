# 🐹 Pocket

## A simple symlink utility command.

Basicaly just shortcuts `mv` && `ln` operations. Defaults to a symbolic link but can be passed a flag to make it a hard link.

## Usage

```sh
pocket <from> <to>
```
This is roughly equivalent to:

```sh
mv <from> <to>
ln -s <to> <from>
```

## Install

```sh
yarn global add pocket-util
```

## Options

| Flag       | What it does                            |
|------------|-----------------------------------------|
| --hard, -h | Leaves off the `ln` command's `-s` flag |
