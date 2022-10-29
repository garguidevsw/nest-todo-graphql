import { Field, InputType } from "@nestjs/graphql";
import { IsString, IsNotEmpty, MaxLength } from "class-validator";

@InputType()
export class CreateTodoInput {
    @IsString()
    @IsNotEmpty()
    @MaxLength(25)
    @Field( () => String, { description: 'You need fill this field' } )
    description: string;
}