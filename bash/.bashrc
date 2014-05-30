# vim: set filetype=bash

if [ `uname` = Darwin ]; then 
    # __git_ps1 is defined here
    . `brew --prefix`/etc/bash_completion
fi

######################################################################
# Prompt
######################################################################

# Codes at http://www.linuxselfhelp.com/howtos/Bash-Prompt/Bash-Prompt-HOWTO-6.html
RESET=$(tput sgr0)
DARK_GRAY=$(tput setaf 0)
RED=$(tput setaf 1)
GREEN=$(tput setaf 2)
ORANGE=$(tput setaf 3)
MAGENTA=$(tput setaf 5)

function git_ps1 {
    if [ `type -t __git_ps1` ]; then
        __git_ps1 "\[$DARK_GRAY\] on \[$MAGENTA\]%s"
    fi
}

function prompt_command {
    LAST_EXIT_CODE=$?
    if [[ $LAST_EXIT_CODE != 0 ]]; then 
        echo "${RED}✗ $DARK_GRAY($LAST_EXIT_CODE)$RESET"
    fi

    GIT_PS1_SHOWDIRTYSTATE=1
    GIT_PS1_SHOWUNTRACKEDFILES=1
    GIT_PS1_SHOWSTASHSTATE=1

    # \[...\] is to don't count escape sequences (see http://mywiki.wooledge.org/BashFAQ/053 and
    # http://askubuntu.com/questions/24358)
    PS1="\[$RESET\]\n\[$DARK_GRAY\]\u in \[$GREEN\]\w$(git_ps1) \[$DARK_GRAY\]$\[$RESET\] "

    # Keep bash history up to date at every command (http://briancarper.net/blog/248/)
    (history -a &)
}

# Avoid the 'bash: prompt_command: command not found' running `screen`
export -f git_ps1 prompt_command

PROMPT_COMMAND=prompt_command

######################################################################

SCRIPT_DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd)"

export PATH=/usr/local/sbin:/usr/local/bin:$PATH # Recommended by Homebrew
export PATH=$SCRIPT_DIR/../bin:$PATH
export VISUAL=vim
export GREP_OPTIONS="--color=auto"

shopt -s histappend

HISTSIZE=10000

if [ `uname` = Darwin ]; then 
    alias ls="ls -FAGh"
    export PATH=$SCRIPT_DIR/../bin/mac:$PATH
fi

if [ `uname` = Linux ]; then 
    alias ls="ls -FAh --color"
fi

alias gs="git status --short"
alias gd="git-diff-uncommitted"
alias gl="git pretty-log"
alias gla="gl --all"
alias cd-git-root="cd \$(git rev-parse --show-toplevel)"
alias cd-temp="cd \$(mktemp -d /tmp/XXX)"
