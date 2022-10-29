import { ArgsType, Field } from "@nestjs/graphql";
import { IsBoolean, IsOptional } from "class-validator";

@ArgsType()
export class StatusArgs {

    @IsOptional()
    @IsBoolean()
    @Field( () => Boolean, { nullable: true, description: 'Status Todo' } )
    status?: boolean;
}