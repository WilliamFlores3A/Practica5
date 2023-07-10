import {
  IsString,
  MinLength,
  IsInt,
  IsPositive,
  IsNotEmpty,
} from 'class-validator';

export class CreateInversionistaDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  price: number;
}
