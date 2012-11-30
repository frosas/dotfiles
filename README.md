Some scripts and configuration files

# Usage

## Export

```bash
$ git clone https://github.com/frosas/dotfiles.git ~/projects/dotfiles
```

## Bash

In ~/.bashrc

```bash
source ~/projects/dotfiles/bash/bashrc-common
source ~/projects/dotfiles/bash/bashrc-mac # or ~/projects/dotfiles/bash/bashrc-linux
```

## Vim

```bash
$ cd ~
$ ln -s ~/projects/dotfiles/vim/.vim
$ ln -s ~/projects/dotfiles/vim/.vimrc
```