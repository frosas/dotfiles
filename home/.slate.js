// Docs at https://github.com/jigish/slate/wiki/JavaScript-Configs

slate.log('Loading config') // Good to know this file was found

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

operations.toTop = function() {
    return slate.operation('move', {
        x: 'screenOriginX',
        y: 'screenOriginY',
        width: 'screenSizeX',
        height: 'screenSizeY / 2'
    })
}

operations.toBottom = function() {
    return slate.operation('move', {
        x: 'screenOriginX',
        y: 'screenOriginY / 2',
        width: 'screenSizeX',
        height: 'screenSizeY / 2'
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

var getAppsByName = function(names) {
    var apps = []
    slate.eachApp(function(app) {
        if (names.some(function(name) { return name == app.name() })) {
            apps.push(app)
        }
    })
    return apps
}

var getAvailableAppsByName = function(names) {
    return getAppsByName(names).filter(function(app) { return app })
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
                    operations.pad(windowMargin, windowMargin / 2, windowMargin, 0)
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
                operations.pad(windowMargin, 0, windowMargin, windowMargin / 2)
            ]
        }
    })())

    runAppOperationsByNames(['PhpStorm', 'MacVim', 'Atom', 'Eclipse'], [
        slate.operation('throw', {screen: getScreen('main')}),
        operations.maximize()
    ])

    runAppOperationsByNames(['HipChat'], (function() {
        switch (screenCount) {
            case 1:
            case 2: 
                return [
                    slate.operation('throw', {screen: getScreen('main')}),
                    operations.maximize()
                ]
            case 3:
                return [
                    slate.operation('throw', {screen: getScreen('external-1')}),
                    operations.toTop(),
                    operations.pad(windowMargin, 0, windowMargin / 2, 0)
                ]
        }
    })())

    runAppOperationsByNames(['Spotify'], (function() {
        switch (screenCount) {
            case 1:
            case 2: 
                return [
                    slate.operation('throw', {screen: getScreen('main')}),
                    operations.maximize()
                ]
            case 3:
                return [
                    slate.operation('throw', {screen: getScreen('external-1')}),
                    operations.toBottom(),
                    operations.pad(windowMargin / 2, 0, windowMargin, 0)
                ]
        }
    })())
}

slate.default(1, layout)
slate.default(2, layout)
slate.default(3, layout)

// Keybindings

slate.bind(getKeystroke('r'), slate.operation('relaunch'))
slate.bind(getKeystroke('l'), layout)
slate.bind(getKeystroke('m'), operations.maximize())
slate.bind(getKeystroke('k'), operations.toTop())
slate.bind(getKeystroke('j'), operations.toBottom())

slate.log('Config loaded') // Good to know everything loaded ok
