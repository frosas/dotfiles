# shellcheck shell=bash
# set -x

source ~/projects/dotfiles/bash/.bashrc

# See https://bosker.wordpress.com/2012/02/12/bash-scripters-beware-of-the-cdpath/
CDPATH=.:~/projects

# To avoid "Github API Rate limit exceeded" errors. See https://gist.github.com/christopheranderton/8644743.
# export HOMEBREW_GITHUB_API_TOKEN=<YOUR_TOKEN>