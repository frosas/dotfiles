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
- https://github.com/codler/Battery-Time-Remaining
- http://www.macupdate.com/app/mac/45273/did-i-click
- https://justgetflux.com/

### TODO

- Use Ansible?

