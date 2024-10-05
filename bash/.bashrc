# shellcheck shell=bash
# vim: filetype=bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Get the exit code of the last command before anything else
PROMPT_COMMAND="LAST_EXIT_CODE=\$?"

source "$SCRIPT_DIR"/prompt

export EDITOR=vim
export GREP_OPTIONS="--color=auto"

export PATH="/usr/local/sbin:$PATH"
export PATH="$SCRIPT_DIR/../bin:$PATH"
if [ "$(uname)" = Darwin ]; then 
  export PATH="$SCRIPT_DIR/../bin/mac:$PATH"
fi

alias ..="cd .."
alias -- -="cd -"
alias c="code"
alias cd="cd -P"
alias cd-temp="cd \$(mktemp -d /tmp/XXX)"
alias g="git"
alias l="ls"
alias ll="l -l"
alias lt="ll -t"
alias d="docker"
alias dc="docker-compose"
alias t="trash"

if [ "$(uname)" = Darwin ]; then 
  alias ls="ls -FAGh"
fi

if [ "$(uname)" = Linux ]; then 
  alias ls="ls -FAh --color"
fi

eval "$(/opt/homebrew/bin/brew shellenv)"

if [ "$(uname)" = Darwin ]; then 
  # __git_ps1 is defined here
  . "$(brew --prefix)/etc/profile.d/bash_completion.sh"
fi

# Bash completion for `g` alias
# From https://gist.github.com/JuggoPop/10706934
__git_complete g __git_main

export HISTFILESIZE=5000
export HISTSIZE=-1 # Unlimited
# Those *dups only apply to the immediately previous dups and are basically useful to avoid cluttering
# the history while retrieving previous commands
export HISTCONTROL=ignoredups:erasedups
shopt -s histappend # Avoid the history file to be overwritten
PROMPT_COMMAND="$PROMPT_COMMAND; history -a" # Update history file after each command

# General-purpose command-line fuzzy finder
# Ctrl+T - Select files under the current directory
# Ctrl+R - Select history command
export FZF_DEFAULT_COMMAND="fd --hidden --exclude .git"
export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"
export FZF_CTRL_R_OPTS="--preview 'echo {}' --preview-window=up,3,wrap"
source "/usr/local/opt/fzf/shell/key-bindings.bash"

# https://www.iterm2.com/documentation-shell-integration.html
test -e "${HOME}/.iterm2_shell_integration.bash" && source "${HOME}/.iterm2_shell_integration.bash"

# Node
source "$SCRIPT_DIR/nvm"
export PATH="node_modules/.bin:$PATH"

export RIPGREP_CONFIG_PATH=~/.ripgreprc