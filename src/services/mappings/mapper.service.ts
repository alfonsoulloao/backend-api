import { Injectable } from '@nestjs/common';
import { ConsultaUsuarioDto } from 'src/model/dto/consultaUsuario.dto';
import { UsuarioRolDto } from 'src/model/dto/usuarioRol.dto';
import { IResponseConsultaUsuarioSalida } from 'src/model/salida/consultaUsuarioSalida';
import { IResponseUsuarioRolSalida } from 'src/model/salida/usuarioRolSalida';

@Injectable()
export class Mapper {


     /**
     * mepeo de valores para transformacion de clases
    */
      mapObtenerDautosUsuario(responseUsuarioSalida : ConsultaUsuarioDto ){
        let usuarioSalida: IResponseConsultaUsuarioSalida=null ;

        
            let userSalida: IResponseConsultaUsuarioSalida ={
                idPersona: responseUsuarioSalida.IDPERSONA,
                comuna: responseUsuarioSalida.COMUNA,
                tipoDocumento:  responseUsuarioSalida.TIPODOCUMENTO,
                rutUsuario: responseUsuarioSalida.RUT,
                correoElectronico: responseUsuarioSalida.CORREOELECTRONICO,
                nombre: responseUsuarioSalida.NOMBRE,
                apellidoPaterno: responseUsuarioSalida.APELLIDOPATERNO,
                apellidiMaterno: responseUsuarioSalida.APELLIDOMATERNO,
                fechanacimiento: responseUsuarioSalida.FECHANACIMIENTO,
                celular: responseUsuarioSalida.CELULAR,
                planta: responseUsuarioSalida.PLANTA,
                nacionalidad: responseUsuarioSalida.NACIONALIDAD,
                sexo: responseUsuarioSalida.SEXO,
                estadoPersona: responseUsuarioSalida.ESTADO_PERSONA,
                idUsuario:  responseUsuarioSalida.IDUSUARIO,
                fechaCreacion: responseUsuarioSalida.FECHACREACION,
                estadoUsuario: responseUsuarioSalida.ESTADO_USUARIO,
                nombreJefatura: responseUsuarioSalida.NOMBRE_JEFATURA,
                nombreGerente: responseUsuarioSalida.NOMBRE_GERENTE
            }
                    
        return userSalida;
    }
    




    /**
     * mepeo de valores para transformacion de clases
    */
    mapObtenerUsuarioRol(responseUsuarioRol : UsuarioRolDto[] ){
        let usuarioRol: IResponseUsuarioRolSalida[] = [];
        responseUsuarioRol.forEach((value) => {
            let userRol: IResponseUsuarioRolSalida ={
                idMenu: value.IDMENU,
                tituloMenu: value.TITULOMENU,
                iconoMenu: value.ICONOMENU,
                idSubMenu: value.IDSUBMENU,
                subMenu: value.SUBMENU,
                url: value.URI,
                estado: value.ESTADO             
            }
            usuarioRol.push(userRol);
        });
        
        return usuarioRol;
    }

}