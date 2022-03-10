
export interface ConsultaUsuarioDataSalida {

    idPersona: number;
    comuna: string;
    tipoDocumento: string;
    rutUsuario: string;
    correoElectronico: string;
    nombre: string;
    apellidoPaterno: string;
    apellidiMaterno: string;
    fechanacimiento: string;
    celular: string;
    planta: string;
    nacionalidad: string;
    sexo: string;
    estadoPersona: string;
    idUsuario: number;
    fechaCreacion: string;
    estadoUsuario: string;
    nombreJefatura: string;
    nombreGerente: string;  
}
export type IResponseConsultaUsuarioSalida = ConsultaUsuarioDataSalida;

