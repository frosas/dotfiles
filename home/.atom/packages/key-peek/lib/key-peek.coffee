KeyPeekView = require './key-peek-view'

module.exports =
  keyPeekView: null

  activate: (state) ->
    @keyPeekView = new KeyPeekView(state)

  deactivate: ->
    @keyPeekView.destroy()

  serialize: ->
    @keyPeekView.serialize()
    
