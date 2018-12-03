import { DmxOutput } from 'fivetwelve'
import { initFivetwelveBridge } from 'fivetwelve-bridge'
import SerialPort from 'serialport'
import EnttecUsbProMk2Driver from 'fivetwelve-driver-usbpro/lib/EnttecUsbProMk2Driver'

const manufacturer = new RegExp('enttec', 'i');
const fivetwelveBridgePort = 1234

// Find all connected USB devices
SerialPort.list().then(
  ports => {
    ports.forEach(port => {
      if (port.comName.includes('usb')) {
        console.log(port)

        // Find enttec
        if (manufacturer.test(port.manufacturer)) {

          console.log(`Found enttec DMX USB Pro`)

          // Use the port to find the correct controller automatcially
          const usbproSerialport = new SerialPort(port.comName)

          const output = new DmxOutput(new EnttecUsbProMk2Driver(usbproSerialport), 1)
          output.start(1000/30)

          bridge.setOutput(output)

          console.log(`Set enttec DMX USB Pro as the output for fivetwelve`)
        }
      }
    })
  },
  err => console.error(err)
)

// create a dummy-driver that doesn't do anything
// const driver = {
//   send(dmxBuffer) { 
//     // console.log(dmxBuffer)
//     return Promise.resolve(); 
//   }
// }

// Create fivetwelve bridge
const bridge = initFivetwelveBridge();
bridge.listen(fivetwelveBridgePort, 'localhost', () => {
  console.log(`fivetwelve-bridge is listening on localhost:${fivetwelveBridgePort}`);
});
