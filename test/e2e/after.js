import mongoose from 'mongoose'

after(dropDatabase)

function dropDatabase() {
  mongoose.connection.dropDatabase()
}
