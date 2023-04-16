import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
// import { JwtModule, JwtService } from '@nestjs/jwt';
// import { JWT_SECRET } from './constant';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  // JwtModule.register({
  //   global: true,
  //   secret: JWT_SECRET,
  //   signOptions: { expiresIn: '3600s' },
  // }),
],
  providers: [
    UsersService,
    AuthService,
    // JwtService,
  ],
  controllers: [UsersController],
})
export class UsersModule {
  configure(consumer:MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*')
  }
}