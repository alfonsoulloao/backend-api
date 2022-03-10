import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsString, Length, ValidateNested } from "class-validator";
import { Header } from "../envelop";

export class LoginInput {
    @ApiProperty()
    @IsString({ message: 'Parametro requeriodo de tipo string' })
    @Length(9, 10)
    rutUsuario:string;
    
    @ApiProperty()
    @IsString({ message: 'Parametro requeriodo de tipo string' })
    password:string;
}

export class LoginInputEnvelop {
    @ApiProperty()    
    @Type(() => Header)
    header: Header;
    
    @ApiProperty()
    @IsDefined()
    body: LoginInput;
}
