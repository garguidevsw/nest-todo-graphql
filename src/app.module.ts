import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { HelloWorldModule } from './hello-world/hello-world.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // debug: false,
      autoSchemaFile: join( process.cwd(), 'src/schema.gql' ),
      playground: false,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault
      ]
    }),
    HelloWorldModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}