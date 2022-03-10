import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { CoreController } from './controllers/core.controller';
import { CoreService } from './services/core.service';
import { CoreProvider } from './providers/core.provider';
import { Mapper } from './services/mappings/mapper.service';
import dataBaseConection from './conndatabase/database.provider';


@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AppController, CoreController],
  providers: [AppService,JwtStrategy, CoreService, CoreProvider, Mapper],
})


export class AppModule implements NestModule{
  async configure(consumer: MiddlewareConsumer) {
    dataBaseConection
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
  }
}
