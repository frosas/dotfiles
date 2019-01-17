# vim: filetype=bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

######################################################################
# Bash completion
######################################################################

if [ `uname` = Darwin ]; then 
    # __git_ps1 is defined here
    . `brew --prefix`/etc/bash_completion
fi

source $SCRIPT_DIR/prompt

HISTSIZE="50000"
PROMPT_COMMAND="history -a; $PROMPT_COMMAND" # Update history file immediately

# Add the current directory to the iTerm tab title
update_iterm () { (echo -ne "\033]0;$(pwd | sed "s|^$HOME|~|")\007" &) }
PROMPT_COMMAND="update_iterm; $PROMPT_COMMAND"

export PATH=$SCRIPT_DIR/../bin:$PATH
export PATH=node_modules/.bin:$PATH
export EDITOR=vim
export GREP_OPTIONS="--color=auto"

if [ `uname` = Darwin ]; then 
    alias ls="ls -FAGh"
    export PATH=$SCRIPT_DIR/../bin/mac:$PATH
fi

if [ `uname` = Linux ]; then 
    alias ls="ls -FAh --color"
fi

alias cd="cd -P"
alias cd-git-root="cd \$(git rev-parse --show-toplevel)"
alias cd-temp="cd \$(mktemp -d /tmp/XXX)"
alias g="git"
alias gb="git branches-by-date"
alias gbd="git-branch-diff"
alias gbl="git-branch-log"
alias gd="git-uncommitted-diff"
alias gl="git l"
alias gla="git l --all"
alias gs="git status --short"
alias l="ls"
alias ll="ls -l"
alias lt="ls -lt"
alias d="docker"
alias dc="docker-compose"
alias t="trash"
alias tf="terraform"

# Bash completion for `g` alias
# From https://gist.github.com/JuggoPop/10706934
__git_complete g __git_main

function h { history | tail -${1:-20}; }

# Node Version Manager
export NVM_DIR=~/.nvm
source /usr/local/opt/nvm/nvm.sh

# "general-purpose command-line fuzzy finder"
[ -f ~/.fzf.bash ] && source ~/.fzf.bash