# vim: set filetype=bash

if [ `uname` = Darwin ]; then 
    # __git_ps1 is defined here
    . `brew --prefix`/etc/bash_completion
fi

######################################################################
# Prompt
######################################################################

function prompt_command {
    # Codes at http://www.linuxselfhelp.com/howtos/Bash-Prompt/Bash-Prompt-HOWTO-6.html
    RESET=$(tput sgr0)
    DARK_GRAY=$(tput setaf 0)
    GREEN=$(tput setaf 2)
    ORANGE=$(tput setaf 3)
    MAGENTA=$(tput setaf 5)

    GIT_PS1_SHOWDIRTYSTATE=1
    GIT_PS1_SHOWUNTRACKEDFILES=1
    GIT_PS1_SHOWSTASHSTATE=1

    function git_ps1 {
        if [ `type -t __git_ps1` ]; then
            __git_ps1 "\[$DARK_GRAY\] on \[$MAGENTA\]%s"
        fi
    }

    # \[...\] is to don't count escape sequences (see http://mywiki.wooledge.org/BashFAQ/053 and
    # http://askubuntu.com/questions/24358)
    PS1="\[$RESET\]\n\[$DARK_GRAY\]\u in \[$GREEN\]\w$(git_ps1) \[$DARK_GRAY\]$\[$RESET\] "
}

# Avoid the 'bash: prompt_command: command not found' running `screen`
export -f prompt_command

PROMPT_COMMAND=prompt_command

######################################################################

SCRIPT_DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd)"

export PATH=/usr/local/sbin:/usr/local/bin:$PATH # Recommended by Homebrew
export PATH=$SCRIPT_DIR/../bin:$PATH
export VISUAL=vim
export GREP_OPTIONS="--color=auto"

# Keep bash history up to date at every command (http://briancarper.net/blog/248/)
export PROMPT_COMMAND="$PROMPT_COMMAND; history -a"
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
