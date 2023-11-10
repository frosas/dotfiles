# shellcheck shell=bash
# vim: filetype=bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Ensure we first of all get the exit code of the last command
PROMPT_COMMAND="LAST_EXIT_CODE=\$?"

source "$SCRIPT_DIR"/prompt

export EDITOR=vim
export GREP_OPTIONS="--color=auto"

# TODO Why VSCode keeps getting a bigger PATH on every opened terminal?
export PATH="/usr/local/sbin:$PATH"
export PATH="$SCRIPT_DIR/../bin:$PATH"
if [ "$(uname)" = Darwin ]; then 
  export PATH="$SCRIPT_DIR/../bin/mac:$PATH"
fi

alias arch-arm="arch -arm64"  
alias arch-x86="arch -x86_64"  
alias c="code"
alias cd="cd -P"
alias cd-git-root="cd \$(git rev-parse --show-toplevel)"
alias cd-temp="cd \$(mktemp -d /tmp/XXX)"
alias g="git"
alias gb="echo Deprecated, use \\\`g branches-by-date\\\`"
alias gbd="echo Deprecated, use \\\`g bd\\\`"
alias gbl="echo Deprecated, use \\\`g bl\\\`"
alias gd="echo Deprecated, use \\\`g du\\\`"
alias gl="echo Deprecated, use \\\`g l\\\`"
alias gla="echo Deprecated, use \\\`g la\\\`"
alias gs="echo Deprecated, use \\\`g s\\\`"
alias l="ls"
alias ll="ls -l"
alias lt="ls -lt"
alias d="docker"
alias dc="docker-compose"
alias t="trash"
alias tf="terraform"

if [ "$(uname)" = Darwin ]; then 
  alias ls="ls -FAGh"
fi

if [ "$(uname)" = Linux ]; then 
  alias ls="ls -FAh --color"
fi

eval "$(/opt/homebrew/bin/brew shellenv)"

if [ "$(uname)" = Darwin ]; then 
  # __git_ps1 is defined here
  . "$(brew --prefix)/etc/bash_completion"
fi

# Bash completion for `g` alias
# From https://gist.github.com/JuggoPop/10706934
__git_complete g __git_main

HISTSIZE="50000"
PROMPT_COMMAND="$PROMPT_COMMAND; history -a" # Update history file immediately

function h { history | tail -"${1:-20}"; }

# "general-purpose command-line fuzzy finder"
export FZF_DEFAULT_COMMAND="fd --hidden --exclude .git"
export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"
source "/usr/local/opt/fzf/shell/key-bindings.bash"

# https://www.iterm2.com/documentation-shell-integration.html
test -e "${HOME}/.iterm2_shell_integration.bash" && source "${HOME}/.iterm2_shell_integration.bash"

# Node
source "$SCRIPT_DIR/nvm"
export PATH="node_modules/.bin:$PATH"

export RIPGREP_CONFIG_PATH=~/.ripgreprc