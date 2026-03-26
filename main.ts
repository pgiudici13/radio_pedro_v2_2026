enum RadioMessage {
    Hi_geget = 60699,
    Hi_zotap = 57456,
    Hi_gagez = 47490,
    Ciao_1 = 17031,
    BLOCK = 28732,
    Online_SYNC_Reciving = 44323,
    message1 = 49434,
    Online_SYNC = 64254
}
radio.onReceivedMessage(RadioMessage.BLOCK, function () {
    basic.showIcon(IconNames.Sad)
    control.reset()
})
radio.onReceivedMessage(RadioMessage.Hi_geget, function () {
    status = 3
    basic.clearScreen()
    music.play(music.stringPlayable("F A C5 A F A C5 - ", 500), music.PlaybackMode.InBackground)
    basic.showLeds(`
        . # . . #
        # . # # .
        . # # # .
        . # # . #
        # . . # .
        `)
    basic.pause(500)
    basic.clearScreen()
    led.setBrightness(50)
    basic.showLeds(`
        . . . . .
        . . . . .
        . # . . .
        . . . . .
        . . . . #
        `)
    led.setBrightness(110)
    basic.showLeds(`
        . . . . .
        . . . . .
        # # # . .
        . . . . #
        . . . . #
        `)
    led.setBrightness(190)
    basic.showLeds(`
        . . . . .
        # . # . .
        # # # . #
        # . # . #
        . . . . #
        `)
    led.setBrightness(255)
    basic.showLeds(`
        # . # . #
        # . # . .
        # # # . #
        # . # . #
        # . # . #
        `)
    basic.pause(2000)
    basic.clearScreen()
    status = 0
})
input.onButtonPressed(Button.A, function () {
    if (status == 0) {
        status = 2
        radio.sendMessage(RadioMessage.Hi_geget)
        led.setBrightness(50)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . # . . .
            `)
        led.setBrightness(110)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            # . # . .
            . # . . .
            `)
        led.setBrightness(190)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . # .
            # . # . .
            . # . . .
            `)
        led.setBrightness(255)
        basic.showLeds(`
            . . . . .
            . . . . #
            . . . # .
            # . # . .
            . # . . .
            `)
        status = 0
        basic.pause(2000)
    }
    basic.clearScreen()
})
radio.onReceivedMessage(RadioMessage.Online_SYNC, function () {
    basic.pause(1000)
    radio.sendMessage(RadioMessage.Online_SYNC_Reciving)
    SYNC_give += 1
})
radio.onReceivedMessage(RadioMessage.Online_SYNC_Reciving, function () {
    if (SYNC_did > 0) {
        online += 1
        Online_reciving_times += 1
    }
})
input.onButtonPressed(Button.AB, function () {
    if (status == 0) {
        status = 1
        online = 0
        radio.sendMessage(RadioMessage.Online_SYNC)
        SYNC_did += 1
        SYNC_do_ok = 0
        for (let index = 0; index < 1; index++) {
            basic.showLeds(`
                . . # . .
                . . . . #
                # # . # #
                # . . . .
                . . # . .
                `)
            basic.showLeds(`
                . . . # .
                . # . # .
                # # # # #
                . # . # .
                . # . . .
                `)
            basic.showLeds(`
                . # # . .
                . . # . .
                # . . . #
                . . # . .
                . . # # .
                `)
            basic.showLeds(`
                . . # . .
                # # # # .
                . . # . .
                . # # # #
                . . # . .
                `)
            basic.showLeds(`
                . . # . .
                . . . . #
                # # . # #
                # . . . .
                . . # . .
                `)
        }
        status = 0
        basic.clearScreen()
    }
})
radio.onReceivedString(function (receivedString) {
    basic.clearScreen()
    status = 3
    music.play(music.stringPlayable("E B C5 A B G A - ", 280), music.PlaybackMode.InBackground)
    basic.showLeds(`
        # # # . .
        . # . . .
        . # # . #
        . # . # .
        . # # . #
        `)
    basic.pause(200)
    basic.clearScreen()
    basic.showString(receivedString)
    basic.clearScreen()
    status = 0
})
input.onButtonPressed(Button.B, function () {
    if (status == 0) {
        if (SYNC_do_ok == 0) {
            status = 1
            if (SYNC_did > 0) {
                if (online > 0) {
                    // Riga 0: sempre visibile quando ci sono utenti online
                    turtle.setPosition(0, 0)
                    turtle.pen(TurtlePenMode.Down)
                    turtle.forward(X_view)
                    turtle.pen(TurtlePenMode.Up)
                    // Riga 1: solo se ci sono più di 5 utenti (Y_view >= 0)
                    if (Y_view >= 0) {
                        turtle.setPosition(0, 1)
                        turtle.pen(TurtlePenMode.Down)
                        turtle.forward(Y_view)
                        turtle.pen(TurtlePenMode.Up)
                    }
                    // Riga 2: solo se ci sono più di 10 utenti (XY2_view >= 0)
                    if (XY2_view >= 0) {
                        turtle.setPosition(0, 2)
                        turtle.pen(TurtlePenMode.Down)
                        turtle.forward(XY2_view)
                        turtle.pen(TurtlePenMode.Up)
                    }
                    // Riga 2: solo se ci sono più di 10 utenti (XY2_view >= 0)
                    if (XY3_view >= 0) {
                        turtle.setPosition(0, 3)
                        turtle.pen(TurtlePenMode.Down)
                        turtle.forward(XY3_view)
                        turtle.pen(TurtlePenMode.Up)
                    }
                    turtle.pen(TurtlePenMode.Up)
                    turtle.setPosition(4, 4)
                    basic.pause(2000)
                    status = 0
                    SYNC_do_ok = 1
                    basic.clearScreen()
                } else {
                    turtle.pen(TurtlePenMode.Up)
                    basic.showIcon(IconNames.No)
                    basic.pause(2000)
                    status = 0
                    basic.clearScreen()
                }
            } else {
                status = 0
                basic.showLeds(`
                    # # . # .
                    # . . # #
                    # # # . #
                    . . # . #
                    # # # . #
                    `)
                basic.pause(1000)
                basic.clearScreen()
            }
        } else {
            status = 0
            basic.showLeds(`
                # # . # .
                # . . # #
                # # # . #
                . . # . #
                # # # . #
                `)
            basic.pause(1000)
            basic.clearScreen()
        }
    }
    status = 0
})
radio.onReceivedMessage(RadioMessage.Hi_zotap, function () {
    status = 3
    basic.clearScreen()
    music.play(music.stringPlayable("E B C5 A B G A - ", 280), music.PlaybackMode.InBackground)
    basic.showLeds(`
        # # . . .
        . . . # .
        # . # . .
        . . . . .
        . . # . #
        `)
    basic.pause(500)
    basic.clearScreen()
    led.setBrightness(50)
    basic.showLeds(`
        . . . . .
        . . . . .
        . # . . .
        . . . . .
        . . . . #
        `)
    led.setBrightness(110)
    basic.showLeds(`
        . . . . .
        . . . . .
        # # # . .
        . . . . #
        . . . . #
        `)
    led.setBrightness(190)
    basic.showLeds(`
        . . . . .
        # . # . .
        # # # . #
        # . # . #
        . . . . #
        `)
    led.setBrightness(255)
    basic.showLeds(`
        # . # . #
        # . # . .
        # # # . #
        # . # . #
        # . # . #
        `)
    basic.pause(2000)
    basic.clearScreen()
    status = 0
})
input.onGesture(Gesture.ScreenUp, function () {
    if (status == 0) {
        if (input.isGesture(Gesture.ScreenUp)) {
            if (input.buttonIsPressed(Button.B)) {
                basic.showIcon(IconNames.Ghost)
                radio.sendMessage(RadioMessage.BLOCK)
                basic.pause(100)
                basic.clearScreen()
            }
        }
    }
})
radio.onReceivedMessage(RadioMessage.Hi_gagez, function () {
    status = 3
    basic.clearScreen()
    music.play(music.stringPlayable("E B C5 A B G A - ", 280), music.PlaybackMode.InBackground)
    basic.showLeds(`
        # # # . .
        . . . . #
        # . . . .
        . . . . #
        . . # . .
        `)
    basic.pause(500)
    basic.clearScreen()
    led.setBrightness(50)
    basic.showLeds(`
        . . . . .
        . . . . .
        . # . . .
        . . . . .
        . . . . #
        `)
    led.setBrightness(110)
    basic.showLeds(`
        . . . . .
        . . . . .
        # # # . .
        . . . . #
        . . . . #
        `)
    led.setBrightness(190)
    basic.showLeds(`
        . . . . .
        # . # . .
        # # # . #
        # . # . #
        . . . . #
        `)
    led.setBrightness(255)
    basic.showLeds(`
        # . # . #
        # . # . .
        # # # . #
        # . # . #
        # . # . #
        `)
    basic.pause(2000)
    basic.clearScreen()
    status = 0
})
let SYNC_do_ok = 0
let Online_reciving_times = 0
let SYNC_give = 0
let online = 0
let SYNC_did = 0
let XY3_view = 0
let XY2_view = 0
let Y_view = 0
let X_view = 0
let status = 0
status = 1
serial.writeLine(control.deviceName())
music.setVolume(130)
music.stopAllSounds()
X_view = 0
// -1 = riga 1 non attiva
Y_view = -1
// -1 = riga 2 non attiva
XY2_view = -1
// -1 = riga 2 non attiva
XY3_view = -1
SYNC_did = 0
online = 0
radio.setGroup(137)
// Potenza massima (0-7)
radio.setTransmitPower(7)
led.setBrightness(30)
turtle.setPosition(0, 0)
turtle.turnRight()
turtle.setSpeed(30)
led.setBrightness(255)
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . # . .
    `)
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . # . .
    . # . # .
    `)
basic.showLeds(`
    . . . . .
    . . . . .
    . . # . .
    . # . # .
    # . . . #
    `)
basic.showLeds(`
    . . . . .
    . . # . .
    . # . # .
    # . . . #
    . # . # .
    `)
basic.showLeds(`
    . . # . .
    . # . # .
    # . . . #
    . # . # .
    . . # . .
    `)
basic.showLeds(`
    . # . # .
    # . . . #
    . # . # .
    . . # . .
    . . . . .
    `)
basic.showLeds(`
    # . . . #
    . # . # .
    . . # . .
    . . . . .
    . . . . .
    `)
basic.showLeds(`
    . # . # .
    . . # . .
    . . . . .
    . . . . .
    . . . . .
    `)
basic.showLeds(`
    . . # . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
basic.clearScreen()
status = 0
basic.forever(function () {
    if (online == 0) {
        X_view = -1
        Y_view = -1
        XY2_view = -1
        XY3_view = -1
    } else if (online <= 5) {
        // Riga 0: forward(N-1) disegna N LED (il turtle include il punto di partenza)
        // 1 utente → forward(0) = 1 LED, 5 utenti → forward(4) = 5 LED
        X_view = online
        Y_view = -1
        XY2_view = -1
        XY3_view = -1
    } else if (online <= 10) {
        // Riga 0 piena (5 LED)
        X_view = 5
        // 6 utenti → forward(0) = 1 LED, 10 utenti → forward(4) = 5 LED
        Y_view = online - 5
        XY2_view = -1
        XY3_view = -1
    } else if (online <= 15) {
        X_view = 5
        // Riga 1 piena (5 LED)
        Y_view = 5
        // 11 utenti → forward(0) = 1 LED, 15 utenti → forward(4) = 5 LED
        XY2_view = online - 10
        XY3_view = -1
    } else if (online <= 20) {
        X_view = 5
        // Riga 1 piena (5 LED)
        Y_view = 5
        // Riga 1 piena (5 LED)
        XY2_view = 5
        // 11 utenti → forward(0) = 1 LED, 15 utenti → forward(4) = 5 LED
        XY3_view = online - 15
    }
})
