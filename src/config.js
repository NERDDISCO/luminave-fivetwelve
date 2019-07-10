import dotenv from 'dotenv'

// Parse the .env file
dotenv.config()

const config = {
  env: process.env.NODE_ENV || 'production',

  // Host of luminave-fivetwelve
  host: process.env.HOST || 'localhost',
  // Port of luminave-fivetwelve
  port: parseInt(process.env.PORT) || 1234,
  // USB device pathname eg. /dev/cu.usbserial-A7XSB63S
  usbDevicePort: process.env.USB_DMX_PORT
}

// When in debug mode there will be more log messages
config.debugMode = config.env === 'development'

export default config
