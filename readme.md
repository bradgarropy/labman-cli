# 👨🏼‍🔬 github label manager cli

## 📦 Installation

Installation is optional, as you can run this package with [`npx`][npx].

```
npm install labman --global
```

## 🥑 Usage

If you have `labman` installed globally you can run it as shown below.

```
labman clone <token> <source> <destination>
```

Where `token` is your GitHub [personal access token][token].  
Where `source` and `destination` are GitHub repositories in the form of `owner/repo`.

Here is an example.

```
labman clone 1234abcd bradgarropy/label-source bradgarropy/label-destination
```

Alternatively, you can run it with [`npx`][npx].

```
npx labman clone <token> <source> <destination>
```

## ❔ Questions

If you have any trouble, definitely [open an issue][issue] and I'll take a look.

If all else fails, you can ask me directly on [Twitter][twitter] or my [AMA][ama].

[npx]: https://www.npmjs.com/package/npx
[token]: https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line
[issue]: https://github.com/bradgarropy/labman-cli/issues
[twitter]: https://twitter.com/bradgarropy
[ama]: https://github.com/bradgarropy/ama
