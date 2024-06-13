# -*- mode: ruby -*-

# TODO Read this from a gitignored file
machine = "personal" # Don't commit this

tap "homebrew/bundle"
tap "homebrew/cask-fonts"

brew "awscli"
brew "bash"
brew "bash-completion"
brew "bat"
brew "coreutils"
brew "deno"
brew "fd"
brew "ffmpeg"
brew "fzf"
brew "git"
brew "git-delta"
brew "graphviz"
brew "htop"
brew "jupyterlab"
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
brew "python"
brew "rclone" if machine == "personal"
brew "ripgrep"
brew "shellcheck"
brew "sshuttle" if machine == "personal"
brew "tmux"
brew "trash"
brew "tree"
brew "wget"
brew "yarn"

cask "adguard" if machine == "personal"
# Use OpenMTP instead
# cask "android-file-transfer" 
cask "android-platform-tools" if machine == "personal"
cask "bitwarden" if machine == "personal"
cask "docker" if machine == "personal"
cask "drawio"
cask "electrum"
cask "firefox" 
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
cask "google-chrome"
cask "google-cloud-sdk" if machine == "personal"
cask "google-drive" if machine == "personal"
cask "google-earth-pro" if machine == "personal"
cask "grammarly-desktop"
cask "iina" if machine == "personal"
cask "istat-menus"
cask "iterm2"
cask "linkliar"
cask "ngrok" if machine == "personal"
cask "omnidisksweeper"
cask "openmtp" if machine == "personal"
cask "postman"
cask "raycast"
cask "rectangle"
cask "slack" if machine == "personal"
cask "skitch"
cask "sourcetree" if machine == "personal"
cask "spotify" if machine == "personal"
cask "steam" if machine == "personal"
cask "the-unarchiver"
cask "transmission" if machine == "personal"
# On my Silicon, the universal version is manually installed as Homebrew runs in x86 mode and the 
# cask installs the version for that architecture.
# Proper solution would be to have another Homebrew setup for silicon apps but can't bother just for
# one app.
cask "visual-studio-code" if machine != "personal"
cask "vlc" if machine == "personal"
cask "vpn-by-google-one" if machine == "personal"
cask "wireshark"
cask "zoom" if machine == "personal"
