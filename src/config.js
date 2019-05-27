import dotenv from 'dotenv'

// Parse the .env file
dotenv.config()

const config = {
  env: process.env.NODE_ENV || 'development',

  // Host of luminave-fivetwelve
  hostLuminaveServer: process.env.HOST || 'localhost',
  // Port of luminave-fivetwelve
  portLuminaveServer: parseInt(process.env.PORT) || 1234
}

// When in debug mode there will be more log messages
config.debugMode = config.env === 'development'

export default config
