import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TyGException } from 'src/common/errors/exception';
import { RequestInterceptor } from 'src/common/interceptor/requestResponse.interceptor';
import { validarInput } from 'src/common/utils';
import { LoginInput, LoginInputEnvelop } from 'src/model/input/loginInput';
import { UsuarioRolInput, UsuarioRolInputEnvelop } from 'src/model/input/usuarioRolInput';
import { IResponseConsultaUsuarioSalida } from 'src/model/salida/consultaUsuarioSalida';
import { IResponseLoginSalida } from 'src/model/salida/loginSalida';
import { IResponseUsuarioRolSalida } from 'src/model/salida/usuarioRolSalida';
import { CoreService } from 'src/services/core.service';

@Controller('api/v1.0/core')
@ApiTags('core')
@UseInterceptors(RequestInterceptor)
@UsePipes(ValidationPipe)
export class CoreController {
  constructor(private readonly _coreService: CoreService) {}


  /**
   * servicio para consultar valores de login
   */
  @ApiOperation({ summary: 'Realiza validacion del login' })
  @Post('/login')
  async login(@Body() envelop: LoginInputEnvelop) {
    try {
      let loginResul :IResponseLoginSalida;
      //convierto los datos del cuerpor en una clase tipada con validacion
      let input: LoginInput = envelop.body;
      await validarInput(input, "LoginInput");
      // consumo el metodo de services entregando valor solicitado (input) de un tipo espesifico
      loginResul = await this._coreService.loginService(input);
      
      let reultadoCuerpo: Object ={
        loginResul
     }    
      
      return reultadoCuerpo;
    } catch (err) {
      console.log(err);
      throw new TyGException(`${err}`);
    }
  }



  /**
   * servicio para consultar antecededentes del usuario
   */
   @ApiOperation({ summary: 'Realiza solicitud de antecedentes de usuario' })
   @Post('/antecedenteUsuarios')
   async antecedentesUsuarios(@Body() envelop: LoginInputEnvelop) {
     try {
       let consultaUsuario :IResponseConsultaUsuarioSalida;
       //convierto los datos del cuerpor en una clase tipada con validacion
       let input: LoginInput = envelop.body;
       await validarInput(input, "LoginInput");
       // consumo el metodo de services entregando valor solicitado (input) de un tipo espesifico
       consultaUsuario = await this._coreService.dautosUsuarioService(input);
       
       let resultadoCuerpo: Object ={
        consultaUsuario
      }    
       
       return resultadoCuerpo;
     } catch (err) {
       console.log(err);
       throw new TyGException(`${err}`);
     }
   }

  

   /**
   * metodo para obtener datos del usuario por rol
   */
    @ApiOperation({ summary: 'Realiza solicitud de antecedentes del rol del usuario' })
    @Post('/usuarioRol')
    async usuarioRol(@Body() envelop: UsuarioRolInputEnvelop) {
      try {
        let resultUserRol :IResponseUsuarioRolSalida[]=null;
        //convierto los datos del cuerpor en una clase tipada con validacion
        let input: UsuarioRolInput = envelop.body;
        await validarInput(input, "UsuarioRolInput");
        // consumo el metodo de services entregando valor solicitado (input) de un tipo espesifico
        resultUserRol = await this._coreService.usuarioRolService(input);
        
        let reultadoCuerpo: Object ={
          resultUserRol
        }    
        return reultadoCuerpo;
      } catch (err) {
        console.log(err);
        throw new TyGException(`${err}`);
      }
    }
}
