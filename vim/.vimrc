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
    set guifont=Menlo\ Regular:h13
    set lines=45
    set columns=100
    colorscheme desert
endif

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
filetype on
filetype plugin on

" Ruby
au BufRead,BufNewFile *.rb,*.rhtml set shiftwidth=2 
au BufRead,BufNewFile *.rb,*.rhtml set softtabstop=2 

" Pathogen
runtime autoload/pathogen.vim
if exists("g:loaded_pathogen")
    call pathogen#runtime_append_all_bundles() 
endif

nmap <silent> <c-n> :NERDTreeToggle<CR>
