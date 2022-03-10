import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsInt, ValidateNested } from "class-validator";
import { Header } from "../envelop";


export class UsuarioRolInput {
    
    @ApiProperty()
    @IsInt({ message: 'Parametro requeriodo de tipo string' })
    // @Length(9, 10)
    usuarioId:number;        
}

export class UsuarioRolInputEnvelop {
    @ApiProperty()
    @ValidateNested()
    @Type(() => Header)
    header: Header;
    
    @ValidateNested()
    @ApiProperty()
    @IsDefined()
    @Type(() => UsuarioRolInput)
    body: UsuarioRolInput;
}
