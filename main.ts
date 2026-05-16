let R1 = 0
let M = 0
let L1 = 0
let distance = 0
let RGB_Br = 0
maqueenPlusV2.I2CInit()
basic.showIcon(IconNames.Happy)
basic.forever(function () {
    RGB_Br += 0.05
    if (RGB_Br >= Math.PI * 2) {
        RGB_Br = 0
    }
    maqueenPlusV2.showColor(DigitalPin.P15, maqueenPlusV2.colors(maqueenPlusV2.NeoPixelColors.Blue))
    maqueenPlusV2.setBrightness(Math.sin(RGB_Br) * 127 + 127)
})
basic.forever(function () {
    distance = maqueenPlusV2.readUltrasonic(DigitalPin.P13, DigitalPin.P14)
    if (distance < 10) {
        maqueenPlusV2.controlLED(maqueenPlusV2.MyEnumLed.AllLed, maqueenPlusV2.MyEnumSwitch.Open)
        basic.showIcon(IconNames.Sad)
    } else {
        maqueenPlusV2.controlLED(maqueenPlusV2.MyEnumLed.AllLed, maqueenPlusV2.MyEnumSwitch.Close)
        basic.showIcon(IconNames.Happy)
    }
    basic.pause(500)
})
basic.forever(function () {
    L1 = maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorL1)
    M = maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorM)
    R1 = maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorL2)
    if (L1 == 1 || (M == 1 || R1 == 1)) {
        if (L1 == 0 && (M == 1 && R1 == 0)) {
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 30)
        }
        if (L1 == 1 && (M == 1 && R1 == 0)) {
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 0)
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, 60)
        }
        if (L1 == 0 && (M == 1 && R1 == 1)) {
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 60)
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, 0)
        }
    } else {
        maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
    }
})
