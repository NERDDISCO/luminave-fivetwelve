import { DmxOutput } from 'fivetwelve'
import { initFivetwelveBridge } from 'fivetwelve-bridge'
import SerialPort from 'serialport'
import EnttecUsbProMk2Driver from 'fivetwelve-driver-usbpro/lib/EnttecUsbProMk2Driver'
import config from './config.js'

// @TODO: Use the vendorId instead
const manufacturer = new RegExp('enttec', 'i')

const { host, port } = config

// Create the fivetwelve bridge
const bridge = initFivetwelveBridge()
bridge.listen(port, host, () => {
  console.log(`fivetwelve-bridge is listening on ${host}:${port}`)
})

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
