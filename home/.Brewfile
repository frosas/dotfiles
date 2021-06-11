# -*- mode: ruby -*-

machine = "unknown"

tap "homebrew/bundle"
tap "homebrew/cask"
tap "homebrew/cask-fonts"
tap "homebrew/cask-versions"
tap "homebrew/core"
tap "popcorn-official/popcorn-desktop", "https://github.com/popcorn-official/popcorn-desktop.git" if machine == "personal"

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
brew "pulumi" if machine == "personal"
brew "rclone" if machine == "personal"
brew "ripgrep"
brew "shellcheck"
brew "sshuttle" if machine == "personal"
brew "tfenv"
brew "tmux"
brew "trash"
brew "tree"
brew "wget"
brew "yarn"
brew "youtube-dl" if machine == "personal"

cask "adoptopenjdk8" if machine == "personal"
cask "android-file-transfer" if machine == "personal"
cask "android-platform-tools" if machine == "personal"
cask "authy" if machine == "personal"
cask "docker"
cask "drawio"
cask "firefox" if machine != "fil"
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
cask "font-source-code-pro" if machine == "personal"
cask "font-ubuntu"
cask "gimp" if machine == "personal"
cask "google-backup-and-sync" if machine == "personal"
cask "google-chrome" if machine != "fil"
cask "google-cloud-sdk" if machine == "personal"
cask "iina" if machine == "personal"
cask "istat-menus"
cask "iterm2"
cask "linkliar"
cask "meld"
cask "microsoft-auto-update" if machine == "fil"
cask "microsoft-edge" if machine == "fil"
cask "ngrok" if machine == "personal"
cask "omnidisksweeper"
cask "openvisualtraceroute" if machine == "personal"
cask "popcorn-time" if machine == "personal"
cask "postman"
cask "rectangle"
cask "skitch"
cask "skype" if machine == "personal"
cask "sourcetree" if machine == "personal"
cask "spotify" if machine == "personal"
cask "the-unarchiver"
cask "transmission" if machine == "personal"
cask "virtualbox" if machine == "personal"
# On my Silicon, the universal version is manually installed as Homebrew runs in x86 mode and the 
# cask installs the version for that architecture.
# Proper solution would be to have another Homebrew setup for silicon apps but can't bother just for
# one app.
cask "visual-studio-code" if machine != "personal"
cask "vlc" if machine == "personal"
cask "wireshark"
cask "zoom" if machine == "personal"

mas "NextDNS", id: 1464122853 if machine == "personal"
mas "Slack", id: 803453959 if machine == "personal"
