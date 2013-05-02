# Installation

```bash
$ git clone https://github.com/frosas/dotfiles.git ~/projects/dotfiles
```

# Configuration

## Bash

In ~/.bashrc

```bash
source ~/projects/dotfiles/bash/bashrc
```

Also make sure `~/.bash_profile` is loading `~/.bashrc`

## Vim

```bash
$ cd ~
$ ln -s ~/projects/dotfiles/vim/.vim
$ ln -s ~/projects/dotfiles/vim/.vimrc
$ vim +BundleInstall +qall # See https://github.com/gmarik/vundle
```

## Git

```bash
$ cd ~
$ ln -s ~/projects/dotfiles/git/.gitconfig
$ ln -s ~/projects/dotfiles/git/.gitignore
```
