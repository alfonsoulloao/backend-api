import { Injectable } from '@nestjs/common';
import {  plainToClass, plainToInstance } from 'class-transformer';
import { TyGException } from 'src/common/errors/exception';
import dataBaseConection from 'src/conndatabase/database.provider';
import { ConsultaUsuarioDto } from 'src/model/dto/consultaUsuario.dto';
import { LoginDto } from 'src/model/dto/login.dto';
import { UsuarioRolDto } from 'src/model/dto/usuarioRol.dto';
import { LoginInput } from 'src/model/input/loginInput';
import { UsuarioRolInput } from 'src/model/input/usuarioRolInput';


@Injectable()
export class CoreProvider {

  /**  
   * metodo que ejecuta procedimientos de almacenado
  */
  async loginProvider(input: LoginInput) {
    let conn = dataBaseConection;
    let result: LoginDto;
    let data;
    try {      
      let query: string = `EXEC SP_TYG_PD_CONSULTAR_LOGIN @rut = "${input.rutUsuario}"`;
      
      [data] = await conn.query(query);
      
      //puede evaluar un tipo dato creo ? <LoginDto>
      if (Object.entries(data).length === 0) {        
        return result;
      }
      result = plainToInstance(LoginDto, data[0]);
      return result;
    } catch (err) {
      throw new TyGException(`${err}`);          
    }
  }
  


  /**  
   * metodo que ejecuta procedimientos de almacenado para solicirar datos usuarios
  */
   async dautosUsuarioProvider(input: LoginInput) {
    let conn = dataBaseConection;
    let result: ConsultaUsuarioDto;
    let data;
    try {      
      let query: string = `EXEC SP_TYG_PD_CONSULTAR_USUARIO_DATOS @rut = "${input.rutUsuario}"`;
      
      [data] = await conn.query(query);
      
      //puede evaluar un tipo dato creo ? <LoginDto>
      if (Object.entries(data).length === 0) {        
        return result;
      }
      result = plainToInstance(ConsultaUsuarioDto, data[0]);
      return result;
    } catch (err) {
      throw new TyGException(`${err}`);          
    }
  }


   /**  
   * metodo que ejecuta procedimientos de almacenado para obtener datos del rol del usuario
   * es utilizado para cargar valores en barra de navegacion 
  */
    async usuarioRolprovider(input: UsuarioRolInput) {
      let conn = dataBaseConection;
      let result: UsuarioRolDto[]=[];
      // let data;
      try {      
        console.log(input);
        
        let query: string = `EXEC SP_TYG_PD_CONSULTAR_USUARIO_ROL @IDUSUARIO = "${input.usuarioId}"`;
        
        var [data,valor] = await conn.query(query);
        
        //puede evaluar un tipo dato creo ? <LoginDto>
        if (Object.entries(data).length === 0) {        
          return result;
        }
        
        result = plainToInstance(UsuarioRolDto, data);
        
        return result;
      } catch (err) {
        throw new TyGException(`${err}`);          
      }
    }



}
