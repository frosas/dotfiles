// Docs at https://github.com/jigish/slate/wiki/JavaScript-Configs

slate.log('Loading config') // Good to know this file was found

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

operations.toLeft = function() {
    return slate.operation('move', {
        x: 'screenOriginX',
        y: 'screenOriginY',
        width: leftRegionWidth,
        height: 'screenSizeY'
    })
}

operations.toRight = function() {
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

var layoutAll = function() {
    var screenCount = slate.screenCount()

    slate.log('Laying out (' + screenCount + ' screens)')

    runAppOperationsByNames(['iTerm', 'Terminal'], (function() {
        switch (screenCount) {
            case 1: return operations.maximize()
            case 2:
            case 3: 
                return [
                    slate.operation('throw', {screen: getScreen('external-0')}),
                    operations.toLeft()
                ]
        }
    })())

    runAppOperationsByNames(['Google Chrome', 'Firefox', 'Safari', 'SourceTree'], (function() {
        switch (screenCount) {
            case 1: return operations.maximize()
            case 2:
            case 3: return [
                slate.operation('throw', {screen: getScreen('external-0')}),
                operations.toRight()
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
                    operations.toTop()
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
                    operations.toBottom()
                ]
        }
    })())
}

slate.default(1, layoutAll)
slate.default(2, layoutAll)
slate.default(3, layoutAll)

// Keybindings

var bind = function(keystroke, keystrokeOperations) {
    slate.bind(keystroke + ':shift,ctrl', function(window) { 
        slate.log('Triggering \'' + keystroke + '\'')
        if (keystrokeOperations instanceof Function) keystrokeOperations()
        else operations.apply(window, keystrokeOperations) 
    })
}

bind('r', slate.operation('relaunch'))
bind('a', layoutAll)
bind('m', operations.maximize())
bind('h', operations.toLeft())
bind('l', operations.toRight())
bind('k', operations.toTop())
bind('j', operations.toBottom())
bind('0', slate.operation('throw', {screen: getScreen('main')}))
bind('1', slate.operation('throw', {screen: getScreen('external-0')}))
bind('2', slate.operation('throw', {screen: getScreen('external-1')}))

slate.log('Config loaded') // Good to know everything loaded fine
