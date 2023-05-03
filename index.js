const logger = require('./utils/logger.js')

const config = require('./utils/config.js')
const app = require('./app.js')




app.listen(config.PORT, () => {
  console.log(`server running on port ${config.PORT}`)
})