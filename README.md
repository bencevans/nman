# nman

node man page for easy access readme documents, just like linux man page but in nodejs! :)

## Install

```
npm install -g nman
```

## Usage

```
  Usage: nman [options] <a npm module>

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    -l, --list     List all npm modules.
```

If you have install a node module express, you can enter 

```
 nman commander
```

this will print the `readme.md` to terminal.

**You have to have at the same path, where your `node_modules` are. While you are entering the `nman` command. I might improve this in the future.**


## License

MIT [@chilijung](http://github.com/chilijung)
