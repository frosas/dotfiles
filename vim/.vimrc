" Tabs
set tabstop=4
set shiftwidth=4
set expandtab

" Indent
set autoindent
set smartindent

" Searching
set ignorecase
set smartcase
set incsearch

" Specific file types configuration
filetype plugin indent on

" Ruby, from http://oldwiki.rubyonrails.org/rails/pages/HowtoUseVimWithRails
augroup myfiletypes 
    autocmd!
    autocmd FileType ruby,eruby,yaml set ai et sw=2 sts=2
augroup END

" Pathogen
runtime pathogen/autoload/pathogen.vim
call pathogen#runtime_append_all_bundles() 

" UI
syntax on
set nowrap
set linebreak
set showcmd
set ruler
set wildmenu
set wildmode=list:longest
set laststatus=2
set scrolloff=2
if has("gui_running")
    set guifont=DejaVu\ Sans\ Mono:h12
    set lines=45
    set columns=135
    set background=dark
    " This has to be set after loading Pathogen
    colorscheme Tomorrow-Night
endif

" Key mappings
nmap <silent> <c-t> :CommandT<CR>
nmap <silent> <c-n> :NERDTreeToggle<CR>

" Prefer markdown syntax instead of modula2
au BufRead,BufNewFile *.md set filetype=markdown

" JSON syntax highlighting
au BufRead,BufNewFile *.json set filetype=javascript
