{$$, View, keymap} = require 'atom'

module.exports =
class KeyPeekView extends View
  @content: ->
    @div class: 'key-peek panel-bottom padding', =>
      @div outlet: 'commands', class: 'panel-body padded padding'

  initialize: ({attached})->
    @attach() if attached

    atom.workspaceView.command 'key-peek:toggle', => @toggle()

    # open source link
    @on 'click', '.source', (event) -> atom.workspaceView.open(event.target.innerText)

  serialize: ->
    attached: @hasParent()

  destroy: ->
    @detach()

  toggle: ->
    if @hasParent()
      @detach()
    else
      @attach()

  attach: ->
    atom.workspaceView.appendToBottom(this)
    @subscribe atom.keymap.onDidMatchBinding ({keystrokes, binding, keyboardEventTarget}) =>
      @update(keystrokes, binding, keyboardEventTarget)

  detach: ->
    super
    @unsubscribe()


  update: (keystrokes, keyBinding, keyboardEventTarget) ->
    @commands.html $$ ->
      @table class: 'table-condensed', =>
        if keyBinding
          @tr class: 'used', =>
            @td class: 'inline-block command highlight-success', keyBinding.command
            @td class: 'selector text-highlight', keyBinding.selector
            @td class: 'keystroke highlight', '  '+keystrokes
            @td class: 'source text-info', keyBinding.source
