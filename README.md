Some scripts and configuration files

# Usage

## Export

```bash
$ git clone https://github.com/frosas/dotfiles.git ~/projects/dotfiles
```

## Bash

In ~/.bashrc

```bash
source ~/projects/dotfiles/bash/bashrc
```

## Vim

```bash
$ cd ~
$ ln -s ~/projects/dotfiles/vim/.vim
$ ln -s ~/projects/dotfiles/vim/.vimrc
$ vim +BundleInstall +qall # See https://github.com/gmarik/vundle
```
