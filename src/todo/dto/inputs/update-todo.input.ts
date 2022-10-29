import { Field, InputType, Int } from "@nestjs/graphql";
import { IsString, IsInt, IsOptional, Min, IsBoolean, IsNotEmpty, MaxLength } from "class-validator";

@InputType()
export class UpdateTodoInput {

    @IsInt()
    @Min(1)
    @Field( () => Int )
    id: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(25)
    @IsOptional()
    @Field( () => String, { nullable: true, description: 'You need fill this field' } )
    description?: string;

    @IsBoolean()
    @IsOptional()
    @Field( () => Boolean, {nullable: true, description: 'Check todo'} )
    done?: boolean;
}