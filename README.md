# Setup

```bash
$ git clone git@github.com:frosas/dotfiles.git
$ cd dotfiles
$ git submodule update --init
$ ./setup
```

## Manual steps

In ~/.bashrc

```bash
source .../dotfiles/bash/.bashrc
export CDPATH=.:~/projects
```

```bash
$ crontab -e
MAILTO="francescrosasbosque@gmail.com"
PATH="/usr/local/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
@weekly .../dotfiles/bin/mac/system-check
```
 
Misc apps:

- https://github.com/codler/Battery-Time-Remaining
- https://github.com/jigish/slate
- http://www.ragingmenace.com/software/menumeters/
- http://www.globaldelight.com/boom/
- http://interealtime.com/redscreen-advanced-screen-dimming-for-mac-os-x/
