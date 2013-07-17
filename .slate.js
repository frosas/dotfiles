slate.log('Loading config')

var getKeystroke = function(key) {
    return key + ':ctrl,shift'
}

var screens = {
    laptop: '1280x800',
    thunderbolt: '2560x1440'
}

var windowMargin = 20

var operations = {}
var layouts = {}

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

layouts.oneScreen = slate.layout('oneScreen', {
    'Google Chrome': {
        operations: operations.maximize(screens.laptop)
    },
    PhpStorm: {
        operations: operations.maximize(screens.laptop)
    }
})

layouts.twoScreens = slate.layout('twoScreens', {
    'Google Chrome': {
        operations: operations.moveToLeft(screens.thunderbolt)
    },
    PhpStorm: {
        operations: operations.moveToRight(screens.thunderbolt)
    }
})

operations.layout = {
    oneScreen: slate.operation('layout', {name: layouts.oneScreen}),
    twoScreens: slate.operation('layout', {name: layouts.twoScreens})
}

slate.bind(getKeystroke('s'), function() {
    switch (slate.screenCount()) {
        case 1:
            operations.layout.oneScreen.run()
            break
        case 2:
            operations.layout.twoScreens.run()
            break
    }
})

slate.bind(getKeystroke('r'), slate.operation('relaunch'))

slate.default(1, layouts.oneScreen)
slate.default(2, layouts.twoScreens)

slate.log('Config loaded')
