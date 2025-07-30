const app = require('./app')
const connection = require('./db/connection')
const PORT = process.env.PORT || 3000

connection



server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
