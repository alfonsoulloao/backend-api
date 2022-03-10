import { Injectable } from '@nestjs/common';
import { BlobServiceClient } from '@azure/storage-blob';
import { environments } from './common/environments';
import { DefaultAzureCredential  }  from '@azure/identity'
import {  SecretClient } from '@azure/keyvault-secrets'
import * as bcrypt from 'bcrypt';
import { IResponseLoginSalida } from './model/salida/loginSalida';
import { LoginInput } from './model/input/loginInput';
import { JwtService } from '@nestjs/jwt';
import { BddDataInput } from './model/input/bddinputr';
import {  DbDataSalidaDTO } from './model/salida/dbSalida';
import { plainToInstance } from 'class-transformer';
import dataBaseConection from './conndatabase/database.provider';


@Injectable()
export class AppService {
  azureConnection = environments.az.ConnectionAzure;
  container = "pruebatyg"
  
  constructor(private jwtService: JwtService) {}
  
  async testBdd(input:BddDataInput){    
    // crear inicio de conexion 
    let conn = dataBaseConection;
    let result:DbDataSalidaDTO[];
    try {
                  
      // entrego parametros al sp para crear el queryString            
      let query:string = `exec sp_prueba @valor = "valor 1"`;
      // let query:string = `exec sp_prueba @valor = "${input.valor}"`
      
      //realizo ejecucion de la quiery
      let [data] = await conn.query(query);
      // convierto data en un objeto de tipo DTO
      result = plainToInstance(DbDataSalidaDTO,data);    
      
      // retorno resultado
      return result;                            
    } catch (err) {
      // retorno de error 
      throw new Error(err);
    }finally{    
      // finalizo conexion de la consulta
      var conection = conn.close();      
      console.log(`conexion cerrada ${conection}`);        
    }
  }



    async getHello() {
    //url del secreto  https://decode.vault.azure.net/secrets/ConnectionAzure/2e8ee6e08e0c44ac8ebe0facb98a4789
    var cre = environments.kv;
    const vaultName = "Decode";
    //nombre ConnectionAzure
    const credential = new DefaultAzureCredential;  
    console.log(credential);  
    const url = `https://decode.vault.azure.net/`;    
    const client = new SecretClient(url, credential);    
    const secretName = "ConnectionAzure";    
    const latestSecret = await client.getSecret(secretName);    
    console.log(`Latest version of the secret ${secretName}: `, latestSecret);    
    const specificSecret = await client.getSecret(secretName, { version: latestSecret.properties.version! });    
    console.log(`The secret ${secretName} at the version ${latestSecret.properties.version!}: `, specificSecret);
    var valor = specificSecret.value
    return valor;
  };


  // getHello(): string {
  //   var env = environments.az.ConnectionAzure;     
  //   console.log(env);
    
  //   return env;
  // }


  // metodos para cargar archivos en storage

  // aplicacion consumida por l
  getBlockblobClient(filename:string){
    // creo la conexion a azure 
    const blobServiceClient = BlobServiceClient.fromConnectionString(this.azureConnection);
    // retorna el valor del contenedor creado en azure 
    const blobContainer =  blobServiceClient.getContainerClient(this.container);
    // retorno el acceso al contenedor 
    return blobContainer.getBlockBlobClient(filename);
  }

  // recordar ver la libreria de Multer que se usa con Express
  // metodo para Subir imagenes
  async uploadImage(file: Express.Multer.File){
    const blockBlobclient = this.getBlockblobClient(file.originalname);
    await blockBlobclient.uploadData(file.buffer);
  }

  // Metodo para traer el archivo desde azure
  async readStream(filename:string){
     const blockBlobClient = this.getBlockblobClient(filename);
     const blobDownload = await blockBlobClient.download(0);
     return blobDownload.readableStreamBody;
  }



  // fin metodos para cargar archivos en storage


  // metodos para encriptar
//  async encrypt(input:LoginInput){
//   let response: IResponseLoginSalida=null;    
//     const saltOrRounds = 10;
//     const salt = await bcrypt.genSalt();

//     response = {
//       correo: await bcrypt.hash(`${input.correo} correo esta Ok`,saltOrRounds),
//       password:await bcrypt.hash(`${input.password} el Password Ok`,saltOrRounds) 
//     }
        
//     return response;

//   }


  // method JWT

  // async validateUser(input:LoginInput): Promise<any> {
  //   const isMatch = await bcrypt.compare(password, hash); 
  //   if (input && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  // async login(input: LoginInput) {
  //   // de esta manera agrego los valores al payload
  //   let loginSalida: IResponseLoginSalida2[]=[];
  //   // esya clase la cree para agregar valores 
  //   let loginSalida1: IResponseLoginSalida2={tknSalida:"mismoToken",valorX:"elMismoValorX",ip:"128.1.1.1"}
    
  //   // agrego valores al objeto 
  //   loginSalida.push(loginSalida1);

  //   const payload = { loginSalida };
  //   return {  
  //      access_token: this.jwtService.sign(payload),
  //   };
  // }

  // async validateUser(input: LoginInput): Promise<any> {
  //   const user = input;
  //   if (user.password === "123pass") {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }
  


//  async  testBdd() {
//     try {
//       await sequelize.authenticate();
//       console.log('conexion a base de datos, exitoso!!');   
//       return sequelize;
//     } catch (err) {
//       console.log('Falso');     
//     }

//   }

  

  
}


