import mongoose from 'mongoose';
import Env from '@ioc:Adonis/Core/Env';

interface ConnectionInfo {
  connection: mongoose.Connection;
  startTime: number;
}

let isConnected = false;
let activeConnections: ConnectionInfo[] = [];  


export default async function connectToDatabase() {

  const result = await getActiveConnectionsInfo();
  console.log(result);

  if (isConnected) {
    return mongoose.connection;
  }

  const connectionString = Env.get('DB_MONGODB_CONNECTION');

  try {
    await mongoose.connect(connectionString);

    console.log('Conexion creada:' + mongoose.connection.id);
    activeConnections.push({
      connection: mongoose.connection,
      startTime: Date.now(),
    });
    isConnected = true;
    console.log('Conexión a MongoDB exitosa');
    return mongoose.connection;
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw error;
  }
}

export async function disconnectFromDatabase() {
  if (!isConnected) {
    console.log('No hay conexión para desconectar');
    return;
  }
  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log('Desconexión de MongoDB exitosa');
  } catch (error) {
    console.error('Error al desconectar de MongoDB:', error);
    throw error;
  }
}


export function getActiveConnectionsInfo() {
  const now = Date.now();
  const connectionsInfo = activeConnections.map((info) => {
    const activeTime = (now - info.startTime) / 1000;
    return {
      connectionId: info.connection.id,
      activeTimeInSeconds: activeTime,
    };
  });
  console.log('Conexiones activas:', connectionsInfo);
  return connectionsInfo;
}

export async function closeOldConnections() {
  console.log('Cerrando conexiones antiguas...');
  console.log('Conexiones activas:', activeConnections);
  const now = Date.now();

  const oldConnections = activeConnections.filter((info) => {
    const activeTime = (now - info.startTime) / 1000;
    return activeTime > 1800;
  });

  for (const connectionInfo of oldConnections) {
    try {
      await connectionInfo.connection.close(); 
      console.log(`Cerrando conexión con ID: ${connectionInfo.connection.id}`);
    } catch (error) {
      console.error(`Error al cerrar la conexión con ID: ${connectionInfo.connection.id}`, error);
    }
  }

  activeConnections = activeConnections.filter(
    (info) => !oldConnections.includes(info)
  );
}
