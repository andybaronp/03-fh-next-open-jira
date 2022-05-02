import mongoose from 'mongoose'

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = conneccting
 * 3 = disconnecting
 */

const mongooConnection = {
  isConnected: 0,
}

export const connect = async () => {
  if (mongooConnection.isConnected === 1) {
    console.log('ya estamos conectados')
    return
  }

  if (mongoose.connections.length > 0) {
    mongooConnection.isConnected = mongoose.connections[0].readyState

    if (mongooConnection.isConnected === 1) {
      console.log('usando conecion anterios')
      return
    }

    await mongoose.disconnect()
  }

  await mongoose.connect(process.env.MONGO_URL || '')

  mongooConnection.isConnected = 1

  console.log('conectado a mongoose', process.env.MONGO_URL)
}

export const disconnect = async () => {
  if (mongooConnection.isConnected === 0) return
  await mongoose.disconnect()
  console.log('desconectado')
}
