// Docs at https://github.com/jigish/slate/wiki/JavaScript-Configs

slate.log('Loading config')

var getKeystroke = function(key) {
    return key + ':shift,ctrl'
}

var getScreens = function() {
    var screens = {}
    slate.eachScreen(function(screen) {
        // Screen IDs are ordered from left to right so external-0 stays on the left 
        // of external-1
        var name = screen.isMain() ? 'main' : 'external-' + screen.id()
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

var leftRegionWidth = 'screenSizeX / 2 - 120'

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

// Application operation by screen count

var appsOperationsByScreenCount = {}

;['iTerm', 'Terminal'].forEach(function(app) {
    appsOperationsByScreenCount[app] = {
        1: operations.maximize(),
        2: [
            slate.operation('throw', {screen: getScreen('external-0')}),
            operations.toLeftRegion(),
            operations.pad(windowMargin, windowMargin / 2, windowMargin, windowMargin)
        ]
    }
})

;['Google Chrome', 'Firefox', 'Safari', 'SourceTree'].forEach(function(app) {
    appsOperationsByScreenCount[app] = {
        1: operations.maximize(),
        2: [
            slate.operation('throw', {screen: getScreen('external-0')}),
            operations.toRightRegion(),
            operations.pad(windowMargin, windowMargin, windowMargin, windowMargin / 2)
        ]
    }
})

;['PhpStorm', 'MacVim', 'Atom', 'Eclipse'].forEach(function(app) {
    var appOperations = [
        slate.operation('throw', {screen: getScreen('main')}),
        operations.maximize()
    ]
    appsOperationsByScreenCount[app] = {
        1: appOperations,
        2: appOperations
    }
})

var layout = function() {
    var screenCount = slate.screenCount()
    slate.eachApp(function(app) {
        var appOperationsByScreenCount = appsOperationsByScreenCount[app.name()] || []
        var appOperations = appOperationsByScreenCount[screenCount] || []
        app.eachWindow(function(window) {
            operations.apply(window, appOperations)
        })
    })
}

slate.default(1, layout)
slate.default(2, layout)

// Keybindings

slate.bind(getKeystroke('r'), slate.operation('relaunch'))
slate.bind(getKeystroke('l'), layout)
slate.bind(getKeystroke('m'), operations.maximize())

slate.log('Config loaded')
