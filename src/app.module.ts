import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './users/users.module';
import { TaskModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const envType = configService.get('NODE_ENV');

        if (envType === 'LOCAL') {
          return {
            uri: 'mongodb+srv://davinder:davinder@cluster0.me45dtu.mongodb.net/',
          };
        }

        const username = configService.get('DATABASE_USERNAME');
        const password = configService.get('DATABASE_PASSWORD');
        const host = configService.get('DATABASE_HOST');

        const uri = `mongodb+srv://${username}:${password}@${host}/`;

        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    TaskModule,
  ],
})
export class AppModule {}
