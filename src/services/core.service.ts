import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { TyGException } from 'src/common/errors/exception';
import { LoginInput } from 'src/model/input/loginInput';
import { UsuarioRolInput } from 'src/model/input/usuarioRolInput';
import { IResponseConsultaUsuarioSalida } from 'src/model/salida/consultaUsuarioSalida';
import { IResponseLoginSalida } from 'src/model/salida/loginSalida';
import { IResponseUsuarioRolSalida } from 'src/model/salida/usuarioRolSalida';
import { CoreProvider } from 'src/providers/core.provider';
import { Mapper } from './mappings/mapper.service';

@Injectable()
export class CoreService {
  constructor(private readonly _coreProvider: CoreProvider,
    private readonly mapper:Mapper) {}

  /**
   * metodo service para hacer peticion al provider y mappear datos.
   */
  async loginService(input: LoginInput) {
    let response :IResponseLoginSalida;
    try {
      const resultLogin = await this._coreProvider.loginProvider(input);
      
      if(resultLogin === undefined){
        return response= null;
      }else{

        if(resultLogin.MENSAJE == 'OK'){
          var num = input.password.localeCompare(resultLogin.VALOR);
          console.log(num);
          
           if(input.password.localeCompare(resultLogin.VALOR)!= 0){
              // si la clave no es igual
              response = { estado:"noK", clave: "Error Clave"}

           }else{
            //  si la clave es igual 
            response = { estado:"ok", clave: "ok"}
           }

        }else{
          response = { estado:resultLogin.CODE, clave: resultLogin.MENSAJE}          
        }

        
      }
      console.log(resultLogin);    
      return response;
    } catch (err) {
      throw new TyGException(`${err}`);
    }  
  
  }




  /**
   * metodo service para hacer peticion al provider y mappear datos.
   */
   async dautosUsuarioService(input: LoginInput) {
    let response :IResponseConsultaUsuarioSalida;
    try {
      const resultLogin = await this._coreProvider.dautosUsuarioProvider(input);
      
      if(resultLogin === undefined){
        return response= null;
      }else{
          
        response = this.mapper.mapObtenerDautosUsuario(resultLogin);

      }
        
      console.log(resultLogin);    
      return response;
    } catch (err) {
      throw new TyGException(`${err}`);
    }  
  
  }



   /**
   * metodo service para hacer peticion al provider y mappear datos.
   */
    async  usuarioRolService(input: UsuarioRolInput) {
      let response :IResponseUsuarioRolSalida[];
      try {
        const usuarioRolResul = await this._coreProvider.usuarioRolprovider(input);
        
        if(usuarioRolResul === undefined){
          response= null;
        }else{
          response = this.mapper.mapObtenerUsuarioRol(usuarioRolResul)
        }
           
        return response;
      } catch (err) {
        throw new TyGException(`${err}`);
      }  
    
    }

}
