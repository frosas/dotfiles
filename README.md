# Setup

```bash
$ git clone git@github.com:frosas/dotfiles.git
$ cd dotfiles
$ git submodule update --init
$ setup/all
```

## Manual steps

In ~/.bashrc

```bash
source .../dotfiles/bash/.bashrc
export CDPATH=.:~/projects
```

```bash
$ crontab -e
PATH="/usr/local/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
@weekly /home/.../dotfiles/bin/mac/system-check
```
 
Misc apps

- https://github.com/codler/Battery-Time-Remaining
- http://interealtime.com/redscreen-advanced-screen-dimming-for-mac-os-x/ (it seems to be deleted, try with http://web.archive.org/web/*/http://interealtime.com/RedScreen/RedScreen.dmg)

### TODO

- Use Ansible?

