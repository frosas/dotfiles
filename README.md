# Setup

Install latest macOS version

Install [Homebrew](https://brew.sh/)

```bash
$ git clone https://github.com/frosas/dotfiles.git projects/dotfiles
$ cd $_
$ git submodule update --init
```

## macOS preferences

```bash
$ setup/mac-preferences
```

## Home dir

```bash
$ setup/home
$ vi -o ~/.bashrc home-examples/.bashrc # Update as needed
```

## Homebrew

```bash
$ brew bundle --global
```

## npm

```bash
$ setup/npm
```

## Vim

```bash
$ setup/vim
```

## iTerm2

```bash
$ setup/iterm
```

- Go to "Preferences" → "General" → "Preferences"
  - Enable "Load preferences from a custom folder" and point to `iterm` directory"
  - Enable "Save changes to folder when iTerm2 quits"

## SSH

```bash
$ mkdir ~/.ssh
$ vi -o ~/.ssh/config home-examples/.ssh/config # Edit as needed
$ (cd ~/.ssh && ln -s .../SSH/id_rsa* .)
```

## Visual Studio Code

Install https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync
and follow the instructions to download the settings.

## Misc

Config the other installed apps as needed (`brew cask ls`)

Update this repo remote to its authenticated version:

```bash
$ git remote set-url origin git@github.com:frosas/dotfiles.git
$ git branch --set-upstream-to=origin/master master
```

# [Shortcuts cheatsheet](shortcuts.md)
