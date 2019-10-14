# vim: filetype=bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Ensure we first of all get the exit code of the last command
PROMPT_COMMAND="LAST_EXIT_CODE=\$?"

source $SCRIPT_DIR/prompt

export EDITOR=vim
export GREP_OPTIONS="--color=auto"

export PATH=$SCRIPT_DIR/../bin:$PATH
if [ `uname` = Darwin ]; then 
  export PATH=$SCRIPT_DIR/../bin/mac:$PATH
fi

alias c="code"
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

if [ `uname` = Darwin ]; then 
  alias ls="ls -FAGh"
fi

if [ `uname` = Linux ]; then 
  alias ls="ls -FAh --color"
fi

if [ `uname` = Darwin ]; then 
  # __git_ps1 is defined here
  . `brew --prefix`/etc/bash_completion
fi

# Bash completion for `g` alias
# From https://gist.github.com/JuggoPop/10706934
__git_complete g __git_main

HISTSIZE="50000"
PROMPT_COMMAND="$PROMPT_COMMAND; history -a" # Update history file immediately

function h { history | tail -${1:-20}; }

# "general-purpose command-line fuzzy finder"
source "/usr/local/opt/fzf/shell/key-bindings.bash"

source $SCRIPT_DIR/nvm
export PATH=node_modules/.bin:$PATH

# https://support.apple.com/en-gb/HT208050
export BASH_SILENCE_DEPRECATION_WARNING=1
