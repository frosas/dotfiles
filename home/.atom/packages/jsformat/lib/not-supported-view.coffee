{View} = require 'atom'
path = require 'path'

module.exports =
class NotSupportedNotificationView extends View
  constructor: (state, @message) ->
    this.message = @message
    super state

  @content: ->
    editor = atom.workspace.activePaneItem
    title = editor.getTitle()
    ext = path.extname title
    message = if ext.length > 0 then ext else title

    @div class: 'test overlay from-top', =>
      @div "Format: '#{message}' files not yet supported.", class: "message"
