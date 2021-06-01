# -*- mode: ruby -*-

work_env = false

tap "homebrew/bundle"
tap "homebrew/cask"
tap "homebrew/cask-fonts"
tap "homebrew/cask-versions"
tap "homebrew/core"
tap "popcorn-official/popcorn-desktop", "https://github.com/popcorn-official/popcorn-desktop.git" if !work_env

brew "awscli"
brew "bash"
brew "bash-completion"
brew "bat"
brew "coreutils"
brew "fd"
brew "ffmpeg"
brew "fzf"
brew "git"
brew "git-delta"
brew "graphviz"
brew "htop"
brew "imagemagick"
brew "jq"
brew "mas"
brew "mtr"
brew "ncdu"
brew "nmap"
brew "node"
brew "nvm"
brew "pstree"
brew "pulumi" if !work_env
brew "rclone" if !work_env
brew "ripgrep"
brew "shellcheck"
brew "sshuttle" if !work_env
brew "tfenv"
brew "tmux"
brew "trash"
brew "tree"
brew "wget"
brew "yarn"

cask "adoptopenjdk8" if !work_env
cask "android-file-transfer" if !work_env
cask "android-platform-tools" if !work_env
cask "authy" if !work_env
cask "docker"
cask "drawio"
cask "firefox" if !work_env
cask "flux"
cask "font-hack"
cask "font-inconsolata"
cask "font-noto-mono"
cask "font-noto-sans"
cask "font-noto-serif"
cask "font-open-sans"
cask "font-roboto"
cask "font-roboto-mono"
cask "font-roboto-slab"
cask "font-source-code-pro" if !work_env
cask "font-ubuntu"
cask "gimp" if !work_env
cask "google-backup-and-sync" if !work_env
cask "google-chrome" if !work_env
cask "google-cloud-sdk" if !work_env
cask "iina" if !work_env
cask "istat-menus"
cask "iterm2"
cask "linkliar"
cask "meld"
cask "microsoft-auto-update" if !!work_env
cask "microsoft-edge" if !!work_env
cask "ngrok" if !work_env
cask "omnidisksweeper"
cask "openvisualtraceroute" if !work_env
cask "popcorn-time" if !work_env
cask "postman"
cask "rectangle"
cask "skitch"
cask "skype" if !work_env
cask "sourcetree" if !work_env
cask "spotify" if !work_env
cask "the-unarchiver"
cask "transmission" if !work_env
cask "virtualbox" if !work_env
cask "visual-studio-code"
cask "vlc" if !work_env
cask "wireshark"
cask "zoom" if !work_env

mas "NextDNS", id: 1464122853 if !work_env
mas "Slack", id: 803453959 if !work_env
