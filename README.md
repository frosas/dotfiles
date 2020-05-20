# Setup

Install latest macOS version

Install [Homebrew](https://brew.sh/)

```bash
$ git clone --recursive https://github.com/frosas/dotfiles.git ~/projects/dotfiles
$ cd $_
```

## macOS preferences

```bash
$ setup/mac-preferences
```

- _Preferences_
  - _General_
    - Disable _Use font smoothing when available_
  - _Desktop & Screen Saver_
    - _Desktop_
      - Add Google Drive _Wallpapers_ folder
    - _Screen Saver_
      - Set _Start after_ to _Never_
  - _Security & Privacy_
    - _Require password <u>immediately</u> after ..._
  - _iCloud_
    - Disable everything but _Keychain_ and _Find My Mac_

## Dock

- Add _Downloads_ folder

  ```bash
  $ cd
  $ ln -s Downloads .Downloads
  $ open .
  ```

  - Show hidden files (shift-command-.)
  - Drag _.Downloads_ file to the Dock

## Home dir

```bash
$ setup/home
$ vi -o ~/.bashrc home-examples/.bashrc # Update as needed
```

## Homebrew

```bash
$ brew bundle --global
```

## Node.js

```bash
$ nvm alias default system
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

- Go to _Preferences_ → _General_ → _Preferences_
  - Enable _Load preferences from a custom folder_ and point to `iterm` directory\_
  - Enable _Save changes to folder when iTerm2 quits_

## SSH

```bash
$ mkdir ~/.ssh
$ vi -o ~/.ssh/config home-examples/.ssh/config # Edit as needed
$ (cd ~/.ssh && ln -s .../SSH/id_rsa* .)
```

## Visual Studio Code

Install https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync
and follow the instructions to download the settings.

## Chrome

Install https://github.com/frosas/chrome-customizations-extension

## Misc

Config the other installed apps as needed (`brew cask ls`)

Update this repo remote to its authenticated version:

```bash
$ git remote set-url origin git@github.com:frosas/dotfiles.git
$ git branch --set-upstream-to=origin/master master
```

# [Shortcuts cheatsheet](shortcuts.md)
