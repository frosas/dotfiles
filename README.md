# Setup

Install latest macOS version.

Install [Homebrew](https://brew.sh/).

Clone this repo. It's fine to use its public (non-authenticated) HTTPS URL until I have to make changes to it.

```bash
$ git submodule update --init
$ setup/all # Or run each of its steps manually
# Review output for errors and manual steps
```

Update these files as needed:

```bash
$ vi -o ~/.bashrc home-examples/.bashrc
$ vi -o ~/.ssh/config home-examples/.ssh/config
```

## Manual steps

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
- https://github.com/atom-community/sync-settings
