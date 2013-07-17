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

operations.moveToLeft = function(screen) {
    return slate.operation('move', {
        screen: screen,
        x: 'screenOriginX + ' + windowMargin,
        y: 'screenOriginY + ' + windowMargin,
        width: 'screenSizeX / 2 - ' + windowMargin * 1.5,
        height: 'screenSizeY - ' + windowMargin * 2
    })
}

operations.moveToRight = function(screen) {
    return slate.operation('move', {
        screen: screen,
        x: 'screenOriginX + screenSizeX / 2 + ' + windowMargin * .5,
        y: 'screenOriginY + ' + windowMargin, 
        width: 'screenSizeX / 2 - ' + windowMargin * 1.5,
        height: 'screenSizeY - ' + windowMargin * 2
    })
}

operations.maximize = function(screen) {
    return slate.operation('move', {
        x: 'screenOriginX',
        y: 'screenOriginY',
        width: 'screenSizeX',
        height: 'screenSizeY'
    })
}

// Application operation by screen count

var appOperationByScreenCount = {
    'Google Chrome': {
        1: operations.maximize(screens.laptop),
        2: operations.moveToLeft(screens.thunderbolt)
    },
    PhpStorm: {
        1: operations.maximize(screens.laptop),
        2: operations.moveToRight(screens.thunderbolt)
    }
}

var refresh = function() {
    var screenCount = slate.screenCount()
    slate.eachApp(function(app) {
        var operationByScreenCount = appOperationByScreenCount[app.name()] || []
        var operation = operationByScreenCount[screenCount] || function() {}
        app.mainWindow().doOperation(operation)
    })
}

slate.on('screenConfigurationChanged', refresh)

slate.bind(getKeystroke('s'), refresh)

//

slate.bind(getKeystroke('r'), slate.operation('relaunch'))

slate.log('Config loaded')
