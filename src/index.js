import { DmxOutput } from 'fivetwelve'
// import CliDebugDriver from 'fivetwelve-cli-debug-driver'
import { initFivetwelveBridge } from 'fivetwelve-bridge'
import SerialPort from 'serialport'
import EnttecUsbProMk2Driver from 'fivetwelve-driver-usbpro/lib/EnttecUsbProMk2Driver'
import ArtNetDriver from 'fivetwelve-driver-artnet/lib'
import config from './config.js'

// @TODO: Use the vendorId instead
const manufacturer = new RegExp('enttec', 'i')

const { host, port, usbDevicePort, debugMode } = config

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
  Promise.resolve()
    .then(() => {
      if (config.artNetDeviceAddress) {
        return Promise.resolve().then(() => new ArtNetDriver(config.artNetDeviceAddress))
      }

      return Promise.resolve()
        .then(() => {
          if (usbDevicePort) {
            console.log('Using device port from config.')

            return usbDevicePort
          }

          return SerialPort.list().then(ports => ports.find(usbPort => {
              if (usbPort.comName.includes('usb')) {
                console.log(usbPort)

                // Find enttec
                if (manufacturer.test(usbPort.manufacturer)) {
                  console.log('Found enttec DMX USB Pro')

                  return usbPort.comName
                }
              }

              return false
            }))
        })
        .then(usbPort => {
          if (!usbPort) {
            console.error('No valid USB device found.')

            return false
          }
          // Use the port to find the correct controller automatcially
          const usbproSerialport = new SerialPort(usbPort)

          return new EnttecUsbProMk2Driver(usbproSerialport)
        })
    })
    .then(driver => {
      if (!driver) {
        console.error('No driver was created.')

        return
      }
      const output = new DmxOutput(driver, 1)
      output.start(1000 / 30)

      bridge.setOutput(output)

      console.log('Set enttec DMX USB Pro as the output for fivetwelve')
    })
    .catch(err => console.error(err))
}
