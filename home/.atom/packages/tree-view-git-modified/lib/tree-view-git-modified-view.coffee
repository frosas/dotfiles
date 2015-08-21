{requirePackages} = require 'atom-utils'
{CompositeDisposable} = require 'event-kit'

TreeViewGitModifiedPaneView = require './tree-view-git-modified-pane-view'

module.exports =
class TreeViewGitModifiedView

  constructor: (serializedState) ->

    # Create root element
    @element = document.createElement('div')

    @element.classList.add('tree-view-git-modified')

    @treeViewGitModifiedPaneViewArray = []

    @paneSub = new CompositeDisposable

    @loadRepos()

    @paneSub.add atom.project.onDidChangePaths (path) =>
        @loadRepos()

    # @paneSub.add atom.workspace.observePanes (pane) =>
    #   @treeViewGitModifiedPaneView.setPane pane
      # TODO: Implement tear down on pane destroy subscription if needed (TBD)
      # destroySub = pane.onDidDestroy =>
      #   destroySub.dispose()
      #   @removeTabGroup pane
      # @paneSub.add destroySub

  loadRepos: ->
    self = this

    # Remove all existing panels
    for tree in @treeViewGitModifiedPaneViewArray
        tree.destroy()

    Promise.all(atom.project.getDirectories().map(
      atom.project.repositoryForDirectory.bind(atom.project))).then (repos) ->
        for repo in repos
            treeViewGitModifiedPaneView = new TreeViewGitModifiedPaneView repo
            treeViewGitModifiedPaneView.setRepo repo
            self.treeViewGitModifiedPaneViewArray.push treeViewGitModifiedPaneView
            self.element.appendChild treeViewGitModifiedPaneView.element

            self.paneSub.add atom.workspace.observePanes (pane) =>
                treeViewGitModifiedPaneView.setPane pane


  # Returns an object that can be retrieved when package is activated
  serialize: ->

  # Tear down any state and detach
  destroy: ->
    @element.remove()
    @paneSub.dispose()

  getElement: ->
    @element

  # Toggle the visibility of this view
  toggle: ->
    if @element.parentElement?
      @hide()
    else
      @show()

  hide: ->
    @element.remove()

  show: ->
    requirePackages('tree-view').then ([treeView]) =>
      treeView.treeView.find('.tree-view-scroller').css 'background', treeView.treeView.find('.tree-view').css 'background'
      treeView.treeView.prepend @element
