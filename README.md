<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Proyecto Introductorio NestJS + GraphQL

1. Crear proyecto
```
nest new project-name
```
2. Instalar dependencias de GraphQL
```
yarn add @nestjs/graphql @nestjs/apollo graphql apollo-server-express
```

3. Configurar _**app.module.ts**_ para usar GraphQL

``` TS
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // debug: false,
      // playground: false,
      autoSchemaFile: join( process.cwd(), 'src/schema.gql' ),
    }),
    ...
  ],
  ...
})
```

4. Endpoint por defecto
```
http://localhost:3000/graphql
```

5. Instalar dependencia para usar Apollo
```
yarn add apollo-server-core
```

6. Configurar _**app.module.ts**_ para usar GraphQL + Apollo (Desactivar playground)
``` TS
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
    ...
  ],
  ...
})
```

## Primeros Pasos

- Crear modulo en Nest
```
nest g mo helloWorld --no-spec
```

- Crear resolver en Nest
```
nest g r helloWorld --no-spec
```

- Primeros Query's
``` TS
@Query( () => String, {
    description: 'Query de Hola Mundo',
    name: 'hello'
})
helloWorld(): string {
    return 'Hello World!!';
}
```

- Query's con Argumentos
``` TS
@Query( () => Int, { name: 'randomFromZeroTo', description: 'Number from zero to'} )
  getRandomFromZeroTo( 
      @Args('to', { nullable: true, type: () => Int }) to: number = 6): number {
    return Math.floor( Math.random() * to );
  }
```