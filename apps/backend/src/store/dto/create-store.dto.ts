import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  public name?: string;

  @IsString()
  @IsNotEmpty()
  public responsibleName?: string;

  @IsString()
  @IsNotEmpty()
  public birthdate?: Date;

  @IsString()
  @IsNotEmpty()
  public cellphone?: string;

  @IsString()
  @IsNotEmpty()
  public cnpj?: string;

  @IsOptional()
  @IsNotEmpty()
  public category?: string;

  @IsString()
  @IsNotEmpty()
  public postalCode?: string;

  @IsString()
  @IsNotEmpty()
  public address?: string;

  @IsString()
  @IsNotEmpty()
  public neighborhood?: string;

  @IsNumber()
  @IsOptional()
  public idCity?: number;
}
