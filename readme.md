# 👨🏼‍🔬 github label manager cli

<a href="https://www.npmjs.com/package/labman">
    <img alt="npm" src="https://img.shields.io/npm/v/labman.svg?color=FB3B49&style=flat-square">
</a>

_Command line tool for managing issue labels across GitHub repositories._

## 📦 Installation

Installation is optional, as you can run this package with [`npx`][npx].

```
npm install labman --global
```

## 🥑 Usage

If you have `labman` installed globally you can run it as shown below.

```
labman login <username> <token>
labman <source> <destination>
```

Where `token` is a GitHub [personal access token][token] with `repo` scope.  
Where `source` and `destination` are GitHub repositories in the form of `owner/repo`.

Here is an example.

```
labman login bradgarropy 1234abcd
labman bradgarropy/label-source bradgarropy/label-destination
```

Alternatively, you can run it with [`npx`][npx].

```
npx labman login <username> <token>
npx labman <source> <destination>
```

## ❔ Questions

If you have any trouble, definitely [open an issue][issue] and I'll take a look.

If all else fails, you can ask me directly on [Twitter][twitter] or my [AMA][ama].

[npx]: https://www.npmjs.com/package/npx
[token]: https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line
[issue]: https://github.com/bradgarropy/labman-cli/issues
[twitter]: https://twitter.com/bradgarropy
[ama]: https://github.com/bradgarropy/ama
