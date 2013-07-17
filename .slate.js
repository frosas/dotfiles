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

// Layouts by screen count

var layoutsByScreenCount = {}

layoutsByScreenCount[1] = slate.layout('oneScreen', {
    'Google Chrome': {
        operations: operations.maximize(screens.laptop)
    },
    PhpStorm: {
        operations: operations.maximize(screens.laptop)
    }
})

layoutsByScreenCount[2] = slate.layout('twoScreens', {
    'Google Chrome': {
        operations: operations.moveToLeft(screens.thunderbolt)
    },
    PhpStorm: {
        operations: operations.moveToRight(screens.thunderbolt)
    }
})

// Key bindings

slate.bind(getKeystroke('s'), function() {
    var layout = layoutsByScreenCount[slate.screenCount()]
    if (layout) slate.operation('layout', {name: layout}).run()
})

slate.bind(getKeystroke('r'), slate.operation('relaunch'))

// Default layouts according screens count

for (var screenCount in layoutsByScreenCount) {
    slate.default(screenCount, layoutsByScreenCount[screenCount])
}

//

slate.log('Config loaded')
