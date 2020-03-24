namespace i2c {
    const I2C_ADDR = 0x20
    const REG_TEST = 0x01

    function initialize() {
        // nothing to do
    }

    initialize()

    function getRegister(register: number): number {
        let data = pins.createBuffer(1)
        data[0] = register
        pins.i2cWriteBuffer(I2C_ADDR, data)
        return pins.i2cReadNumber(I2C_ADDR, NumberFormat.Int8LE)
    }

    function setRegister(register: number, value: number) {
        let data = pins.createBuffer(2)
        data[0] = register
        data[1] = value
        pins.i2cWriteBuffer(I2C_ADDR, data)
    }

    export function test(): boolean {
        setRegister(REG_TEST, 0b11)
        basic.pause(10)
        return (getRegister(REG_TEST) == 0b11)
    }
}
