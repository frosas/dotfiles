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
  - _Desktop & Screen Saver_
    - _Desktop_
      - Add Google Drive _Wallpapers_ folder
  - _Accessibility_
    - _Zoom_
      - _Use scroll gesture with modifier keys to zoom:_
  - _Security & Privacy_
    - _Require password <u>immediately</u> after ..._
  - _iCloud_
    - Disable everything but _Keychain_ and _Find My Mac_
  - _Keyboard_
    - _Shortcuts_
      - _Use keyboard navigation to move focus between controls_
    - _Input Sources_
      - Add _U.S._
      - Delete _British_

## Home dir

```bash
$ setup/home
```

## Shell

```bash
$ chsh -s /bin/bash
$ vi -o ~/.bashrc home-examples/.bashrc # Update as needed
```

## Homebrew

```bash
$ brew bundle --global --verbose
```

## Node.js

```bash
$ nvm alias default system
$ setup/npm
```

## SSH

```bash
$ mkdir ~/.ssh
$ vi -o ~/.ssh/config home-examples/.ssh/config # Edit as needed
$ (cd ~/.ssh && ln -s .../SSH/id_rsa* .)
```

## Visual Studio Code

- Turn _Settings Sync_ on

## Chrome

Install https://github.com/frosas/chrome-customizations-extension

## Dock

- Add _Downloads_ folder

  ```bash
  $ (cd && ln -s Downloads .Downloads && open .)
  ```

  - Show hidden files (shift-command-.)
  - Drag _.Downloads_ file to the Dock

## iStat Menus

- _File_ → _Import Settings…_
- Select .ismp file backup

## Install SF Mono

https://osxdaily.com/2018/01/07/use-sf-mono-font-mac/

## Other apps

Config the other installed apps as needed (`brew list --cask`)

# [Shortcuts cheatsheet](shortcuts.md)
