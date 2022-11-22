import { Length, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {

    @Length(3, 50, {
        message: "El nombre debe estar entre 3 y 50 caracteres"
    })
    @IsNotEmpty()
    name: string;

    @Length(10, 250)
    @IsOptional()
    description: string;

}