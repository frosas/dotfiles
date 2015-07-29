" Vundle (https://github.com/gmarik/vundle)
filetype off
set rtp+=~/.vim/bundle/vundle/
call vundle#rc()
Bundle 'gmarik/vundle'
Bundle 'scrooloose/nerdtree'
Bundle 'tpope/vim-surround'
Bundle 'docunext/closetag.vim'
Bundle 'kien/ctrlp.vim'
Bundle 'vim-scripts/matchit.zip'
Bundle 'rosenfeld/conque-term'
Bundle 'JSON.vim'
Bundle 'airblade/vim-gitgutter'
Bundle 'go.vim'
Bundle 'html5.vim'
Bundle 'jelera/vim-javascript-syntax'
Bundle 'pangloss/vim-javascript'
Bundle 'Raimondi/delimitMate'
Bundle 'chriskempson/base16-vim'
Bundle 'bling/vim-airline'
" Notice it's slow for java files
" Bundle 'scrooloose/syntastic'
Bundle 'chaquotay/ftl-vim-syntax'
Bundle 'terryma/vim-expand-region'
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

" From http://tangledhelix.com/blog/2010/03/05/indenting-ruby-in-vim/
autocmd FileType ruby setlocal et ts=2 sw=2 tw=0

set iskeyword+=-

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
endif

" Color scheme
" set t_Co=256
set background=dark
colorscheme base16-default
" Ensure we use the same background as in the console
hi Normal ctermbg=NONE

" Key mappings
nmap <silent> <c-t> :split +ConqueTerm\ bash<CR>
nmap <silent> <c-n> :NERDTreeToggle<CR>
nmap <silent> <c-f> :NERDTreeFind<CR>
" vim-gitgutter
" - Next change: ]c
" - Previous change: [c

" Syntax highlighting
au BufRead,BufNewFile *.md set filetype=markdown
au BufRead,BufNewFile *.json set filetype=json 
au BufRead,BufNewFile *.html.twig set filetype=html
au BufRead,BufNewFile *.hbs set filetype=html
au BufRead,BufNewFile *.pp set filetype=ruby " Puppet
au BufRead,BufNewFile *.go set filetype=go
au BufRead,BufNewFile *.ftl set filetype=ftl

" Conque
let g:ConqueTerm_CloseOnEnd = 1
" Clearing the screen doesn't work with 'xterm'
let g:ConqueTerm_TERM = 'ansi' 

" Syntastic
let g:syntastic_check_on_open = 1
" let g:syntastic_quiet_messages = {'level': 'warnings'}

" GitGutter
highlight clear SignColumn

" CtrlP
let g:ctrlp_user_command = ['.git', 'cd %s && git ls-files . -co --exclude-standard', 'find %s -type f']

" Airline
let g:airline_left_sep=''
let g:airline_right_sep=''

" NERDTree
let NERDTreeShowHidden=1
