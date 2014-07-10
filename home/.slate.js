// Docs at https://github.com/jigish/slate/wiki/JavaScript-Configs

slate.log('Loading config')

var getKeystroke = function(key) {
    return key + ':shift,ctrl'
}

var getScreens = function() {
    var screens = {}
    var externalScreensCount = 0
    slate.eachScreen(function(screen) {
        // Screen IDs are ordered from left to right so external-0 stays on the left 
        // of external-1
        var name = screen.isMain() ? 'main' : (function() {
            var id = 'external-' + externalScreensCount 
            externalScreensCount++
            return id
        })()
        screens[name] = screen.id()
    })
    return screens
}

var getScreen = function(name) {
    var screens = getScreens()
    return name in screens ? screens[name] : screens.main
}

// Operations

var operations = {}
var windowMargin = 5

/**
 * Applies the operation or list of operations
 */
operations.apply = function(window, operation) {
    if (Array.isArray(operation)) {
        operation.forEach(function(subOperation) {
            operations.apply(window, subOperation)
        })
    } else {
        window.doOperation(operation)
    }
}

var leftRegionWidth = 'screenSizeX * 0.4'

operations.toLeftRegion = function() {
    return slate.operation('move', {
        x: 'screenOriginX',
        y: 'screenOriginY',
        width: leftRegionWidth,
        height: 'screenSizeY'
    })
}

operations.toRightRegion = function() {
    return slate.operation('move', {
        x: 'screenOriginX + ' + leftRegionWidth,
        y: 'screenOriginY',
        width: 'screenSizeX - (' + leftRegionWidth + ')',
        height: 'screenSizeY'
    })
}

operations.maximize = function() {
    return slate.operation('move', {
        x: 'screenOriginX',
        y: 'screenOriginY',
        width: 'screenSizeX',
        height: 'screenSizeY'
    })
}

operations.pad = function(top, right, bottom, left) {
    var xPadding = right + left
    var yPadding = top + bottom
    return [
        slate.operation('resize', {width: '-' + xPadding, height: '-' + yPadding}),
        slate.operation('nudge', {x: '+' + left, y: '+' + top})
    ]
}

var runAppOperations = function(app, appOperations) {
    app.eachWindow(function(window) { operations.apply(window, appOperations) })
}

var getAppByName = function(name) {
    var app
    slate.eachApp(function(currentApp) { if (currentApp.name() == name) app = currentApp })
    return app
}

var getAvailableAppsByName = function(names) {
    return names.map(getAppByName).filter(function(app) { return app })
}

var runAppOperationsByNames = function(names, appOperations) {
    getAvailableAppsByName(names).forEach(function(app) {
        runAppOperations(app, appOperations)
    })
}

var layout = function() {
    var screenCount = slate.screenCount()

    slate.log('Laying out (' + screenCount + ' screens)')

    runAppOperationsByNames(['iTerm', 'Terminal'], (function() {
        switch (screenCount) {
            case 1: return operations.maximize()
            case 2:
            case 3: 
                return [
                    slate.operation('throw', {screen: getScreen('external-0')}),
                    operations.toLeftRegion(),
                    operations.pad(windowMargin, windowMargin / 2, windowMargin, windowMargin)
                ]
        }
    })())

    runAppOperationsByNames(['Google Chrome', 'Firefox', 'Safari', 'SourceTree'], (function() {
        switch (screenCount) {
            case 1: return operations.maximize()
            case 2:
            case 3: return [
                slate.operation('throw', {screen: getScreen('external-0')}),
                operations.toRightRegion(),
                operations.pad(windowMargin, windowMargin, windowMargin, windowMargin / 2)
            ]
        }
    })())

    runAppOperationsByNames(['PhpStorm', 'MacVim', 'Atom', 'Eclipse'], [
        slate.operation('throw', {screen: getScreen('main')}),
        operations.maximize()
    ])
}

slate.default(1, layout)
slate.default(2, layout)

// Keybindings

slate.bind(getKeystroke('r'), slate.operation('relaunch'))
slate.bind(getKeystroke('l'), layout)
slate.bind(getKeystroke('m'), operations.maximize())

slate.log('Config loaded')
