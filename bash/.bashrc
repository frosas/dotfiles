# vim: filetype=bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

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
source $SCRIPT_DIR/history

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

alias g="git" # See completion for `g` above
alias gs="git status --short"
alias gd="git-uncommitted-diff"
alias gl="git l"
alias gla="git l --all"
alias gb="git branches-by-date"
alias gbl="git-branch-log"
alias gbd="git-branch-diff"
alias cd-git-root="cd \$(git rev-parse --show-toplevel)"
alias cd-temp="cd \$(mktemp -d /tmp/XXX)"
alias cd="cd -P"
alias t="trash"
alias ag="ag --hidden --ignore .git"
alias l="ls"
alias ll="ls -l"
alias lt="ls -lt"
alias d="docker"
alias dc="docker-compose"
alias tf="terraform"

function h { history | tail -${1:-20}; }

# Node Version Manager
export NVM_DIR=~/.nvm
source /usr/local/opt/nvm/nvm.sh

# "general-purpose command-line fuzzy finder"
[ -f ~/.fzf.bash ] && source ~/.fzf.bash