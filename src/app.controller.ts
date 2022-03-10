import { Body, Controller, Get, Header, Post, Query, Res, UploadedFile,  UseInterceptors } from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { BddDataInput } from './model/input/bddinputr';
import { LoginInput } from './model/input/loginInput';
import { IResponseLoginSalida } from './model/salida/loginSalida';

@Controller('apidemo')
export class AppController {
  constructor(private readonly appService: AppService) {}

//   @Get()
//   async getHello():Promise<string> {    
//     var r = await this.appService.getHello();
//     return r;
//   }


//   @Post("upload")
//   @UseInterceptors(FileInterceptor('myfile'))
//   async upload(@UploadedFile() file:Express.Multer.File):Promise<string>{  
//     try {
//       await this.appService.uploadImage(file);
//       console.log(file.originalname);
//     } catch (err) {
//       console.log(err);    
//     }
//     return "uploaded";
//   }


//   @Get("read")
//   @Header("Content-type", "image/webp")
//   async read(@Res() res, @Query('name') name){
//   try {
//     const data = await this.appService.readStream(name); 
//     return data.pipe(res)
//   } catch (err) {    
//     console.log(err);    
//   }    
//  }

// @UseGuards(LocalAuthGuard)
// @Post("login")
// async login(@Body()input:LoginInput){

//   // variable para la salida encriptada
//   let response: IResponseLoginSalida=null;
//   let input2:LoginInput=null;
//   var resuly ;
//   try {
//     response = await this.appService.encrypt(input)
//     input2 = {
//       correo:response.correo,
//       password:response.password
//     }
//     resuly = await this.appService.login(input2)

//     console.log(`estos son los datos ${input.correo}, ${input.password}`);
//     }     catch (err) {
//     console.log(err);  
//   }
//   return resuly;
// }

// @Post('/basedatos')
// async pruebaDdd(@Body()input:BddDataInput){  
//   // realizo solicitud a 
//   var result = this.appService.testBdd(input)  
  
//   return result;
// }




}
