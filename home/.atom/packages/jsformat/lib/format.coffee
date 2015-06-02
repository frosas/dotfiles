###
 Package dependencies
###
jsbeautify = (require 'js-beautify').js_beautify

packgeConfig = require './config'
Observer = require './observer'
FileTypeNotSupportedView = require './not-supported-view'

module.exports =
  config: packgeConfig

  activate: (state) ->
    atom.commands.add 'atom-workspace', 'jsformat:format', => @format(state)

    @editorSaveSubscriptions = {}
    @editorCloseSubscriptions = {}

    # @editorSaveSubscriptions = new Observer()
    # @editorCloseSubscriptions = new Observer()

    atom.config.observe 'jsformat.format_on_save', =>
      @subscribeToEvents()

  format: (state) ->
    editor = atom.workspace.getActiveTextEditor()
    if !editor
      return

    grammar = editor.getGrammar().name

    if (!(grammar is 'JSON' or /JavaScript/.test(grammar)))
      @displayUnsupportedLanguageNotification(grammar)
    else if (atom.config.get('jsformat.ignore_files').indexOf(editor.getTitle()) != -1)
      return
    else
      mainCursor = editor.getCursors()[0]
      textBuffer = editor.getBuffer()
      nonWhitespaceRegex = /\S/g
      whitespaceRegex = /\s/g
      currentCursorPosition = mainCursor.getBufferPosition()
      mainCursor.setBufferPosition([currentCursorPosition.row, currentCursorPosition.column + 1])
      isBeforeWord = mainCursor.isInsideWord()
      mainCursor.setBufferPosition(currentCursorPosition)

      if mainCursor.isInsideWord()
        # The cursor is inside a word, so let's use the beginning as the reference
        currentPosition = mainCursor.getBeginningOfCurrentWordBufferPosition()

        # ideally we could do mainCursor.setBufferPosition([currentCursorPosition.row, currentCursorPosition.column + 1]).isInsideWord()
        # but .setBufferPosition returns undefined :(
        # So we have to define some stuff above instead...

      else if isBeforeWord
        # The cursor is right before a word in this case, so let's use the current cursor position as a reference
        mainCursor.setBufferPosition(currentCursorPosition)
        currentPosition = currentCursorPosition

      textuntilCursor = textBuffer.getTextInRange([[0, 0], currentPosition])

      nonWhitespaceCharacters = textuntilCursor.match(nonWhitespaceRegex)
      whitespaceCharacters = textuntilCursor.match(whitespaceRegex)

      nonWhitespaceCharacters = if nonWhitespaceCharacters then nonWhitespaceCharacters.length else 0
      whitespaceCharacters = if whitespaceCharacters then whitespaceCharacters.length else 0

      @formatJavascript(editor)

      text = editor.getText()

      newCursorPosition = textBuffer.positionForCharacterIndex(nonWhitespaceCharacters + whitespaceCharacters);

      mainCursor.setBufferPosition(newCursorPosition)

  formatJavascript: (editor) ->
    editorSettings = atom.config.get('editor')

    opts = atom.config.get('jsformat')
    opts.indent_with_tabs = !editor.getSoftTabs()
    opts.indent_size = editorSettings.tabLength
    opts.wrap_line_length = editorSettings.preferredLineLength

    editorText = editor.getText()
    beautifiedText = jsbeautify(editorText, opts)

    if (editorText != beautifiedText)
      if @selectionsAreEmpty(editor)
        editor.setText(beautifiedText)

      else
        for selection in editor.getSelections()
          selection.insertText(jsbeautify(selection.getText(), opts), { select: true })

  selectionsAreEmpty: (editor) ->
    for selection in editor.getSelections()
      return false unless selection.isEmpty()
    return true

  subscribeToEvents: (state) ->
    if (atom.config.get('jsformat.format_on_save'))
      @editorCreationSubscription = atom.workspace.observeTextEditors (editor) =>
        grammar = editor.getGrammar().scopeName

        if grammar is 'source.js' or grammar is 'source.json'
          buffer = editor.getBuffer()

          @editorSaveSubscriptions[editor.id] = buffer.onWillSave =>
            if buffer.isModified()
              buffer.transact =>
                @format(state)

          @editorCloseSubscriptions[editor.id] = buffer.onDidDestroy =>
            @editorSaveSubscriptions[editor.id]?.dispose()
            @editorCloseSubscriptions[editor.id]?.dispose()

            delete @editorSaveSubscriptions[editor.id]
            delete @editorCloseSubscriptions[editor.id]

          # saveSubscription = buffer.onWillSave =>
          #   buffer.transact =>
          #     @format(state)
          #
          # closeSubscription = buffer.onDidDestroy =>
          #   debugger
          #
          # @editorSaveSubscriptions.addSubscription(saveSubscription)
          # @editorCloseSubscriptions.addSubscription(closeSubscription)
    else
      if @editorCreationSubscription
        @editorCreationSubscription.dispose()
        @editorCreationSubscription = null

        for subscriptionId, subscription of @editorSaveSubscriptions
          # unsubscribe to the save event of the editor
          subscription.dispose()
          # delete the keys to reduce memory usage
          delete @editorSaveSubscriptions[subscriptionId]

        for subscriptionId, subscription of @editorCloseSubscriptions
          # unsubscribe to the save event of the editor
          subscription.dispose()
          # delete the keys to reduce memory usage
          delete @editorCloseSubscriptions[subscriptionId]

        # @editorSaveSubscriptions.dispose()
        # @editorSaveSubscriptions = new Observer()
        #
        # @editorCloseSubscriptions.dispose()
        # @editorCloseSubscriptions = new Observer()

  displayUnsupportedLanguageNotification: (language) ->
    notification = new FileTypeNotSupportedView(language)
    atom.views.getView(atom.workspace).append(notification)
    destroyer = () ->
      notification.detach()

    setTimeout destroyer, 1500
