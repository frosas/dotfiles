# Setup

```bash
$ git clone git@github.com:frosas/dotfiles.git
$ cd dotfiles
$ git submodule update --init
$ setup/all
```

## Manual steps

**Terminal**

In ~/.bashrc

```bash
source .../dotfiles/bash/.bashrc
export CDPATH=.:~/.dir-shortcuts:~/projects
```

Symlink arbitrary dirs to ~/.dir-shortcuts

**Cron tasks**

```bash
$ crontab -e
PATH="/usr/local/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
@weekly /home/.../dotfiles/bin/mac/system-check
```

**iTerm**

Enable "Load preferences from a custom folder" and point to `iterm` directory.
 
**Misc apps**

- https://atom.io/
- http://www.globaldelight.com/boom/
- http://ccmenu.org/
- https://www.mozilla.org/en-GB/firefox/new/
- http://www.gimp.org/
- http://www.google.com/chrome/
- http://iterm2.com/
- http://www.macupdate.com/app/mac/45273/did-i-click
- https://justgetflux.com/
- https://bjango.com/mac/istatmenus/

# Shortcuts cheatsheet

- `shift-ctrl-⎋` locks the computer
- Bash
  - `ctrl-a` - move the cursor to the beginning of the current line
  - `ctrl-e` - move the cursor to the end of the current line
  - `alt-b` - move the cursor backwards one word
  - `alt-f` - move the cursor forward one word
  - `ctrl-k` - delete from cursor to the end of the line
  - `ctrl-u` - delete from cursor to the beginning of the line
  - `alt-d` - delete the word in front of the cursor
  - `ctrl-w` - delete the word behind of the cursor

### TODO

- Use Ansible?
- Use [Homebrew Bundler](https://github.com/Homebrew/homebrew-bundle)?
