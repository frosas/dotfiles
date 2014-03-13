slate.log('Loading config')

var getKeystroke = function(key) {
    return key + ':ctrl,shift'
}

var screens = {
    laptop: '1280x800',
    thunderbolt: '2560x1440'
}

// Operations

var operations = {}
var windowMargin = 20

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

var leftRegionWidth = 'screenSizeX / 2 - 100'

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

var appsOperationsByScreenCount = {};

;['iTerm', 'PhpStorm', 'Sublime Text 2', 'MacVim', 'Atom'].forEach(function(app) {
    appsOperationsByScreenCount[app] = {
        1: operations.maximize(),
        2: [
            slate.operation('throw', {screen: screens.thunderbolt}),
            operations.toLeftRegion(),
            operations.pad(windowMargin, windowMargin / 2, windowMargin, windowMargin)
        ]
    }
})

;['Google Chrome', 'Firefox'].forEach(function(app) {
    appsOperationsByScreenCount[app] = {
        1: operations.maximize(),
        2: [
            slate.operation('throw', {screen: screens.thunderbolt}),
            operations.toRightRegion(),
            operations.pad(windowMargin, windowMargin, windowMargin, windowMargin / 2)
        ]
    }
})

var refresh = function() {
    var screenCount = slate.screenCount()
    slate.eachApp(function(app) {
        var appOperationsByScreenCount = appsOperationsByScreenCount[app.name()] || []
        var appOperations = appOperationsByScreenCount[screenCount] || []
        app.eachWindow(function(window) {
            operations.apply(window, appOperations)
        })
    })
}

slate.on('screenConfigurationChanged', refresh)

refresh()

//

slate.bind(getKeystroke('r'), slate.operation('relaunch'))

slate.log('Config loaded')