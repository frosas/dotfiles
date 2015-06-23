
typeMap =
  info: 'Trace'
  warning: 'Warning'
  error: 'Error'

transform = (filePath, textEditor, results) ->
  results.map(({message, level, range}) ->
    [ [startLine, startCol], [ endLine, endCol ] ] = (range.serialize?() ? range)

    msg =  {
      # If the type is non-standard just pass along whatever it was
      type: typeMap[level] ? level
      html: message
      filePath: filePath
      range: [
        [ startLine, startCol],
        [ endLine, endCol]
      ]
    }

    return msg
  )

module.exports = (ClassicLinter) ->

  editorMap = new WeakMap()
  grammarScopes = ClassicLinter.syntax
  unless grammarScopes instanceof Array
    grammarScopes = [ grammarScopes ]

  return {
    grammarScopes
    scope: 'file'
    lintOnFly: true

    lint: (textEditor) ->

      # Try to reuse the same instance if we can.
      linter = editorMap.get(textEditor)
      unless linter
        linter = new ClassicLinter(textEditor)
        editorMap.set(textEditor, linter)

      filePath = textEditor.getPath()

      return new Promise((resolve) ->
        linter.lintFile(filePath, (results) ->
          resolve(transform(filePath, textEditor, results))
        )
      )
  }
