{CompositeDisposable} = require 'atom'
path = require 'path'

module.exports =
  subscriptions: null

  activate: (state) ->
    @subscriptions = new CompositeDisposable
    @subscriptions.add atom.commands.add 'atom-workspace', 
      'open-git-modified-files:open': => @open()

  deactivate: ->
    @subscriptions.dispose()

  open: ->
    repos = atom.project.getRepositories()
    if repos?
      for repo in repos
        for filePath of repo.statuses
          console.log filePath
          if repo.isPathModified(filePath) or repo.isPathNew(filePath)
            console.log path.join(repo.repo.workingDirectory, filePath)
            atom.workspace.open(path.join(repo.repo.workingDirectory, filePath))
    else
      atom.beep()
