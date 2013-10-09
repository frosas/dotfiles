" Vundle (https://github.com/gmarik/vundle)
filetype off
set rtp+=~/.vim/bundle/vundle/
call vundle#rc()
Bundle 'ack.vim'
Bundle 'gmarik/vundle'
Bundle 'scrooloose/nerdtree'
Bundle 'tpope/vim-surround'
Bundle 'chriskempson/vim-tomorrow-theme'
Bundle 'docunext/closetag.vim'
Bundle 'kien/ctrlp.vim'
Bundle 'tsaleh/vim-matchit'
Bundle 'rosenfeld/conque-term'
" Bundle 'Syntastic'
Bundle 'JSON.vim'
Bundle 'pangloss/vim-javascript'
Bundle 'airblade/vim-gitgutter'
Bundle 'go.vim'
filetype plugin indent on

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
    autocmd FileType ruby,eruby set ai et sw=2 sts=2
augroup END

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
    set guifont=Monaco:h12
    set lines=45
    set columns=135
    set background=dark
    " This has to be set after loading Pathogen
    colorscheme Tomorrow-Night
endif

" Key mappings
nmap <silent> <c-t> :split +ConqueTerm\ bash<CR>
nmap <silent> <c-n> :NERDTreeToggle<CR>

" Syntax highlighting
au BufRead,BufNewFile *.md set filetype=markdown
au BufRead,BufNewFile *.json set filetype=json 
au BufRead,BufNewFile *.html.twig set filetype=html
au BufRead,BufNewFile *.pp set filetype=ruby " Puppet
au BufRead,BufNewFile *.go set filetype=go

" Conque
let g:ConqueTerm_CloseOnEnd = 1

" Syntastic
let g:syntastic_check_on_open = 1
" let g:syntastic_phpcs_disable = 1 " We only want errors
let g:syntastic_quiet_warnings = 1

" GitGutter
highlight clear SignColumn
