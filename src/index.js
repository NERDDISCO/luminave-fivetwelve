import { DmxOutput } from 'fivetwelve'
// import CliDebugDriver from 'fivetwelve-cli-debug-driver'
import { initFivetwelveBridge } from 'fivetwelve-bridge'
import SerialPort from 'serialport'
import EnttecUsbProMk2Driver from 'fivetwelve-driver-usbpro/lib/EnttecUsbProMk2Driver'
import config from './config.js'

// @TODO: Use the vendorId instead
const manufacturer = new RegExp('enttec', 'i')

const { host, port, debugMode } = config

// Create the fivetwelve bridge
const bridge = initFivetwelveBridge()
bridge.listen(port, host, () => {
  console.log(`luminave-fivetwelve is listening on ${host}:${port}`)
})

// Create a DMX table in the console
if (debugMode) {

  /**
   * @TODO Needs to be fixed, currently not working
   * @see https://github.com/chjj/blessed/issues/217
   */
  // const output = new DmxOutput(new CliDebugDriver())
  // output.start(1000 / 30)

  // bridge.setOutput(output)

// Use the actual DMX controller connected via USB
} else {
  // Find all connected USB devices
  SerialPort.list().then(
    ports => {
      ports.forEach(usbPort => {
        if (usbPort.comName.includes('usb')) {
          console.log(usbPort)

          // Find enttec
          if (manufacturer.test(usbPort.manufacturer)) {

            console.log('Found enttec DMX USB Pro')

            // Use the port to find the correct controller automatcially
            const usbproSerialport = new SerialPort(usbPort.comName)

            const output = new DmxOutput(new EnttecUsbProMk2Driver(usbproSerialport), 1)
            output.start(1000 / 30)

            bridge.setOutput(output)

            console.log('Set enttec DMX USB Pro as the output for fivetwelve')
          }
        }
      })
    },
    err => console.error(err)
  )
}
