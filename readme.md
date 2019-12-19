# 👨🏼‍🔬 github label manager cli

## 📦 Installation

```
npm install labman --global
```

## 🥑 Usage

```
labman clone <token> <source> <destination>
```

Where `token` is your GitHub [personal access token][token].  
Where `source` and `destination` are GitHub repositories in the form of `owner/repo`.

Here is an example.

```
labman clone 1234abcd bradgarropy/label-source bradgarropy/label-destination
```

## ❔ Questions

If you have any trouble, definitely [open an issue][issue] and I'll take a look.

If all else fails, you can ask me directly on [Twitter][twitter] or my [AMA][ama].

[token]: https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line
[issue]: https://github.com/bradgarropy/labman-cli/issues
[twitter]: https://twitter.com/bradgarropy
[ama]: https://github.com/bradgarropy/ama
