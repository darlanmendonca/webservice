const mongoose = require('mongoose')

after(dropDatabase)

function dropDatabase() {
  mongoose.connection.dropDatabase()
}
