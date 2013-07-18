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

operations.moveToHalfLeft = function() {
    return slate.operation('move', {
        x: 'screenOriginX',
        y: 'screenOriginY',
        width: 'screenSizeX / 2',
        height: 'screenSizeY'
    })
}

operations.moveToHalfRight = function() {
    return slate.operation('move', {
        x: 'screenOriginX + screenSizeX / 2',
        y: 'screenOriginY', 
        width: 'screenSizeX / 2',
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

var appsOperationsByScreenCount = {
    'Google Chrome': {
        1: operations.maximize(),
        2: [
            slate.operation('throw', {screen: screens.thunderbolt}),
            operations.moveToHalfLeft(),
            operations.pad(windowMargin, windowMargin / 2, windowMargin, windowMargin)
        ]
    },
    PhpStorm: {
        1: operations.maximize(),
        2: [
            slate.operation('throw', {screen: screens.thunderbolt}),
            operations.moveToHalfRight(),
            operations.pad(windowMargin, windowMargin, windowMargin, windowMargin / 2)
        ]
    }
}

var refresh = function() {
    var screenCount = slate.screenCount()
    slate.eachApp(function(app) {
        var appOperationsByScreenCount = appsOperationsByScreenCount[app.name()] || []
        var appOperations = appOperationsByScreenCount[screenCount] || []
        operations.apply(app.mainWindow(), appOperations)
    })
}

slate.on('screenConfigurationChanged', refresh)

refresh()

//

slate.bind(getKeystroke('r'), slate.operation('relaunch'))

slate.log('Config loaded')
