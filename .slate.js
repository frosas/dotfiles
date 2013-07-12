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

layouts.twoScreens = slate.layout('twoScreens', {
    'Google Chrome': {
        operations: operations.moveToLeft(screens.thunderbolt)
    },
    PhpStorm: {
        operations: operations.moveToRight(screens.thunderbolt)
    }
})

operations.layout = {
    twoScreens: slate.operation('layout', {
        name: layouts.twoScreens
    })
}

slate.bind(getKeystroke('s'), function() {
    operations.layout.twoScreens.run()
})

slate.bind(getKeystroke('r'), slate.operation('relaunch'))

slate.default(2, layouts.twoScreens)

slate.log('Config loaded')
