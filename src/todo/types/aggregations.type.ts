import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: 'Todo quick aggregations' })
export class AgreggationsType {
    @Field( () => Int )
    total: number;

    @Field( () => Int )
    pending: number;

    @Field( () => Int )
    completed: number;

    @Field( () => Int, { deprecationReason: 'Most use completed instead'} )
    totalTodos: number;
}