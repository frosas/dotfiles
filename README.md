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

- https://github.com/codler/Battery-Time-Remaining
- http://interealtime.com/redscreen-advanced-screen-dimming-for-mac-os-x/ (it seems to be deleted, try with http://web.archive.org/web/*/http://interealtime.com/RedScreen/RedScreen.dmg)
- http://www.macupdate.com/app/mac/45273/did-i-click

### TODO

- Use Ansible?

