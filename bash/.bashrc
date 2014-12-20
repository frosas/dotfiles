# vim: set filetype=bash

SCRIPT_DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd)"

######################################################################
# Bash completion
######################################################################

if [ `uname` = Darwin ]; then 
    # __git_ps1 is defined here
    . `brew --prefix`/etc/bash_completion
fi

# Completion for `g` alias
# From https://gist.github.com/JuggoPop/10706934
__git_complete g __git_main

source $SCRIPT_DIR/prompt

export PATH=/usr/local/sbin:/usr/local/bin:$PATH # Recommended by Homebrew
export PATH=$SCRIPT_DIR/../bin:$PATH
export PATH=node_modules/.bin:$PATH
export EDITOR=vim
export GREP_OPTIONS="--color=auto"

# See [1]
shopt -s histappend
HISTSIZE=10000 

if [ `uname` = Darwin ]; then 
    alias ls="ls -FAGh"
    export PATH=$SCRIPT_DIR/../bin/mac:$PATH
fi

if [ `uname` = Linux ]; then 
    alias ls="ls -FAh --color"
fi

alias g="git" # See completion for `g` above
alias gs="git status --short"
alias gd="git-uncommitted-diff"
alias gl="git pretty-log"
alias gla="gl --all"
alias cd-git-root="cd \$(git rev-parse --show-toplevel)"
alias cd-temp="cd \$(mktemp -d /tmp/XXX)"

# Ruby
# See http://askubuntu.com/questions/502305/bundle-install-permissions-denied
export GEM_HOME=$(ruby -e 'puts Gem.user_dir')
export PATH=$PATH:$GEM_HOME/bin

# [1] http://briancarper.net/blog/248/ 
