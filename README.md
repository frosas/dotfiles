# Setup

Install latest macOS version.

Install [Homebrew](https://brew.sh/).

Clone this repo. It's fine to use its public (non-authenticated) HTTPS URL until I have to make changes to it.

```bash
$ git submodule update --init
$ setup/all # Or run each of its steps manually
# Review output for errors and manual steps
```

## Shell

```bash
$ vi -o ~/.bashrc home-examples/.bashrc # Update as needed
```

## iTerm2

Enable "Load preferences from a custom folder" and point to `iterm` directory.

## SSH

```bash
$ vi -o ~/.ssh/config home-examples/.ssh/config # Edit as needed
$ (cd ~/.ssh && ln -s .../SSH/id_rsa* .)
```

## Visual Studio Code

Install https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync
and follow the instructions to download the settings.

# [Shortcuts cheatsheet](shortcuts.md)