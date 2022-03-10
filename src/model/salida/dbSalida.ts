import { Model } from "sequelize";

export interface DbDataSalida extends Model {

    id: number;
    valor: string;
}
export type IResponseDbSalida = DbDataSalida;


export class DbDataSalidaDTO extends Model{

    salida: string;
    valor: number;
}
