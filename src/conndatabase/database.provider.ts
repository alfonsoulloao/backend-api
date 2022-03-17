import { Sequelize } from "sequelize-typescript";
import { environments } from "src/common/environments";

/**
 * declaracion de variables para conexion
 */
export interface IDbConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

/**
 * remplazo de valores por variables de entorno
 */
const dataBaseConfig: IDbConfig = JSON.parse(environments.db.connectionString); 

  /**   
   * conexion recomendada por libreria para sql Server, ver pool de conexiones 
   */
  const dataBaseConection = new Sequelize(dataBaseConfig.database, dataBaseConfig.username, dataBaseConfig.password, {
     host: dataBaseConfig.host,
     dialect: 'mssql',
     port: dataBaseConfig.port,
     pool: {
      max: 5,   //Número máximo de conexiones en el grupo. El valor predeterminado es 5
      min: 0,  //Número mínimo de conexiones en el grupo. El valor predeterminado es 0
      acquire: 30000, //El tiempo máximo, en milisegundos, que ese grupo intentará obtener la conexión antes de generar un error
      idle: 10000  
      //El tiempo máximo, en milisegundos, que una conexión puede estar inactiva antes de liberarse
    }
  });

  const sqlConfig = {
    user: dataBaseConfig.username,
    password: dataBaseConfig.password,
    database: dataBaseConfig.database,
    server: dataBaseConfig.host,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000, //El tiempo máximo, en milisegundos, que ese grupo intentará obtener la conexión antes de generar un error
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: false // change to true for local dev / self-signed certs
    }
  }





  export default  dataBaseConection;













  



