import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

const envPath: string = join(__dirname, '../.env.local');

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: envPath, isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      driver: ApolloDriver,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.aogfbow.mongodb.net/?retryWrites=true&w=majority`,
    ),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
