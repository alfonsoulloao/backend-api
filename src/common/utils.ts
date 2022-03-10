import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import * as moment from 'moment-timezone';
import { IEnvelopError, IEnvelopRetorno } from 'src/model/envelop';
import { LoginInput } from 'src/model/input/loginInput';
import { UsuarioRolInput } from 'src/model/input/usuarioRolInput';
import { IMensajeSalida } from 'src/model/salida/mensajeSalida';
import { TyGNotFoundException } from './errors/exception';

/**
 * da formato a fechas metodo generico
 */
export const formatoFecha = (fecha: string) => {
  var fechaConFormato = '';
  if (fecha === null) {
    fechaConFormato = '';
  } else {
    if (fecha != ' ') {
      fechaConFormato = moment
        .tz(fecha, 'America/Santiago')
        .format('YYYY-MM-DDTHH:mm:ss.SSSSSSS');
    }
  }
  return fechaConFormato;
};

/**
 * transforma fechas con formato
 */
export const convertStringToDate = (fecha: string) => {
  try {
    let fechaDate: Date;
    if (fecha === null) {
      return null;
    } else {
      let fechaConFormato: string = moment
        .tz(fecha, 'America/Santiago')
        .format('YYYY-MM-DD-HH-mm-ss');
      let array: string[] = fechaConFormato.split('-');
      fechaDate = new Date(
        parseInt(array[0]),
        parseInt(array[1]),
        parseInt(array[2]),
        parseInt(array[3]),
        parseInt(array[4]),
        parseInt(array[5]),
      );
      return fechaDate;
    }
  } catch (error) {
    return null;
  }
};

/**
 * indica la fecha actual del sistema, creado para consumo generico
 */
export const fechaActual = () => {
  var fechaConFormato = '';
  // tomamos la fecha y hora del sistema
  let fecha = new Date();
  // le damos formato a la fecha y hora
  fechaConFormato = moment
    .tz(fecha, 'America/Santiago')
    .format('YYYY-MM-DDTHH:mm:ss.SSSSSSS');
  return fechaConFormato;
};

/**
 * realiza mapeo de valores para salida con formato
 */
export function formatoSalida(envelop: any, startDate: string, data: any) {
  let fecha = new Date();
  let endDate = moment
    .tz(fecha, 'America/Santiago')
    .format('YYYY-MM-DDTHH:mm:ss.SSSSSSS');

  let retorno: IEnvelopRetorno = {
    header: {
      dataValidation: {
        ip: envelop.header.dataValidation.ip,
        server: envelop.header.dataValidation.server,
        startDate: startDate,
        endDate: endDate,
      },
    },
    body: data,
  };
  return retorno;
}

/**
 * realiza mapeo de valores para salida con formato para los errores
 */
export function formatoError(
  exception: any,
  envelop: any,
  startDate: string,
  path: string,
  method: string,
) {
  let fecha = new Date();
  let endDate = moment
    .tz(fecha, 'America/Santiago')
    .format('YYYY-MM-DDTHH:mm:ss.SSSSSSS');

  let type: string = 'Functional';
  if (exception.message.match('ORA-')) {
    type = 'Technical';
  }

  let retorno: IEnvelopError = {
    header: {
      dataValidation: {
        ip: envelop.header.dataValidation.ip,
        server: envelop.header.dataValidation.server,
        startDate: startDate,
        endDate: endDate,
      },
    },
    body: {
      error: {
        description: `Error al consumir el servicio con el metodo ${method} y la ruta ${path}, ${exception.message}`,
        type: type,
        detail: [
          {
            level: 'Fatal',
            type: type,
            backend: exception.__proto__.constructor.name,
            code: exception.status + '',
            description: exception.stack,
          },
        ],
      },
    },
  };

  return retorno;
}

/**
 * valida los parametros de entrada para la clase
 */

export async function validarInput(input: any, clase: string) {
  try {
    let object: any;

    switch (clase) {
      case 'LoginInput':
        object = plainToClass(LoginInput, input);
        break;
      case 'UsuarioRolInput':
        object = plainToClass(UsuarioRolInput, input);
        break;
      default:
        break;
    }
    const errors = await validate(object);

    if (errors.length > 0) {
      let error = '';
      let cont = 0;
      for (let i = 0; i < errors.length; i++) {
        let { isInt, isString } = errors[i].constraints;
        if (cont != 0) {
          error += ', ';
        }
        if (isInt != undefined) {
          error += isInt;
        }
        if (isString != undefined) {
          error += isString;
        }
        cont++;
      }
      throw new TyGNotFoundException(error);
    }
  } catch (error) {
    throw new TyGNotFoundException(error);
  }
}

/**
 *
 * entrega mensaje de salida con un status, valor generico para respuestas
 *
 */
export function respuestaRetorno(exito: boolean, mensaje: string = '') {
  let estado: string = 'NO-OK';
  if (exito) {
    estado = 'OK';
  }
  let retorno: IMensajeSalida = {
    estado: estado,
    mensaje: mensaje,
  };
  return retorno;
}
